require("dotenv").config();
const express = require("express");
const app = express();
const uniqid = require("uniqid");

var todos = [];
let id = 0;

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
  const postId = req.body.todo_id;
  console.log(postId);
  todos = todos.filter((todo) => todo.id !== postId);
  res.redirect("/");
});

app.post("/create", (req, res) => {
  id++;
  const newTodo = {
    id: uniqid(),
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
