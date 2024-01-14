export default function Welcome({ tasks, addNewTask }) {
    return (
        <div className="welcome">
            <h2>
                Welcome
                <br />
                <span>A simple daily tasks maintainer app</span>
            </h2>
            <h3>
                Features
            </h3>
            <ul>
                <li>Task creation with date specification</li>
                <li>Task and due date editing</li>
                <li>Task deletion</li>
                <li>Task marking as completed or pending</li>
            </ul>
            <button onClick={addNewTask} className="create-task">
                {tasks.length === 0 ? 'Create your first task' : 'Create Task'}
            </button>
        </div>
    )
}