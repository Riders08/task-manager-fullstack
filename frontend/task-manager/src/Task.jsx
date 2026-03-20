function Task({title, index, done, toggleDone, deleteTask}){
    return(
        <li className={done === true ? "task_element task_done" : "task_element"}>
            <input type="checkbox" checked={done} className="check_done" onChange={() => toggleDone(index)}/>
            {title}
            <button type="button" className="deleteTask" onClick={() => deleteTask(index)}> Supprimer</button>
        </li>
    )
}

export default Task;