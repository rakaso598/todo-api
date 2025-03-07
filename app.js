import express from "express";
import mockTasks from "./data/mock.js";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";
import { Task } from "./models/Task.js";

const asyncHandler = (handler) => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      switch (e.name) {
        case "ValidationError":
          res.status(400).send({ message: e.message });
          break;
        case "CastError":
          res.status(404).send({ message: "cannot find given id" });
          break;
        default:
          res.status(500).send({ message: e.message });
          break;
      }
      console.log(e.name);
      console.log(e.message);
    }
  };
};

const app = express();
app.use(express.json()); // -> 미들웨어 middleware
// express.json(): 헤더의 content-type이 application/json이라면 body를 파싱해주는 미들웨어.

app.get(
  "/tasks",
  asyncHandler(async (req, res) => {
    const sort = req.query.sort;
    const count = Number(req.query.count) || 0;

    const sortOption = {
      createdAt: sort === "oldest" ? "asc" : "desc",
    };

    const tasks = await Task.find().sort(sortOption).limit(count);

    res.send(tasks);
  })
);

app.get(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) {
      res.status(404).send({ message: "Cannot find given id" });
    }

    res.send(task);
  })
);

app.post(
  "/tasks",
  asyncHandler(async (req, res) => {
    const task = await Task.create(req.body);

    res.status(201).send(task);
  })
);

app.patch(
  "/tasks/:id",
  asyncHandler((req, res) => {
    const id = Number(req.params.id);
    const task = mockTasks.find((task) => task.id === id);
    if (!task) {
      res.status(404).setDefaultEncoding({ message: "cannot find given id" });
      return;
    }

    Object.keys(req.body).forEach((key) => {
      task[key] = req.body[key];
    });
    task.updatedAt = new Date();

    res.send(task);
  })
);

app.delete(
  "/tasks/:id",
  asyncHandler((req, res) => {
    const id = Number(req.params.id);
    const index = mockTasks.findIndex((task) => task.id === id);
    if (index === -1) {
      res.status(404).send({ message: "cannot find given id" });
      return;
    }

    mockTasks.splice(index, 1); // index부터 1개 지워라.

    res.sendStatus(204); // No Content
  })
);

mongoose.connect(DATABASE_URL).then(() => console.log("Mongoose Connected!"));

app.listen(3000, () => {
  console.log("Server Started!");
});
