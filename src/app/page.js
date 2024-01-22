'use client'
import { useState, useEffect } from 'react'
import './globals.css'
import Main from './Components/Main'
import Popup from './Components/Popup'
import Feature from './Components/Feature'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon
} from 'react-share'
import { BsShare, BsPlusLg } from 'react-icons/bs'

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [popup, setPopup] = useState(false);
    const [features, setFeatures] = useState(false);
    const [notification, setNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [views, setViews] = useState(0);
    const shareUrl = 'https://next-to-do-app-nu.vercel.app/';
    const shareMessage = `I use this app to maintain my daily tasks. Check out the app At:`;
    
    const generateTaskId = () => {
      const timestamp = new Date().getTime();
      return `task_${timestamp}`;
    };

    const handleViews = (id) => {
      setViews(id);
    }
  
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

    const handleOutsideFeatureClick = (event) => {
      if (event.target.id === 'feature' && features) {
        setFeatures(false);
      }
    }
  
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
            {features && (
                <Feature
                    closeFeatures={() => setFeatures(false)}
                    handleOutsideFeatureClick={handleOutsideFeatureClick}
                />
            )}
            <Main
                tasks={tasks}
                addNewTask={() => setPopup(!popup)}
                showFeatures={() => setFeatures(!features)}
                addTask={addTask}
                markTask={markTask}
                deleteTask={deleteTask}
                editTask={editTask}
                reCreateTask={reCreateTask}
                views={views}
                handleViews={handleViews}
            > 
            </Main>
            <div className="share-buttons-mobile">
                <span title="Share our app on social media"><BsShare /></span>
                <FacebookShareButton url={shareUrl} quote={shareMessage}>
                    <FacebookIcon title="Share on Facebook" className="fb" size={25} />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={shareMessage}>
                    <TwitterIcon title="Share on Twitter" className="tw" size={25} />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} summary={shareMessage}>
                    <LinkedinIcon title="Share on LinkedIn" className="in" size={25} />
                </LinkedinShareButton>
                <WhatsappShareButton url={shareUrl} title={shareMessage}>
                    <WhatsappIcon title="Share on WhatsApp" className="wa" size={25} />
                </WhatsappShareButton>
            </div>
            <a 
                title="Create Task"
                onClick={() => setPopup(!popup)}
                className="create-task-btn-mobile"
            >
                <BsPlusLg />
            </a>
            {notification && <div className="notification-container">{notificationMessage}</div>}
            <div className="if-size-less-than-300">
                <p>Sorry! We do not support mobile devices less than 300 pixels wide.</p>
            </div>
        </>
    );
}
