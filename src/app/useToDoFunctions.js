import { useState, useEffect } from 'react';

export const useToDoFunctions = () => {
    const [tasks, setTasks] = useState([]);
    const [toDo, setToDo] = useState({
      text: {
        id: 1,
        task: '',
        date: '',
        updatedDate: '',
        dueDate: '',
        status: '',
      },
      checklist: {
        tasks: {
          id: 1,
          item: '',
          status: '',
        },
      },
    });
    const [popup, setPopup] = useState(false);
    const [features, setFeatures] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [views, setViews] = useState(0);
    const shareUrl = 'https://next-to-do-app-nu.vercel.app/';
    const shareMessage = `I use this app to maintain my daily tasks. Check out the app At:`;

    const addNotification = (message) => {
      setNotifications([message]);
    };
    
    const generateTaskId = () => {
      const timestamp = new Date().getTime();
      return `task_${timestamp}`;
    };

    const createChecklistItem = (item) => {
      const newTasks = toDo.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            checklist: {
              ...task.checklist,
              tasks: [...task.checklist.tasks, { id: generateTaskId(), item: '', status: '' }],
            },
          };
        }
        return task;
      });
      setToDo(newTasks);
      localStorage.setItem('toDo', JSON.stringify(newTasks));
    }

    const removeChecklistItem = (id) => {
      const newTasks = toDo.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            checklist: {
              ...task.checklist,
              tasks: task.checklist.tasks.filter((item) => item.id !== id),
            },
          };
        }
        return task;
      });
      setToDo(newTasks);
      localStorage.setItem('toDo', JSON.stringify(newTasks));
    }

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
      addNotification('Task added successfully!');
      console.log(newTask);
    };
  
    const markTask = (id) => {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
      );
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
  
      // Show success message
      const statusMessage = newTasks.find((task) => task.id === id)?.status === 'completed' ? 'completed' : 'pending';
      addNotification(`Task marked as ${statusMessage}!`);
    };
  
    const deleteTask = (id) => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
  
      // Show success message
      addNotification('Task deleted successfully!');
    };
  
    const editTask = (id, newTask, dueDate, status) => {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, task: newTask, updatedDate: new Date().toDateString(), dueDate, status } : task
      );
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
  
      // Show success message
      addNotification('Task updated successfully!');
    };
  
    const reCreateTask = (id, newTask, dueDate, status) => {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, task: newTask, updatedDate: new Date().toDateString(), dueDate, status } : task
      );
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      
      // Show success message
      addNotification('Task re-created successfully!');
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
    
      // Hiding the notification after 5 seconds when notification state changes
      const timeout = setTimeout(() => {
        setNotifications((prevNotifications) => prevNotifications.slice(1));
      }, 5000); 
    
      return () => clearTimeout(timeout);
    }, [notifications]); 

    return {
      tasks,
      popup,
      features,
      notifications,
      views,
      shareUrl,
      shareMessage,
      setPopup,
      setFeatures,
      handleViews,
      addTask,
      markTask,
      deleteTask,
      editTask,
      reCreateTask,
      handleOutsidePopupClick,
      handleOutsideFeatureClick
    };
};
