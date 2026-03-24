function Task({title, id, done, toggleDone, modifTask, deleteTask}){
    return(
        <li className={done === true ? "task_element task_done" : "task_element"}>
            <input type="checkbox" checked={done} className="check_done" onChange={() => toggleDone(id)}/>
            {title}
            <button type="button" className="deleteTask" onClick={() => deleteTask(id)}> Supprimer</button>
            
        </li>
    )
}

export default Task;