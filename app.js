import express from "express";

const app = express();

app.get("/hello", (req, res) => {
  res.send("app.get hello");
});

app.listen(3000, () => {
  console.log("server stated!");
});
// app.listen(숫자,함수)
