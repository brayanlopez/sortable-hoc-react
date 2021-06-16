const cors = require("cors");

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/react-example", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log("BD is connect"))
  .catch(err => console.log("Error: ", err));

const Task = require("./models/Task.js");

app.use(cors());
app.use(express.json());

app.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  newTask.sorting = await Task.estimatedDocumentCount();
  await newTask.save();
  res.json(newTask);
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});


app.put("/tasks", async (req, res) => {
  const tasksIds = req.body;
  for (const [i, id] of tasksIds.entries()) {
    await Task.updateOne({ _id: id }, { sorting: i });
    // console.log(i, id)
  }
  res.json("list ordered");
});



app.listen(4000, () => {
  console.log("server on port 4000")
})