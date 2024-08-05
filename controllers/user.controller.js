const UserService = require("../services/user.service");
const UserDto = require("../dto/user.dto");

exports.getAllUsers = async (req, res) => {
  const users = await UserService.getAllUsers();
  res.status(200).json(
    users.map((user) => {
      return { ...new UserDto(user) };
    })
  );
};

exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await UserService.createUser(username, password);
    const userDto = new UserDto(newUser);
    res.status(201).json({ ...userDto });
  } catch (e) {
    res.status(400).json({ message: "Can't create new user" });
  }
};
