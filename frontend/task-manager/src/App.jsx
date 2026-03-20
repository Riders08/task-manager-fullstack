import { useEffect, useState } from 'react'
import Task from "./Task.jsx"
import './App.css'

function App() {
  const [tasks, setTasks] = useState([{id: 0, title : "Faire apparaitre des tâches", done : false}, {id: 1, title: "Transformer le map", done: false},{id: 2, title : "Faire en sorte d'ajouter un bouton", done: false},]); // Liste des tâches
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState("all");
  useEffect(() =>{
    fetch("http://localhost:3000")
    .then(res => res.text())
    .then(data => console.log(data))
  }, []);

  const addTask = () => {
    if(!input.trim()){
      return;
    }else{
      setTasks([...tasks,{id: Date.now(), title: input, done: false}]);/*evite le doublon  a  la suppression temporaire*/
      setInput("");
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => 
      task.id !== id
    ));
  }

  const taskDo = (id) =>{
    setTasks(tasks.map(task =>
      task.id === id ? {...task, done : !task.done} : task
    ));
  }

  const filteredTask = tasks.filter((task) =>{
    if(filtered === "all")  return true
    if(filtered === "done") return task.done
    if(filtered === "todo") return !task.done
  })

  const cpt = tasks.filter(task => !task.done).length;

  return (
    <div className="container">
      <h1 className="title_temporary">Frontend Running</h1>
      <h2 className="subtitle-tasks-list">Liste des tâches (Tâches restantes : <span>{cpt}</span>)</h2>
      <div className="list-task">
        <ul>
          {filteredTask.map(task =>(
            <Task
              title={task.title}
              id={task.id}
              done={task.done}
              toggleDone={taskDo}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      </div>
      <div className="menu_barre">
        <input type="text" className="new_task" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="button_new_task" type="button" onClick={addTask}> Ajouter </button>
      </div>
      <div className="menu_barre_filter">
        <button className={filtered === "all" ? "all filter" : "filter"} onClick={() => setFiltered("all")}> Toutes les tâches </button>
        <button className={filtered === "done" ? "done filter" : "filter"} onClick={() => setFiltered("done")}> Tâches finies </button>
        <button className={filtered === "todo" ? "todo filter" : "filter"} onClick={() => setFiltered("todo")}> Tâches non finies </button>
      </div>
    </div>
  )

  
}

export default App;
