import { useState } from 'react'
export default function Welcome({ tasks, addNewTask }) {
    const [features, setFeatures] = useState(0)
    return (
        <div className="welcome">
            <h2>
                Welcome To Planner
                <br />
                <span>A simple daily tasks maintainer app</span>
            </h2>
            <h3>
                Features and Specs
            </h3>
            <ul>
                <li>It is advised to keep tasks shorter, the maximum word limit is 100.</li>
                <li>Tasks get moved to trash if due date is passed</li>
                <li>The newer task will appear first</li>
                {
                    features === 0 ? 
                    <a onClick={() => setFeatures(1)}>Show more</a> :
                    <>  
                        <li>Task creation with date specification</li>
                        <li>Task can be marked or unmarked as completed or pending</li>
                        <li>Task editing</li>
                        <li>Task deletion</li>
                        <li>Due date can also be edited</li>
                        <a onClick={() => setFeatures(0)}>Show less</a>
                    </>
                }
            </ul>
            <button onClick={addNewTask} className="create-task">
                {tasks.length === 0 ? 'Create your first task' : 'Create Task'}
            </button>
        </div>
    )
}