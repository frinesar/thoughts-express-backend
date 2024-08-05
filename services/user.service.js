const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.createUser = async (username, password) => {
  const userInDB = await User.findOne({ username });
  if (userInDB) {
    throw Error("User already exists");
  }
  const hashPassword = await bcrypt.hash(password, 7);
  const newUser = await User.create({ username, password: hashPassword });
  return newUser;
};

exports.getAllUsers = async () => {
  const users = await User.find();
  return users;
};
