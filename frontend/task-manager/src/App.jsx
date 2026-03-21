import { useEffect, useState } from 'react'

import Task from "./Task.jsx"
import CompteurTask from './CompteurTask.jsx';
import FilterBarreMenu from './FilterBarreMenu.jsx';
import AddTask from './AddTask.jsx';

import './App.css'

function App() {
  const [tasks, setTasks] = useState([]); // Liste des tâches
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState("all");
  useEffect(() =>{
    fetch("http://localhost:3000/tasks")
    .then(res => res.json())
    .then(data => {
      setTasks(data);
    });
  }, []);

  const addTask = () => {
    if(!input.trim()){
      return;
    }else{
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({title: input})
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTasks([...tasks, data]);
        setInput("");
      })
    }
  }

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => res.text())
    .then(data => {
      console.log(data);
      setTasks(tasks.filter(task => 
        task.id !== id
      ));
    })
  }

  const taskDo = (id) =>{
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => res.text())
    .then(data => {
      console.log(data);
      
      setTasks(tasks.map(task =>
        task.id === id ? {...task, done : !task.done} : task
      ));
    })
    
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
