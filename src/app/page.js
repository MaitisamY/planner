'use client'
import { useState, useEffect } from 'react'
import './globals.css'
import Header from './Components/Header'
import Main from './Components/Main'
import Footer from './Components/Footer'
import Popup from './Components/Popup'

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [popup, setPopup] = useState(false);
    const [notification, setNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const generateTaskId = () => {
      const timestamp = new Date().getTime();
      return `task_${timestamp}`;
    };
  
    const addTask = (task, date, updatedDate, dueDate, status) => {
      const newTask = { id: generateTaskId(), task, date, updatedDate, dueDate, status };
      setTasks((prevTasks) => {
        const updatedTasks = [newTask, ...prevTasks];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      // Show success message
      setNotificationMessage('Task added successfully!');
      setNotification(true);
    };
  
    const markTask = (id) => {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
      );
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
  
      // Show success message
      const statusMessage = newTasks.find((task) => task.id === id)?.status === 'completed' ? 'completed' : 'pending';
      setNotificationMessage(`Task marked as ${statusMessage}!`);
      setNotification(true);
    };
  
    const deleteTask = (id) => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
  
      // Show success message
      setNotificationMessage('Task deleted successfully!');
      setNotification(true);
    };
  
    const editTask = (id, newTask, dueDate, status) => {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, task: newTask, updatedDate: new Date().toDateString(), dueDate, status } : task
      );
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
  
      // Show success message
      setNotificationMessage('Task updated successfully!');
      setNotification(true);
    };
  
    const reCreateTask = (id, newTask, dueDate, status) => {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, task: newTask, updatedDate: new Date().toDateString(), dueDate, status } : task
      );
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