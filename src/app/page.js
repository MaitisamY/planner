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

    const addTask = (task, date, status) => {
      const newTask = { task, date, status };
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    };
  
    const markTask = (index) => {
      const newTasks = [...tasks];
      const currentStatus = newTasks[index].status;
      newTasks[index].status = currentStatus === 'completed' ? 'pending' : 'completed';
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const deleteTask = (index) => {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
  
    useEffect(() => {
      // Load tasks from local storage on component mount
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }, []);

    // localStorage.removeItem('tasks');
    return (
        <>
            {popup && (
                <Popup closePopup={() => setPopup(false)} addTask={addTask}/>
            )}
            <Header />
            <Main
                tasks={tasks}
                addNewTask={() => setPopup(!popup)}
                addTask={addTask}
                markTask={markTask}
                deleteTask={deleteTask}
            > 
            </Main>
            <Footer />
            <div className="if-size-less-than-300">
                <p>Sorry! We do not support mobile devices less than 300px wide.</p>
            </div>
        </>
    );
}
