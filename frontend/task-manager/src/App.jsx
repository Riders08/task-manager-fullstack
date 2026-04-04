import { useEffect, useState } from 'react'

import Task from "./Task.jsx"
import CompteurTask from './CompteurTask.jsx';
import FilterBarreMenu from './FilterBarreMenu.jsx';
import AddTask from './AddTask.jsx';
import MenuBarre from './MenuBarre.jsx';

import './App.css'

function App() {
  const [tasks, setTasks] = useState([]); // Liste des tâches
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [input_username, setInputUsername] = useState("");
  const [input_email, setInputEmail] = useState("");
  const [input_password, setInputPassword] = useState("");
  const [filtered, setFiltered] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() =>{
    fetch("http://localhost:3000/tasks")
    .then(res => res.json())
    .then(data => {
      const updateTasks = data.map(task => ({
          ...task, isLate: task.deadline && new Date(task.deadline) < Date.now(),
        }
      )); 
      setTasks(updateTasks);
    });

    fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(data => {
      setUsers(data);
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

  const addUser = () => {
    if(!input_username.trim() || !input_email.trim() || !input_password.trim()){
      return;
    }else{
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: input_username, email: input_email, password: input_password})
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUsers([...users, data]);
        setInputUsername("");
        setInputEmail("");
        setInputPassword("");
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

  const deleteUser = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => res.text())
    .then(data => {
      console.log(data);
      setUsers(users.filter(user => 
        user.id !== id
      ));
    })
  }

  const getDeadlineTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}/deadline`)
    .then(res => res.json())
    .then(data => {
      console.log(data.deadline);
    })
  }

  const addDeadline= (id, date) => {
    fetch(`http://localhost:3000/tasks/${id}/deadline`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({deadline: date})          
    }
    )
    .then(res => res.json())
    .then(data => {
      console.log(data.deadline);
      setTasks(
        tasks.map(task => 
          task.id === id ? {...task, deadline : data.deadline} : task
        )
      );
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
    if(filtered === "late") return task.isLate
    if(filtered === "isTime") return !task.isLate
    if(filtered === "late_todo") return task.isLate && !task.done
    if(filtered === "finish") return task.isLate && task.done
  })

  return (
    <div className="container">
      <MenuBarre/>
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
              tasks={tasks}
              setTasks={setTasks}
              deadline={task.deadline}
              addDeadline={addDeadline}
              selectedDate = {selectedDate}
              setSelectedDate= {setSelectedDate}
            />
          ))}
        </ul>
      </div>
      <AddTask 
        input={input} 
        setInput={setInput} 
        addTask={addTask}
      />
      <FilterBarreMenu 
        filtered={filtered} 
        setFiltered={setFiltered}
      />
    </div>
  )

  
}

export default App;

