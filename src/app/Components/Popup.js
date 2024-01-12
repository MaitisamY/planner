import { useState } from "react"
export default function Popup({ addTask, closePopup }) {
    const [newTask, setNewTask] = useState("");
    const handleNewTaskChange = (event) => {
        setNewTask(event.target.value);
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        addTask(newTask, new Date().toDateString(), "pending");
        closePopup();
      };

    return (
        <div className="popup">
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
                        spellCheck="false" required>
                    </textarea>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}