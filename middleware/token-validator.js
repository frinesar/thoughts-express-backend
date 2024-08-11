const ApiError = require("../exceptions/api.error");
const TokenService = require("../services/token.service");

module.exports = async (req, res, next) => {
  const accessToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    next(ApiError.Unauthorized("No access token provided"));
  }
  if (!TokenService.validateAccessToken(accessToken)) {
    next(ApiError.Unauthorized("Invalid token"));
  }
  req.user = TokenService.validateAccessToken(accessToken);
  next();
};
