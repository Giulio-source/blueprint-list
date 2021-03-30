require("dotenv").config();
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

let todos = [];

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home", { todos: todos });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/delete", (req, res) => {
  todos = todos.filter((todo) => todo.id !== req.body.todo_id);
  res.redirect("/");
});

app.post("/create", (req, res) => {
  const newTodo = {
    id: uuidv4(),
    title: req.body.todo_title,
    description: req.body.todo_description,
    state: req.body.todo_select,
    deadline: req.body.todo_deadline,
  };
  todos.push(newTodo);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
