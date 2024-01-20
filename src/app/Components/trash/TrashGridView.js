import { useEffect, useState } from 'react'
import { BsTrash, BsPencil, BsX, BsRepeat } from 'react-icons/bs'
export default function TrashGridView({ filteredTasks, startEditing, editingTasks, taskChanges, dueDate, dateError, taskError, handleEditFormSubmit, stopEditing, handleDueDateChange, handleTaskChanges, deleteTask, setStatus }) {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        // Add a small delay before applying the fade-in effect
        const timeout = setTimeout(() => {
        setFadeIn(true);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);
    return (
        filteredTasks.map((task) => (
        <div key={task.id} className={`grid-view fade-grid-view ${fadeIn ? 'fade-in' : ''}`}>
            {editingTasks[task.id] ? (
            <form onSubmit={(e) => handleEditFormSubmit(e, task.id)}>
                <h3>Re create task</h3>
                <textarea
                name={`task-${task.id}`}
                id={`task-${task.id}`}
                value={taskChanges[task.id]}
                type="text"
                rows="4"
                onChange={(e) => handleTaskChanges(e, task.id)}
                placeholder="Edit your task here"
                autoFocus
                ></textarea>
                {taskError && <h6 className="error">{taskError}</h6>}
                <h3>Set due date</h3>
                <input type="date" value={dueDate} onChange={handleDueDateChange} />
                {dateError && <h6 className="error">{dateError}</h6>}
                <div className="task-btns">
                <button title="Re create" className="task-common-btn" type="submit">
                    <BsRepeat />
                </button>
                <button
                    onClick={() => stopEditing(task.id)}
                    title="Cancel editing"
                    className="task-common-btn"
                >
                    <BsX />
                </button>
                </div>
            </form>
            ) : (
            <>
                <label className={task.status === 'completed' ? 'line-through' : ''}>
                    {' ' + task.task}
                </label>
                <p>
                {task.updatedDate
                    ? `Updated on: ${task.updatedDate}`
                    : `Created on: ${task.date}`}
                </p>
                <p>Due on: {task.dueDate}</p>
                <div className="task-btns">
                <button
                    onClick={() => (setStatus(task.status), startEditing(task.id))}
                    title="Edit"
                    className="task-common-btn"
                >
                    <BsPencil />
                </button>
                <button
                    title="Delete"
                    onClick={() => deleteTask(task.id)}
                    className="task-common-btn"
                >
                    <BsTrash />
                </button>
                </div>
            </>
            )}
        </div>
        ))
    );
}