import { useState } from 'react'
import { formatDateToInput, formatDateToOriginalFormat } from './DateUtil'
import { BsTrash, BsPencil, BsX, BsCheckAll, BsCheck } from 'react-icons/bs'
import { MdCheck, MdCheckBoxOutlineBlank } from "react-icons/md"
export default function Task({ tasks, markTask, deleteTask, editTask }) {
    const [editingTasks, setEditingTasks] = useState({});
    const [taskChanges, setTaskChanges] = useState({});
    const [status, setStatus] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [error, setError] = useState(null);
    const todayDateString = new Date().toDateString();
    const filteredTasks = tasks.filter((task) => new Date(task.dueDate) >= new Date(todayDateString));

    const handleDueDateChange = (event) => {
        setDueDate(event.target.value);
    };
    
    const handleTaskChanges = (e, index) => {
        const { value } = e.target;
        setTaskChanges((prevTaskChanges) => ({
          ...prevTaskChanges,
          [index]: value,
        }));
    };

    const startEditing = (index) => {
        setEditingTasks((prevEditingTasks) => ({
          ...prevEditingTasks,
          [index]: true,
        }));
      
        setTaskChanges((prevTaskChanges) => ({
          ...prevTaskChanges,
          [index]: tasks[index].task,
        }));
      
        setStatus(tasks[index].status); // Set status
      
        const formattedDueDate = formatDateToInput(tasks[index].dueDate);
      
        setDueDate(formattedDueDate); // Set due date
      
        setTimeout(() => {
          const textarea = document.getElementById(`task-${index}`);
          if (textarea) {
            textarea.focus();
            // Set the selection range to the end of the text
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
          }
        }, 0);
    };
      
    
    const stopEditing = (index) => {
        setEditingTasks((prevEditingTasks) => ({
          ...prevEditingTasks,
          [index]: false,
        }));
    };

    const handleEditFormSubmit = (e, index) => {
        e.preventDefault();
        const formattedDueDate = formatDateToOriginalFormat(dueDate || tasks[index].dueDate);

        if (formattedDueDate < todayDateString) {
            setError('Due date cannot be in the past!');
        } else {
            editTask(index, taskChanges[index], formattedDueDate, status);
            stopEditing(index);
        }
    };

    return (
        filteredTasks && filteredTasks.map((task, index) => (
            <div key={index} className="task-list">
                {
                    editingTasks[index] ? (
                    <form onSubmit={(e) => handleEditFormSubmit(e, index)}>
                        <h3>Edit task</h3>
                        <textarea
                            name={`task-${index}`}
                            id={`task-${index}`}
                            value={taskChanges[index]}
                            type="text"
                            rows="4"
                            cols="auto"
                            onChange={(e) => handleTaskChanges(e, index)}
                            spellCheck="false"
                            placeholder="Edit your task here"
                            autoFocus
                            required
                        >
                        </textarea>
                        <h3>Edit due date</h3>
                        <input 
                            type="date" 
                            value={dueDate}
                            onChange={handleDueDateChange} 
                        />
                        {error && <h6 className="error">{error}</h6>}
                        <p className="text-center">Modifying on: {new Date().toDateString()}</p>
                        <div className="task-btns">
                        <button title="Update" className="task-common-btn" type="submit">
                            <BsCheckAll />
                        </button>
                        <button onClick={() => stopEditing(index)} title="Cancel editing" className="task-common-btn">
                            <BsX />
                        </button>
                        </div>
                    </form>    
                    ) : (
                    <>    
                        <label 
                            title={task.task.substring(0, 30) + '...'} 
                            className={task.status === 'completed' ? 'line-through' : ''}
                        > 
                            {' ' + task.task}
                        </label>
                        <p>{ task.updatedDate ? `Last updated on: ${task.updatedDate}` : `Created on: ${task.date}` }</p>
                        <p>Due on: {task.dueDate}</p>
                        <div className="task-btns"> 
                            <button 
                                onClick={() => markTask(index)} 
                                title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'} 
                                className="task-common-btn"
                            >
                                {
                                    task.status === 'completed' ? (
                                        <MdCheckBoxOutlineBlank />
                                    ) : (
                                        <MdCheck />
                                    )
                                }
                            </button>
                            <button 
                                onClick={() => (setStatus(task.status), startEditing(index))} 
                                title="Edit" 
                                className="task-common-btn"
                            >
                                <BsPencil />
                            </button>
                            <button 
                                title="Delete" onClick={() => deleteTask(index)} 
                                className="task-common-btn"
                            >
                                <BsTrash />
                            </button>
                        </div>
                    </>
                )}
            </div>
        ))
    )
}