import { useState } from 'react'
import Header from './Header'
import Welcome from './Welcome'
import Footer from './Footer'
import Task from './Task'
import Trash from './Trash'
import { MdGridView, MdFormatListBulleted } from 'react-icons/md'
import { BsFillHouseDoorFill, BsExclamationDiamond } from 'react-icons/bs'
import { MdBookmarkRemove } from 'react-icons/md'
export default function Main({ 
  views, 
  tasks, 
  handleViews, 
  addNewTask, 
  markTask, 
  deleteTask, 
  editTask, 
  reCreateTask, 
  showFeatures 
}) {
    const [nav, setNav] = useState(0)
    const todayDateString = new Date().toDateString();
    const filteredActiveTasks = tasks.filter((task) => new Date(task.dueDate) >= new Date(todayDateString));
    const filteredTrashTasks = tasks.filter((task) => new Date(task.dueDate) < new Date(todayDateString));

    const handleNavClick = (index) => {
        setNav(index);
    }

    return (
        <>
        <main>
            <div className="welcome-holder">
                <div className="welcome-holder-header">
                    <Header />
                    {/* <div className="nav-bar">
                        
                    </div> */}
                </div>
                <div className="welcome-holder-content">
                    <Welcome 
                        tasks={tasks}
                        addNewTask={addNewTask}
                    />
                </div>
            </div>
            <div className="task-holder">
                <div className="task-holder-header">
                    <div className="task-holder-header-nav">
                        <a 
                            title="Home"
                            onClick={() => handleNavClick(0)} 
                            className={nav === 0 ? "active" : ""}
                        >
                            <BsFillHouseDoorFill /> &nbsp; <i>Home</i>
                            {
                                filteredActiveTasks.length === 0 ? '' : 
                                <span>{filteredActiveTasks.length > 0 ? filteredActiveTasks.length : ''}</span>
                            }
                        </a>
                        <a 
                            title="Trash"
                            onClick={() => handleNavClick(1)}
                            className={nav === 1 ? "active" : ""}
                        >
                            <MdBookmarkRemove /> &nbsp; <i>Trash</i>
                            {
                                filteredTrashTasks.length === 0 ? '' : 
                                <span>{filteredTrashTasks.length > 0 ? filteredTrashTasks.length : ''}</span>
                            }
                        </a>
                        <a 
                            title="Features"
                            onClick={showFeatures} 
                        >
                            <BsExclamationDiamond /> &nbsp; <i>Features</i>
                        </a>
                    </div>
                    <div className="task-holder-header-view">
                        <button 
                            className={views === 0 ? "active" : ""}
                            title="Grid"
                            onClick={() => handleViews(0)}
                        >
                            <MdGridView />
                        </button>
                        <button 
                            className={views === 1 ? "active" : ""}
                            title="List"
                            onClick={() => handleViews(1)}
                        >
                            <MdFormatListBulleted />
                        </button>
                    </div>
                </div>
                <div className="task-holder-body">
                {nav === 1 ? (
                    <Trash 
                        views={views} 
                        tasks={tasks} 
                        markTask={markTask} 
                        deleteTask={deleteTask} 
                        reCreateTask={reCreateTask} 
                    />
                ) : (
                    <Task 
                        views={views} 
                        tasks={tasks} 
                        markTask={markTask} 
                        deleteTask={deleteTask} 
                        editTask={editTask} 
                    />
                )}
                </div>
            </div>
        </main>
        <Footer />
        </>
    );
}