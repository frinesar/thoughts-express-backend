const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api.error");
const TokenService = require("./token.service");
const UserDto = require("../dto/user.dto");

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
  await TokenService.deleteManyRefreshTokens(id);
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

exports.loginUser = async (username, password) => {
  const userInDB = await User.findOne({ username });
  if (!userInDB) {
    throw ApiError.BadRequest("No such user");
  }
  const isValid = await bcrypt.compare(password, userInDB.password);
  if (!isValid) {
    throw ApiError.BadRequest("Invalid password");
  }
  return userInDB;
};

exports.logoutUser = async (refreshToken) => {
  const token = await TokenService.deleteRefreshToken(refreshToken);
  return token;
};

exports.refresh = async (refreshToken) => {
  const tokenData = TokenService.validateRefreshToken(refreshToken);
  const tokenInDB = await TokenService.findRefreshToken(refreshToken);
  if (!tokenData || !tokenInDB) {
    console.log(tokenData);
    console.log(tokenInDB);

    throw ApiError.Unauthorized("Invalid refresh token");
  }
  const user = await User.findOne({ _id: tokenData.id });
  const payload = { ...new UserDto(user) };
  const { accessToken } = TokenService.createTokens(payload);
  return accessToken;
};
