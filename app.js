require("dotenv").config();
const express = require("express");
const userRouter = require("./routers/api/user.router");

const app = express();

app.use("/test", (req, res) => {
  res.status(200).json({ message: "Working" });
});

app.use("/api/users", userRouter);

module.exports = app;
