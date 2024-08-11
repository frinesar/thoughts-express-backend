const ApiError = require("../exceptions/api.error");
const Token = require("../models/token.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
};

exports.validateAccessToken = (accessToken) => {
  try {
    const token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
    return token;
  } catch (error) {
    return null;
  }
};

exports.validateRefreshToken = (refreshToken) => {
  try {
    const token = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
    return token;
  } catch (error) {
    return null;
  }
};

exports.saveRefreshToken = async (user, refreshToken) => {
  const token = await Token.create({ user: user.id, refreshToken });
  return token;
};

exports.deleteRefreshToken = async (refreshToken) => {
  const token = await Token.findOneAndDelete({ refreshToken });
  return token;
};

exports.findRefreshToken = async (refreshToken) => {
  const token = await Token.findOne({ refreshToken });
  return token;
};

exports.deleteManyRefreshTokens = async (userID) => {
  await Token.deleteMany({ user: userID });
};
