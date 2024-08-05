require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/api/user.router");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/test", (req, res) => {
  res.status(200).json({ message: "Working" });
});

app.use("/api/users", userRouter);

module.exports = app;
