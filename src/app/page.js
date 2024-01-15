'use client'
import { useState, useEffect } from 'react'
import './globals.css'
import Header from './Components/Header'
import Main from './Components/Main'
import Footer from './Components/Footer'
import Popup from './Components/Popup'

export default function Home() {
    const [count, setCount] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [popup, setPopup] = useState(false);
    const [notification, setNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const addTask = (task, date, updatedDate, dueDate, status) => {
      const newTask = { task, date, updatedDate, dueDate, status };
      setTasks((prevTasks) => {
        const updatedTasks = [newTask, ...prevTasks];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      // Show success message
      setNotificationMessage('Task added successfully!');
      setNotification(true);
    };
  
    const markTask = (index) => {
      const newTasks = [...tasks];
      const currentStatus = newTasks[index].status;
      newTasks[index].status = currentStatus === 'completed' ? 'pending' : 'completed';
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));

      // Show success message
      const statusMessage = newTasks[index].status === 'completed' ? 'completed' : 'pending';
      setNotificationMessage(`Task marked as ${statusMessage}!`);
      setNotification(true);
    };

    const deleteTask = (index) => {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));

      // Show success message
      setNotificationMessage('Task deleted successfully!');
      setNotification(true);
    }

    const editTask = (index, newTask, dueDate, status) => {
      const newTasks = [...tasks];
      newTasks[index] = {
        ...newTasks[index],
        task: newTask,
        updatedDate: new Date().toDateString(),
        dueDate: dueDate || newTasks[index].dueDate,
        status,
      };
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));

      // Show success message
      setNotificationMessage('Task updated successfully!');
      setNotification(true);
    };

    const reCreateTask = (index, newTask, dueDate, status) => {
      const newTasks = [...tasks];
      newTasks[index] = {
        ...newTasks[index],
        task: newTask,
        updatedDate: new Date().toDateString(),
        dueDate: dueDate || newTasks[index].dueDate,
        status,
      };
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));

      // Show success message
      setNotificationMessage('Task re-created successfully!');
      setNotification(true);
    };

    const handleOutsidePopupClick = (event) => {
      if (event.target.id === 'popup' && popup) {
        setPopup(false);
      }
    };
  
    useEffect(() => {
      // Load tasks from local storage on component mount
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    
      // Hide the notification after 3 seconds when notification state changes
      const timeout = setTimeout(() => {
        setNotification(false);
      }, 6000);
    
      return () => clearTimeout(timeout);
    }, [notification]);

    // localStorage.removeItem('tasks');
    return (
        <>
            {popup && (
                <Popup 
                    closePopup={() => setPopup(false)} 
                    addTask={addTask} 
                    handleOutsidePopupClick={handleOutsidePopupClick} 
                />
            )}
            <Header />
            <Main
                tasks={tasks}
                addNewTask={() => setPopup(!popup)}
                addTask={addTask}
                markTask={markTask}
                deleteTask={deleteTask}
                editTask={editTask}
                reCreateTask={reCreateTask}
            > 
            </Main>
            <Footer />
            {notification && <div className="notification-container">{notificationMessage}</div>}
            <div className="if-size-less-than-300">
                <p>Sorry! We do not support mobile devices less than 300px wide.</p>
            </div>
        </>
    );
}