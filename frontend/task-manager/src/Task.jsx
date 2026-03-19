function Task({title, index, done, taskDo, deleteTask}){
    return(
        <li className="task_element">
            <input type="checkbox" className="check_done" onClick={taskDo}/>
            {title}
            <button type="button" className="deleteTask" onClick={deleteTask}> Supprimer</button>
        </li>
    )
}

export default Task;