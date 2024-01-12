import Welcome from "./Welcome"
import Task from "./Task"
export default function Main({ tasks, addNewTask, markTask, deleteTask }) {
    return (
        <main>
            <Welcome 
                tasks={tasks}
                addNewTask={addNewTask}
            />
            {tasks.length > 0 && <Task tasks={tasks} markTask={markTask} deleteTask={deleteTask} />}
        </main>
    );
}