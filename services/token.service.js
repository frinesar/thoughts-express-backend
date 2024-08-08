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
  return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
};
