require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

// mongoose.connect("mongodb://localhost/blogDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });
// const db = mongoose.connection;
// db.on("error", (err) => console.log(err));
// db.once("open", () => console.log("Connected to DB"));
// mongoose.set("useFindAndModify", false);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
