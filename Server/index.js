const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/react-example", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log("BD is connect"))
  .catch(err => console.log("Error: ", err));

const app = express();

app.use(express.json());

app.post("/tasks", (req, res) => {
  console.log(req, body);
  res.json("received");
})

app.listen(4000, () => {
  console.log("server on port 4000")
})