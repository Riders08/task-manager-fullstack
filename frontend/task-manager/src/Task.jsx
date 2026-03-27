import { useState } from "react";
import ModificationTask from "./ModificationTask.jsx"

function Task({title, id, done, toggleDone, deleteTask, tasks, setTasks, deadline, addDeadline}){
    const [modification, setModification] = useState("");
    const taskModification = (id) =>{
        fetch(`http://localhost:3000/tasks/${id}/modif`,{
          method: "PATCH",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({title: modification}),
        })
        .then(res => res.text())
        .then(data =>{
          setTasks(
            tasks.map(task => 
              task.id === id ? {...task, title : modification} : task
            )
          );
          setModification("");
        })
    }
    return(
        <li className={done === true ? "task_element task_done" : "task_element"}>
            <input type="checkbox" checked={done} className="check_done" onChange={() => toggleDone(id)}/>
            {title}
            <button type="button" className="deleteTask" onClick={() => deleteTask(id)}> Supprimer</button>
            <ModificationTask
              id={id}
              modification={modification}
              setModification={setModification}
              taskModification={taskModification}
            />
            <div className="deadline">
              <p className="actuel_deadline"> La tâche est a réalisé avant le : {deadline}</p>
              <button className="addDealine" type="button" onClick={() => addDeadline(id)}> Ajouter une deadline </button>
            </div>
        </li>
    )
}

export default Task;