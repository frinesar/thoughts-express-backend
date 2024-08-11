const UserService = require("../services/user.service");
const TokenService = require("../services/token.service");
const UserDto = require("../dto/user.dto");
const ApiError = require("../exceptions/api.error");

exports.getAllUsers = async (req, res) => {
  const users = await UserService.getAllUsers();
  res.status(200).json(
    users.map((user) => {
      return { ...new UserDto(user) };
    })
  );
};

exports.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const newUser = await UserService.createUser(username, password);
    const userDto = new UserDto(newUser);
    res.status(201).json({ ...userDto });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserService.getUser(id);
    res.status(200).json({ ...new UserDto(user) });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (req.user.id !== id) {
      throw ApiError.Forbidden("No privileges to delete this user");
    }
    const user = await UserService.deleteUser(id);
    res.status(200).json({ ...new UserDto(user) });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (req.user.id !== id) {
      throw ApiError.Forbidden("No privileges to update this user");
    }
    const user = await UserService.updateUser(id, req.body);
    res.status(200).json({ ...new UserDto(user) });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await UserService.loginUser(username, password);
    const payload = { ...new UserDto(user) };
    const { accessToken, refreshToken } = TokenService.createTokens(payload);
    await TokenService.saveRefreshToken(payload, refreshToken);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

exports.logoutUser = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return next(ApiError.Unauthorized("No logged-in user"));
  }
  await UserService.logoutUser(refreshToken);
  res.clearCookie("refreshToken");
  res.sendStatus(200);
};

exports.refresh = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  try {
    if (!refreshToken) {
      return next(ApiError.Unauthorized("No logged-in user"));
    }
    const accessToken = await UserService.refresh(refreshToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
