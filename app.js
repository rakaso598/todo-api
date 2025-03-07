import express from "express";
import tasks from "./data/mock.js";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";

const app = express();
app.use(express.json()); // -> 미들웨어 middleware
// express.json(): 헤더의 content-type이 application/json이라면 body를 파싱해주는 미들웨어.
// req.body

app.get("/tasks", (req, res) => {
  const sort = req.query.sort;
  const count = Number(req.query.count);

  const compareFn =
    sort === "oldest"
      ? (a, b) => a.createdAt - b.createdAt
      : (a, b) => b.createdAt - a.createdAt;

  let newTasks = tasks.sort(compareFn);

  if (count) {
    newTasks = newTasks.slice(0, count);
  }

  res.send(newTasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    res.status(404).send({ message: "Cannot find given id" });
  }

  res.send(task);
});

app.post("/tasks", (req, res) => {
  const newTask = req.body;

  const ids = tasks.map((task) => task.id); // [1,2,3,4,5]
  newTask.id = Math.max(...ids) + 1;
  newTask.isComplete = false;
  newTask.createdAt = new Date();
  newTask.updatedAt = new Date();
  tasks.push(newTask);

  res.status(201).send(newTask);
});

app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    res.status(404).setDefaultEncoding({ message: "cannot find given id" });
    return;
  }

  Object.keys(req.body).forEach((key) => {
    task[key] = req.body[key];
  });
  task.updatedAt = new Date();

  res.send(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    res.status(404).send({ message: "cannot find given id" });
    return;
  }

  tasks.splice(index, 1); // index부터 1개 지워라.

  res.sendStatus(204); // No Content
});

mongoose.connect(DATABASE_URL).then(() => console.log("Mongoose Connected!"));

app.listen(3000, () => {
  console.log("Server Started!");
});
