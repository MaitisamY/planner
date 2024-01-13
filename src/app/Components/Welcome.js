export default function Welcome({ tasks, addNewTask }) {
    return (
        <div className="welcome">
            <h2>{tasks.length > 0 ? 'Welcome' : 'Welcome to your planner'}</h2>
            <h3>A simple daily tasks maintainer app with task creation, edition, mark as completed or pending and deletion features.</h3>
            <p>(Today: {new Date().toDateString()})</p>
            {tasks.length === 0 && <p>To get started, create a new task</p>}
            <button onClick={addNewTask} className="create-task">Create Task</button>
        </div>
    )
}