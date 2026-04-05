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
let users = [];

app.get("/tasks", async (req,res) =>{
    try {
        const request = "SELECT * FROM tasks";
        const result = await pool.query(request);
        res.send(result.rows);
    } catch (error) {
        console.log(error);
        res.status("500").send("Error connection server!");
    }
});

app.get("/users", async (req, res) =>{
    try {
        const request = "SELECT * FROM users";
        const result = await pool.query(request);
        res.send(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error connection server!")  
    }
})

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

app.get("/users/:id", async (req, res) =>{
    try {
        const id = parseInt(req.params.id);
        const request = "SELECT * FROM users WHERE id = $1";
        const result = await pool.query(request, [id]);
        res.status(200).send(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error connection server!")
    }

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

app.post("/users", async (req, res) =>{
    try {
        let new_user = req.body;
        const username = new_user.username;
        const email = new_user.email;
        const password = new_user.password;
        const request = "INSERT INTO (username, email, password) VALUES ($1 $2 $3) RETURNING *";
        const result = await pool.query(request, [username, email, password]);
        const user = result.rows[0];
        users.push(user);
        res.status(200).send(user)
    } catch (error) {
        console.error(error);
        res.status(500).send("Error connection server!")
    }
})

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

app.delete("/users/:id", async (req,res) =>{
    try {
        const id = parseInt(req.params.id);
        const request = "DELETE FROM users WHERE id = $1 RETURNING *";
        const result = await pool.query(request, [id]);
        users = users.filter(user => user.id !== id);
        res.status(200).send(`L'utilisateur nommé ${result.rows[0].username} a bien été supprimé`)
    } catch (error) {
        console.error(error);
        res.status(500).send("Error connection server!")
    }
})

app.patch("/tasks/:id", async (req,res) =>{
    try {
        const id = parseInt(req.params.id);
        const request = "UPDATE tasks SET done = NOT done WHERE id = $1 RETURNING *";
        const result = await pool.query(request, [id]);
        res.status(200).send(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error connection server!");
    }
})

app.patch("/users/:id/username", async (req, res) =>{
    try {
        const id = parseInt(req.params.id);
        const new_username = req.body.username; 
        const request = "UPDATE users SET username = $1 WHERE id = $2 RETURNING *";
        const result = await pool.query(request, [new_username,id]);
        users = users.map(user => user.id !== id ? user.username = new_username : user);
        res.status(200).send(`L'utilisateur : ${result.rows[0].email} a bien traité et modifié son nom d'utilisateur en ${result.rows[0].username}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error connection server!")
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

app.patch("/tasks/:id/deadline", async (req,res) =>{
    try {
        const id = parseInt(req.params.id);
        const modification = req.body;
        const deadline = new Date(modification.deadline);
        const task = tasks.find(task => parseInt(task.id) === id);
        if(task){
            const request = "UPDATE tasks SET deadline = $1 WHERE id = $2 RETURNING *";
            const result = await pool.query(request,[deadline,id]);
            res.status(200).send(result.rows[0]);
        }else{
            res.status(404).send("La tâche n'a pas été trouvé!");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error connection server!");
    }
})

app.listen(port, ()=>{
    console.log("Server running on port : " + port);
});