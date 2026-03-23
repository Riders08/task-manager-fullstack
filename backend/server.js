const express = require("express");
const cors = require("cors");

const { Pool } = require("pg");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "riders",
    host: "localhost",
    database: "task_manager",
    password: "Riders08",
    port: "5432",
});

let tasks = [
    {id: 0, title : "Faire apparaitre des tâches", done : false}, 
    {id: 1, title: "Transformer le map", done: false},
    {id: 2, title : "Faire en sorte d'ajouter un bouton", done: false},
    {id: 3, title : "Faire une liaison backend/frontend plus efficace", done: false},
];

app.get("/tasks", (req,res) =>{
    try {
        const request = ""
    } catch (error) {
        console.log(error);
        res.status("500").send("Error connection server!");
    }
    res.send(tasks);
});

app.get("/tasks/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const task_to_find = tasks.find(task => task.id === id);
    res.send(task_to_find);
})

app.post("/tasks", async (req, res) => {
    try {
        let data = req.body;
        const title = data.title;
        const request = "INSERT INTO tasks (title, done) VALUES ($1, false) RETURNING *";
        const result = await pool.query(request, [title]);
        const newTask = result.rows[0];
        tasks.push(newTask);
        res.send(newTask);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error connection server!");
    }
    
});

app.delete("/tasks/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.send(`La tâche : ${id} a bien été suprimée`);
});

app.patch("/tasks/:id", (req,res) =>{
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);
    console.log(id);
    console.log(task);
    if(task){
        task.done = !task.done;
        res.status(200).send("Le status de la tâche à bien été modifié.");
    }else{
        res.status(404).send("La tâche n'a pas été trouvée.");
    }
})

app.listen(port, ()=>{
    console.log("Server running on port : " + port);
});