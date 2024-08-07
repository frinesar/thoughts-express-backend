const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api.error");

exports.createUser = async (username, password) => {
  const userInDB = await User.findOne({ username });
  if (userInDB) {
    throw ApiError.BadRequest("User already exists");
  }
  const hashPassword = await bcrypt.hash(password, 7);
  const newUser = await User.create({ username, password: hashPassword });
  return newUser;
};

exports.getAllUsers = async () => {
  const users = await User.find();
  return users;
};

exports.getUser = async (id) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw ApiError.BadRequest("No such user found");
  }
  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    throw ApiError.BadRequest("No such user");
  }
  return user;
};

exports.updateUser = async (id, userData) => {
  if (Object.hasOwn(userData, "password")) {
    const hashPassword = await bcrypt.hash(userData.password, 7);
    userData.password = hashPassword;
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...userData },
    { new: true }
  );
  if (!user) {
    throw ApiError.BadRequest("No such user");
  }
  return user;
};
