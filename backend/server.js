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

let tasks = [];

app.get("/tasks", async (req,res) =>{
    try {
        const request = "SELECT * FROM tasks";
        const result = await pool.query(request);
        result.rows.forEach(task => {
            if(!tasks.find(t => t.id === task.id)){
                tasks.push(task);
            }
        });
    } catch (error) {
        console.log(error);
        res.status("500").send("Error connection server!");
    }
    res.send(tasks);
});

app.get("/tasks/:id", async (req, res) =>{
    try {
        const id = parseInt(req.params.id);
        const request = "SELECT * FROM tasks WHERE id = $1"
        const result = await pool.query(request, [id]);
        res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error connection server!");
    }

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

app.delete("/tasks/:id", async(req, res) =>{
    try {
        const id = parseInt(req.params.id);
        const request = "DELETE FROM tasks WHERE id = $1 RETURNING *";
        const result = await pool.query(request, [id]);
        tasks = tasks.filter(task => task.id !== id);
        res.send(`La tâche : ${result.rows[0].title} a bien été suprimée`);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error connection server!");
    }
});

app.patch("/tasks/:id", async (req,res) =>{
    try {
        const id = parseInt(req.params.id);
        const task = tasks.find(task => parseInt(task.id) === id);
        if(task){
            const request = "UPDATE tasks SET done = $1 WHERE id = $2 RETURNING *";
            const result = await pool.query(request, [!task.done,id]);
            if(result.rows[0].done){
                res.status(200).send(`La tâche => ${result.rows[0].title} est faite.`);
            }else{
                res.status(200).send(`La tâche => ${result.rows[0].title} n'a pas encore été faite.`);
            }
        }else{
            res.status(404).send("La tâche n'a pas été trouvé !");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Error connection server!");
    }
})

app.patch("/tasks/:id/modif", async (req,res) =>{
    try {
        const id = parseInt(req.params.id);
        const new_title = req.body.title;
        const task = tasks.find(task => id === parseInt(task.id));
        if(task){
            const request = "UPDATE tasks SET title = $1 WHERE id = $2";
            const result = await pool.query(request, [new_title, id]);
            res.status(200).send(`La tâche numéro ${task.id} a bien été modifié.`);
        }else{
            res.status(404).send("La tâche n'a pas été trouvé !");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error connection server!");
    }  
})

app.get("/tasks/:id/deadline", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const request = "SELECT deadline FROM tasks WHERE id = $1";
        const result = await pool.query(request ,[id]);
        res.send(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error connection server!");
    }
})

app.listen(port, ()=>{
    console.log("Server running on port : " + port);
});