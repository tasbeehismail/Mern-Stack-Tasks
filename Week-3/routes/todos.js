const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const TODOS_FILE = path.join(__dirname, "../data/todos.json");

// Get All Todos
router.get("/", (req, res) => {
    const todos = JSON.parse(fs.readFileSync(TODOS_FILE, "utf-8"));
    return res.json(todos);
});

// Add a New Todo
router.post("/", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(422).json({ error: "title is required" });
    }

    const todos = JSON.parse(fs.readFileSync(TODOS_FILE, "utf-8"));
    const newTodo = { id: todos.length + 1, title, status: false };
    todos.push(newTodo);
    fs.writeFileSync(TODOS_FILE, JSON.stringify(todos));

    return res.json({ message: "todo created successfully" });
});

// Get a Todo by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    const todos = JSON.parse(fs.readFileSync(TODOS_FILE, "utf-8"));
    const todo = todos.find(t => t.id === parseInt(id));

    if (todo) {
        return res.json(todo);
    } else {
        return res.status(404).json({ error: "todo not found" });
    }
});

// Update Todo Status
router.patch("/:id", (req, res) => {
    const { id } = req.params;

    const todos = JSON.parse(fs.readFileSync(TODOS_FILE, "utf-8"));
    const todoIndex = todos.findIndex(t => t.id === parseInt(id));

    if (todoIndex >= 0) {
        todos[todoIndex].status = true;
        fs.writeFileSync(TODOS_FILE, JSON.stringify(todos));
        return res.json({ message: "todo status updated successfully" });
    } else {
        return res.status(404).json({ error: "todo not found" });
    }
});

module.exports = router;
