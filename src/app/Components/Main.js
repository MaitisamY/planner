import { useState } from "react"
import Welcome from "./Welcome"
import Task from "./Task"
import Trash from "./Trash"
export default function Main({ tasks, addNewTask, markTask, deleteTask, editTask, reCreateTask }) {
    const [nav, setNav] = useState(0)

    const handleNavClick = (index) => {
        setNav(index)
    }

    return (
        <>
            <div className="nav-bar">
                <a 
                    onClick={() => handleNavClick(0)} 
                    className={nav === 0 ? "active" : ""}
                >
                    Home
                </a>
                <a 
                    onClick={() => handleNavClick(1)}
                    className={nav === 1 ? "active" : ""}
                >
                    Trash
                </a>
            </div>
            <main>
                {nav === 1 ? (
                    <Trash tasks={tasks} markTask={markTask} deleteTask={deleteTask} reCreateTask={reCreateTask} />
                ) : (
                    <>
                    <Welcome 
                        tasks={tasks}
                        addNewTask={addNewTask}
                    />
                    {tasks.length > 0 && <Task tasks={tasks} markTask={markTask} deleteTask={deleteTask} editTask={editTask} />}
                    </>
                )}
            </main>
        </>
    );
}