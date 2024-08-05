require("dotenv").config();
const app = require("./app");
const port = process.env.port || 5500;

app.listen(port, () => console.log("Server started"));
