import express from "express";
import tasks from "./data/mock.js";

const app = express();
app.use(express.json());

// 쿼리스트링
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

// 파라미터
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    res.status(404).send({ message: "Cannot find given id" });
  }

  res.send(task);
});

app.listen(3001, () => {
  console.log("server stated!");
});
