const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
