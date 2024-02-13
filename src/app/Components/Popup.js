import { useState, useEffect } from 'react'
import { formatDateToInput } from './DateUtil';
import { BsXLg, BsArrowLeft, BsDash, BsPlus } from 'react-icons/bs'
export default function Popup({ 
    addTask, 
    closePopup, 
    handleOutsidePopupClick, 
    toDo, 
    createChecklistItem, 
    removeChecklistItem,
    handleChange
}) {
    const [newTask, setNewTask] = useState('');
    const [inputError, setInputError] = useState(null);
    const [dateError, setDateError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(formatDateToInput(new Date().toDateString()));
    const todayDateString = new Date().toDateString();
    const [textOrChecklist, setTextOrChecklist] = useState(null);

    const handleTaskOrChecklistChange = (name) => {
        setTextOrChecklist(name);
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
            const formattedDateObj = new Date(formattedDate);

            if(formattedDateObj < new Date(new Date().setHours(0, 0, 0, 0))) {
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
                <a onClick={closePopup} className="close"><BsXLg /></a>
                <h2>Add New Task</h2>
                <form onSubmit={handleFormSubmit}>
                {
                    textOrChecklist === 'text' ? (
                        <>
                            <a onClick={() => handleTaskOrChecklistChange(null)} className="back"><BsArrowLeft /></a>
                            <textarea 
                                type="text" 
                                placeholder="Write your task here" 
                                rows="5" 
                                defaultValue={newTask} 
                                onChange={(e) => handleChange(null, e.target.value, 'text')} 
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
                                Select date 
                                <input 
                                    type="date" 
                                    value={selectedDate} 
                                    onChange={(e) => handleChange(null, 
                                    e.target.value, 'dueDate')} 
                                    required 
                                />
                            </p>
                            {dateError && <h6 className="error">{dateError}</h6>}
                            <h5>Default date: {todayDateString}</h5>
                            <button type="submit">Create</button>
                        </>
                    ) : textOrChecklist === 'checklist' ? (
                        <>
                            <a onClick={() => handleTaskOrChecklistChange(null)} className="back"><BsArrowLeft /></a>
                            <ul style={{ 
                                display: 'flex', 
                                alignItems: 'flex-start', 
                                justifyContent: 'center', 
                                flexDirection: 'column', 
                                gap: '20px',
                                listStyleType: 'initial'
                            }}>
                                {toDo.type === 'checklist' && toDo.checklist.length > 0 ? ( // Check if checklist is not empty
                                    toDo.checklist.map((item, index) => (
                                        <li key={item.id}>
                                            <input 
                                                name='checklist' 
                                                type="text" 
                                                id={item.id} 
                                                value={item.item} 
                                                onChange={(e) => handleChange(item.id, e.target.value, 'checklist')} 
                                                placeholder={`Checklist item ${index + 1}`}
                                            />
                                            {(index + 1) !== 1 &&  (
                                                <a 
                                                    style={{ marginLeft: '10px', cursor: 'pointer', fontSize: '12px' }}
                                                    onClick={() => removeChecklistItem(item.id)}
                                                >
                                                    Remove
                                                </a>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    `Use the button below to add checklist items` // Render a message if checklist is empty
                                )}
                                <a className="add-checklist-item" onClick={createChecklistItem}><BsPlus size={35} /></a>
                            </ul>
                            <button type="submit">Create</button>
                        </>
                    ) : (
                        <div className="selection">
                            <button type="button" onClick={() => handleTaskOrChecklistChange('checklist')}>Checklist</button>
                            <button type="button" onClick={() => handleTaskOrChecklistChange('text')}>Text</button>
                        </div>
                    )
                }
                </form>
            </div>
        </div>
    )
}