import { useState } from 'react'
import { BsTrash, BsPencil, BsCheck, BsX, BsCheckAll } from 'react-icons/bs'
export default function Task({ tasks, markTask, deleteTask, editTask }) {
    const [editingTasks, setEditingTasks] = useState({});
    const [taskChanges, setTaskChanges] = useState({});
    const [status, setStatus] = useState(null);
    
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
        editTask(index, taskChanges[index], new Date().toDateString(), status);
        stopEditing(index);
    }

    console.log(status);

    return (
        tasks && tasks.map((task, index) => (
            <div key={index} className="task-list">
                {
                    editingTasks[index] ? (
                    <form onSubmit={(e) => handleEditFormSubmit(e, index)}>
                        <h3>Edit Task</h3>
                        <textarea
                            name={`task-${index}`}
                            id={`task-${index}`}
                            value={taskChanges[index]}
                            type="text"
                            rows="auto"
                            cols="auto"
                            onChange={(e) => handleTaskChanges(e, index)}
                            spellCheck="false"
                            placeholder="Edit your task here"
                            autoFocus
                            required
                        >
                        </textarea>
                        <p>Modifying on: {new Date().toDateString()}</p>
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
                        <label className={task.status === 'completed' ? 'line-through' : ''}>
                            <input 
                                title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'} 
                                type="checkbox" 
                                checked={task.status === 'completed'} 
                                onChange={() => markTask(index)} 
                            /> {task.task}
                        </label>
                        <p>{task.date}</p>
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
        ))
    )
}