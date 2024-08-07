const UserService = require("../services/user.service");
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
    const user = await UserService.deleteUser(id);
    res.status(200).json({ ...new UserDto(user) });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, password } = req.body;
  console.log(req.body);

  res.status(200);
  try {
    const user = await UserService.updateUser(id, req.body);
    res.status(200).json({ ...new UserDto(user) });
  } catch (error) {
    console.log(error);
  }
};
