import { useState } from 'react';
import { formatDateToInput, formatDateToOriginalFormat } from './DateUtil';
import { BsTrash, BsPencil, BsX, BsCheckAll } from 'react-icons/bs';
import { MdCheck, MdCheckBoxOutlineBlank } from 'react-icons/md';

export default function Task({ tasks, markTask, deleteTask, editTask }) {
  const [editingTasks, setEditingTasks] = useState({});
  const [taskChanges, setTaskChanges] = useState({});
  const [status, setStatus] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [taskError, setTaskError] = useState(null);
  const todayDateString = new Date().toDateString();
  const filteredTasks = tasks.filter((task) => new Date(task.dueDate) >= new Date(todayDateString));

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleTaskChanges = (e, id) => {
    const { value } = e.target;
    setTaskChanges((prevTaskChanges) => ({
      ...prevTaskChanges,
      [id]: value,
    }));
  };

  const startEditing = (id) => {
    setEditingTasks((prevEditingTasks) => ({
      ...prevEditingTasks,
      [id]: true,
    }));

    setTaskChanges((prevTaskChanges) => ({
      ...prevTaskChanges,
      [id]: tasks.find((task) => task.id === id)?.task,
    }));

    setStatus(tasks.find((task) => task.id === id)?.status); // Set status

    const formattedDueDate = formatDateToInput(tasks.find((task) => task.id === id)?.dueDate);
    setDueDate(formattedDueDate); // Set due date

    setTimeout(() => {
      const textarea = document.getElementById(`task-${id}`);
      if (textarea) {
        textarea.focus();
        // Set the selection range to the end of the text
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }
    }, 0);
  };

  const stopEditing = (id) => {
    setEditingTasks((prevEditingTasks) => ({
      ...prevEditingTasks,
      [id]: false,
    }));
    setTaskError(null);
    setDateError(null);
  };

  const handleEditFormSubmit = (e, id) => {
    e.preventDefault();
    const formattedDueDate = formatDateToOriginalFormat(dueDate);
    const dueDateObj = new Date(formattedDueDate);

    if (taskChanges[id].length === 0) {
      setTaskError('Task cannot be empty!');
    } else if (taskChanges[id].length < 6) {
      setTaskError('Task must be at least 6 characters long!');
    } else if (taskChanges[id].length > 125) {
      setTaskError('Task must be at most 125 characters long!');
    } else if (dueDateObj < new Date(new Date().setHours(0, 0, 0, 0))) {
        setDateError('Due date cannot be in the past!');
    } else {
      editTask(id, taskChanges[id], formattedDueDate, status);
      stopEditing(id);
      setTaskError(null);
      setDateError(null);
    }
  };

  return (
    filteredTasks &&
    filteredTasks.map((task) => (
      <div key={task.id} className="task-list">
        {editingTasks[task.id] ? (
          <form onSubmit={(e) => handleEditFormSubmit(e, task.id)}>
            <h3>Edit task</h3>
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
            <h3>Edit due date</h3>
            <input type="date" value={dueDate} onChange={handleDueDateChange} />
            {dateError && <h6 className="error">{dateError}</h6>}
            <p className="text-center">Modifying on: {new Date().toDateString()}</p>
            <div className="task-btns">
              <button title="Update" className="task-common-btn" type="submit">
                <BsCheckAll />
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
            <label
              title={task.task.substring(0, 30) + '...'}
              className={task.status === 'completed' ? 'line-through' : ''}
            >
              {' ' + task.task}
            </label>
            <p>
              {task.updatedDate
                ? `Last updated on: ${task.updatedDate}`
                : `Created on: ${task.date}`}
            </p>
            <p>Due on: {task.dueDate}</p>
            <div className="task-btns">
              <button
                onClick={() => markTask(task.id)}
                title={
                  task.status === 'completed'
                    ? 'Mark as pending'
                    : 'Mark as completed'
                }
                className="task-common-btn"
              >
                {task.status === 'completed' ? (
                  <MdCheckBoxOutlineBlank />
                ) : (
                  <MdCheck />
                )}
              </button>
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
