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
    const [checklistError, setChecklistError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(formatDateToInput(new Date().toDateString()));
    const todayDateString = new Date().toDateString();
    const [textOrChecklist, setTextOrChecklist] = useState(null);

    const handleTaskOrChecklistChange = (name) => {
        setTextOrChecklist(name);
    }
    
    const handleFormSubmit = (e, type) => {
        e.preventDefault();
    
        if (type === 'text') {
            if (toDo.task === "") {
                setInputError("Task cannot be empty!");
                return;
            } else if (toDo.task.length < 6) {
                setInputError("Task must be at least 6 characters long!");
                return;
            } else if (toDo.task.length > 125) {
                setInputError("Task must be at most 125 characters long!");
                return;
            }
        }
    
        if (toDo.dueDate !== "") {
            const formattedDate = new Date(toDo.dueDate).toDateString();
            if (new Date(formattedDate) < new Date(new Date().setHours(0, 0, 0, 0))) {
                setDateError("Due date cannot be in the past!");
                return;
            }
        }
    
        // Handle submission for different types of tasks
        if (type === 'text') {
            const taskData = {
                type: 'text',
                task: toDo.task,
                date: todayDateString,
                dueDate: toDo.dueDate,
                status: 'pending'
            };
            addTask(taskData);
        } else if (type === 'checklist') {
            if (toDo.checklist.length === 0) {
                setChecklistError("Checklist cannot be empty!");
                return;
            }
            const taskData = {
                type: 'checklist',
                tasks: toDo.checklist.map(item => ({ id: item.id, item: item.item, status: item.status }))
            };
            addTask(taskData);
        }
    
        closePopup();
    };
    

    useEffect(() => {
        newTask.length > 125 ? setInputError("Task must be at most 125 characters long!") : setInputError(null);
    }, [newTask]);

    return (
        <div id="popup" className="popup" onClick={(e) => handleOutsidePopupClick(e)}>
            <div id="add-task" className="add-task">
                <a onClick={closePopup} className="close"><BsXLg /></a>
                <h2>Add New Task</h2>
                {
                    textOrChecklist === 'text' ? (
                        <>
                            <a onClick={() => handleTaskOrChecklistChange(null)} className="back"><BsArrowLeft /></a>
                            <form onSubmit={(e) => handleFormSubmit(e, 'text')}>
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
                            </form>
                        </>
                    ) : textOrChecklist === 'checklist' ? (
                        <>
                            <form onSubmit={(e) => handleFormSubmit(e, 'checklist')}>
                                <a onClick={() => handleTaskOrChecklistChange(null)} className="back"><BsArrowLeft /></a>
                                <ul style={{ 
                                    width: 'auto',
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
                                                {checklistError && <h6 className="error">{checklistError}</h6>}
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
                                {
                                    toDo.type === 'checklist' && toDo.checklist.length >= 1 && (
                                        <button type="submit">Create</button>
                                    )
                                }
                            </form>
                        </>
                    ) : (
                        <div className="selection">
                            <button type="button" onClick={() => handleTaskOrChecklistChange('checklist')}>Checklist</button>
                            <button type="button" onClick={() => handleTaskOrChecklistChange('text')}>Text</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}