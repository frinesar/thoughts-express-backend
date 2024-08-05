require("dotenv").config();
const app = require("./app");
const port = process.env.port || 5500;

const db = require("./db");

db.connectDB();

app.listen(port, () => console.log("Server started"));
