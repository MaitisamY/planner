import { useState, useEffect } from 'react';

export const useToDoFunctions = () => {
    const generateTaskId = () => {
      const timestamp = new Date().getTime();
      return `task_${timestamp}`;
    };

    const [tasks, setTasks] = useState([]);
    const [toDo, setToDo] = useState({
      id: generateTaskId(),
      type: 'text', // Default type is text
      task: '', // Task text
      date: '', // Date information
      updatedDate: '', // Updated date information
      dueDate: '', // Due date information
      status: '', // Status information
      checklist: [], // Array to hold checklist items
    });
    const [popup, setPopup] = useState(false);
    const [features, setFeatures] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [views, setViews] = useState(0);
    const shareUrl = 'https://next-to-do-app-nu.vercel.app/';
    const shareMessage = `I PLANNER application to maintain my daily tasks, checklists and notes. Check out the PLANNER at:`;

    const addNotification = (message) => {
      setNotifications([message]);
    };

    const handleChange = (itemId, value, fieldName) => {
      if (fieldName === 'text') {
          setToDo(prevToDo => ({
              ...prevToDo,
              task: value
          }));
      } else if (fieldName === 'dueDate') {
          setToDo(prevToDo => ({
              ...prevToDo,
              dueDate: value
          }));
      } else {
          const updatedChecklist = toDo.checklist.map(item => {
              if (item.id === itemId) {
                  return { ...item, item: value };
              }
              return item;
          });
  
          setToDo(prevToDo => ({
              ...prevToDo,
              checklist: updatedChecklist
          }));
      }
    };

    const createChecklistItem = () => {
      setToDo(prevToDo => ({
          ...prevToDo,
          type: 'checklist', // Change type to checklist
          checklist: [
              ...prevToDo.checklist,
              { id: generateTaskId(), item: '', status: '' } // Add a new checklist item
          ]
      }));
    };
    
    // Function to remove a checklist item by id
    const removeChecklistItem = (itemId) => {
        setToDo(prevToDo => ({
            ...prevToDo,
            checklist: prevToDo.checklist.filter(item => item.id !== itemId) // Remove the checklist item with the specified id
        }));
    };

    const handleViews = (id) => {
      setViews(id);
    }
  
    // const addTask = (task, date, updatedDate, dueDate, status) => {
    //   const newTask = { id: generateTaskId(), task, date, updatedDate, dueDate, status };
    //   setTasks((prevTasks) => {
    //     const updatedTasks = [newTask, ...prevTasks];
    //     localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    //     return updatedTasks;
    //   });
    //   // Show success message
    //   addNotification('Task added successfully!');
    //   console.log(newTask);
    // };

    const addTask = (taskData) => {
      const { type, ...rest } = taskData;
      if (type === 'text') {
        const newTask = { id: generateTaskId(), type, ...rest };
        setToDo(prevToDo => ({
          ...prevToDo,
          checklist: [...prevToDo.checklist, newTask]
        }));
        // Show success message
        addNotification('Task added successfully!');
      } else if (type === 'checklist') {
        const newTask = { id: generateTaskId(), type, tasks: [] };
        setToDo(prevToDo => ({
          ...prevToDo,
          checklist: [...prevToDo.checklist, newTask]
        }));
        // Show success message
        addNotification('Checklists added successfully!');
      } else {
        // Handle invalid task type
        console.error('Invalid task type:', type);
      }
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
      // const storedToDo = localStorage.getItem('toDo');
      // if (storedToDo) {
      //   setTasks(JSON.parse(storedToDo));
      // }
    
      // Hiding the notification after 5 seconds when notification state changes
      const timeout = setTimeout(() => {
        setNotifications((prevNotifications) => prevNotifications.slice(1));
      }, 5000); 
    
      return () => clearTimeout(timeout);
    }, [notifications]); 

    return {
      tasks,
      toDo,
      popup,
      features,
      notifications,
      views,
      shareUrl,
      shareMessage,
      handleChange,
      setPopup,
      setFeatures,
      handleViews,
      addTask,
      markTask,
      deleteTask,
      editTask,
      reCreateTask,
      handleOutsidePopupClick,
      handleOutsideFeatureClick,
      createChecklistItem,
      removeChecklistItem
    };
};
