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
  res.render("create");
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
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const todoEdit = todos.find((todo) => todo.id == req.params.id);
  res.render("edit", { todo: todoEdit });
});

app.post("/edit/:id", (req, res) => {
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

/* SE SI VOLESSE UTILIZZARE MONGODB */
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://NOMEDATABASE", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });
//
// const todoSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   state: { type: String },
//   deadline: { type: Date, default: Date.now },
// });
//
// const ToDo = mongoose.model('ToDo', todoSchema);
//
// TO GET TODOS
// const todos = await ToDo.find().sort({ createdAt: "desc" });
//
// TO CREATE A NEW TODO
// const newTodo = new ToDo({
// DATI RELATIVI AL TODO
// });
// try {
//   await newTodo.save();
// } catch (error) {
//   res.status(400);
// }
//
// TO EDIT A TODO
// const getTodo = await ToDo.findByIdAndUpdate(req.body.id, {
//   NUOVI DATI RELATIVI AL TODO
// });
//
// TO DELETE A TODO
// const deleteTodo = await ToDo.findByIdAndRemove(req.body.id);
