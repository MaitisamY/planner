export default function Task({ tasks, markTask }) {
    return (
        tasks && tasks.map((task, index) => (
            <div key={index} className="task-list">
                <h2 className={task.status === 'completed' ? 'line-through' : ''}>
                    {task.task}
                </h2>
                <p>{task.date}</p>
                <button onClick={() =>markTask(index)} className="mark">
                    Mark as {task.status === 'completed' ? 'pending' : 'completed'}
                </button>
            </div>
        ))
    )
}