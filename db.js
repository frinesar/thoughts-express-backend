require("dotenv").config();

const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Unable to connect to MongoDB");
  }
};

exports.disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log("Unsuccessfully disconnected");
  }
};
