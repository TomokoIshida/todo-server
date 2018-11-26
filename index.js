const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect(
  "mongodb://admin:reacteur123@ds117334.mlab.com:17334/todo-reacteur",
  // { useNewUrlParser: true },
  function(err) {
    if (err) throw err;
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function() {
  console.log("Connected successfully to database");
});

const TodoModel = mongoose.model("Todo", {
  title: String
});

const app = express();
app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello World !");
});

app.post("/createTodo", function(req, res) {
  const title = req.body.title;
  const newTodo = new TodoModel({
    title
  });

  newTodo.save((err, obj) => {
    if (!err) {
      console.log(obj);
      return res.send("OK");
    }
    return res.json(err);
  });

  /* newTodo.save();
  res.send("ok"); */
});

app.get("/getTodos", function(req, res) {
  TodoModel.find(function(err, todos) {
    if (!err) {
      console.log(todos);
      return res.send("Todos");
    }
    return res.json(err);
    // if (err) return console.error(err);
    //   res.send(todos);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Example app listening on port 3000 !");
});
