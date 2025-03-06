import express from "express";
import tasks from "./data/mock.js";

const app = express();
app.use(express.json()); // middleware
// express.json(): 헤더의 content-type이 application/json이라면 body를 파싱해주는 미들웨어.
// req.body

// 쿼리스트링: req.query
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

// 파라미터: req.params
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    res.status(404).send({ message: "Cannot find given id" });
  }

  res.send(task);
});

// POST: req.body
app.post("/tasks", (req, res) => {
  const newTask = req.body;

  const ids = tasks.map((task) => task.id); // [1,2,3,4,5]
  newTask.id = Math.max(...ids) + 1;
  newTask.isComplete = false;
  newTask.createdAt = new Date();
  newTask.updatedAt = new Date();
  tasks.push(newTask);

  res.status(201).send(newTask); // 201 created
});

app.listen(3001, () => {
  console.log("server stated!");
});
