import { useState, useEffect } from 'react'
import { formatDateToInput } from './DateUtil';
export default function Popup({ addTask, closePopup, handleOutsidePopupClick }) {
    const [newTask, setNewTask] = useState("");
    const [inputError, setInputError] = useState(null);
    const [dateError, setDateError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(formatDateToInput(new Date().toDateString()));
    const todayDateString = new Date().toDateString();

    const handleNewTaskChange = (event) => {
        setNewTask(event.target.value);
    }
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(newTask === "") {
            setInputError("Task cannot be empty!");
        } else if(newTask.length < 6) {
            setInputError("Task must be at least 6 characters long!");
        } else if(newTask.length > 125) {
            setInputError("Task must be at most 125 characters long!");
        } else {
            const formattedDate = selectedDate ? new Date(selectedDate).toDateString() : todayDateString;

            if(formattedDate < todayDateString) {
                setDateError("Due date cannot be in the past!");
                return;
            }
        
            addTask(newTask, todayDateString, null, formattedDate, "pending");
            closePopup();
        }
    };

    useEffect(() => {
        newTask.length > 125 ? setInputError("Task must be at most 125 characters long!") : setInputError(null);
    }, [newTask]);

    return (
        <div id="popup" className="popup" onClick={(e) => handleOutsidePopupClick(e)}>
            <div id="add-task" className="add-task">
                <a onClick={closePopup} className="close">&times;</a>
                <h2>Add New Task</h2>
                <form onSubmit={handleFormSubmit}>
                    <textarea 
                        type="text" 
                        placeholder="Write your task here" 
                        rows="5" 
                        defaultValue={newTask} 
                        onChange={handleNewTaskChange} 
                        spellCheck="false" 
                        autoComplete="off"
                        autoFocus
                    >
                    </textarea>
                    <h6>
                        <span>(<i className={newTask.length < 6 ? 'danger' : newTask.length > 125 ? 'danger' : ''}>
                        {newTask.length}</i>/125)</span> 
                        {inputError && inputError}
                    </h6>
                    <p>
                        Select date: <input type="date" value={selectedDate} onChange={handleDateChange} required />
                    </p>
                    {dateError && <h6 className="error">{dateError}</h6>}
                    <h5>Default date: {todayDateString}</h5>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}