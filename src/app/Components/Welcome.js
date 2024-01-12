export default function Welcome({ tasks, addNewTask }) {
    return (
        <div className="welcome">
            <h2>{tasks.length > 0 ? 'Welcome back!' : 'Welcome to your planner'}</h2>
            <p>({new Date().toDateString()})</p>
            {tasks.length === 0 && <p>To get started, create a new task</p>}
            <button onClick={addNewTask} className="create-task">Create</button>
        </div>
    )
}