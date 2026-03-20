import { useEffect, useState } from 'react'

import Task from "./Task.jsx"
import CompteurTask from './CompteurTask.jsx';
import FilterBarreMenu from './FilterBarreMenu.jsx';
import AddTask from './AddTask.jsx';

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

  return (
    <div className="container">
      <h1 className="title_temporary">Frontend Running</h1>
      <h2 className="subtitle-tasks-list">Liste des tâches (Tâches restantes : <span><CompteurTask listTasks={tasks}/></span>)</h2>
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
      <AddTask input={input} setInput={setInput} addTask={addTask}/>
      <FilterBarreMenu filtered={filtered} setFiltered={setFiltered}/>
    </div>
  )

  
}

export default App;
