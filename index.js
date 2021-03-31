require("dotenv").config();
const express = require("express");
const app = express();
const uniqid = require("uniqid");

var todos = [];

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home", { todos: todos });
});

app.get("/create", (req, res) => {
  res.render("create", { todo: {} });
});

app.post("/create", (req, res) => {
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

app.post("/delete", (req, res) => {
  const todoDeleteId = req.body.todoId;
  todos = todos.filter((todo) => todo.id !== todoDeleteId);
  todos.forEach((todo) => console.log(todo.id));
  console.log("comparison", todoDeleteId);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const todoEdit = todos.find((todo) => todo.id == req.params.id);
  console.log(todoEdit);
  res.render("edit", { todo: todoEdit });
});

app.post("/edit/:id", (req, res) => {
  console.log(req.params.id);
  const newTodo = {
    id: req.params.id,
    title: req.body.todo_title,
    description: req.body.todo_description,
    state: req.body.todo_select,
    deadline: req.body.todo_deadline,
  };
  todos = todos.map((todo) => {
    if (todo.id === newTodo.id) {
      return newTodo;
    } else {
      return todo;
    }
  });
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
