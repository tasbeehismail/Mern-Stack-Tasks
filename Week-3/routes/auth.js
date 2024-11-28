const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const USERS_FILE = path.join(__dirname, "../data/users.json");

// Register Route
router.post("/register", (req, res) => {
    const { username, password, firstName } = req.body;

    if (!username || !password || !firstName) {
        return res.status(422).json({ error: `${!username ? 'username' : !password ? 'password' : 'firstName'} is required` });
    }

    const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
    users.push({ username, password, firstName });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users));

    return res.json({ message: "user was registered successfully" });
});

// Login Route
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        return res.json({ message: "logged in successfully" });
    } else {
        return res.status(401).json({ error: "invalid credentials" });
    }
});

module.exports = router;
