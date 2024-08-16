require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/api/user.router");
const reviewRouter = require("./routers/api/review.router");
const errorHandler = require("./middleware/error-handler");
const tokenValidator = require("./middleware/token-validator");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/test", (req, res) => {
  res.status(200).json({ message: "Working" });
});

app.use("/api/users", userRouter);
app.use("/api/reviews", tokenValidator, reviewRouter);
app.use(errorHandler);

module.exports = app;
