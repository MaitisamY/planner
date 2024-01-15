import { useState } from 'react'
import { formatDateToInput, formatDateToOriginalFormat } from './DateUtil'
import { BsTrash, BsPencil, BsX, BsCheckAll, BsRepeat } from 'react-icons/bs'
export default function Trash({ tasks, markTask, deleteTask, reCreateTask }) {
    const [editingTasks, setEditingTasks] = useState({});
    const [taskChanges, setTaskChanges] = useState({});
    const [status, setStatus] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [error, setError] = useState(null);
    const todayDateString = new Date().toDateString();
    const filteredTasks = tasks.filter((task) => new Date(task.dueDate) < new Date(todayDateString));

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

        if (formattedDueDate <= todayDateString) {
            setError('Due date cannot be in the past or today!');
        } else {
            reCreateTask(index, taskChanges[index], formattedDueDate, status);
            stopEditing(index);
        }
    };

    return (
        filteredTasks.length !== 0 ? filteredTasks.map((task, index) => (
            <div key={index} className="task-list">
                {
                    editingTasks[index] ? (
                    <form onSubmit={(e) => handleEditFormSubmit(e, index)}>
                        <h3>Re create task</h3>
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
                        <h3>Set new due date</h3>
                        <input 
                            type="date" 
                            value={dueDate}
                            onChange={handleDueDateChange} 
                        />
                        <h6>{error}</h6>
                        <p className="text-center">Modifying on: {new Date().toDateString()}</p>
                        <div className="task-btns">
                        <button title="Re create" className="task-common-btn" type="submit">
                            <BsRepeat />
                        </button>
                        <button onClick={() => stopEditing(index)} title="Cancel editing" className="task-common-btn">
                            <BsX />
                        </button>
                        </div>
                    </form>    
                    ) : (
                    <>    
                        <label>{task.task}</label>
                        <p>{ task.updatedDate ? `Last updated on: ${task.updatedDate}` : `Created on: ${task.date}` }</p>
                        <p>Due on: {task.dueDate}</p>
                        <div className="task-btns"> 
                            <button onClick={() => (setStatus(task.status), startEditing(index))} title="Edit" className="task-common-btn">
                                <BsPencil />
                            </button>
                            
                            <button title="Delete" onClick={() => deleteTask(index)} className="task-common-btn">
                                <BsTrash />
                            </button>
                        </div>
                    </>
                )}
            </div>
        )) : <h2 className="text-light">Trash is empty</h2>
    )
}