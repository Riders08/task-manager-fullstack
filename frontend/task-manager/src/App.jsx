import { useEffect, useState } from 'react'
import Task from "./Task.jsx"
import './App.css'

function App() {
  const [tasks, setTasks] = useState(["Faire apparaitre des tâches", "Transformer le map","Faire en sorte d'ajouter un bouton",]); // Liste des tâches
  const [input, setInput] = useState("");
  useEffect(() =>{
    fetch("http://localhost:3000")
    .then(res => res.text())
    .then(data => console.log(data))
  }, []);

  const addTask = () => {
    if(!input.trim()){
      return;
    }else{
      setTasks([...tasks,input]);
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title_temporary">Frontend Running</h1>
      <h2 className="subtitle-tasks-list">Liste des tâches</h2>
      <div className="list-task">
        <ul>
          {tasks.map((task,index) =>(
            <Task
              title={task} 
              key={index}
            />
          ))}
        </ul>
      </div>
      <div className="menu_barre">
        <input type="text" className="new_task" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="button_new_task" type="button" onClick={addTask}> Ajouter </button>
      </div>
    </div>
  )

  
}

export default App;
