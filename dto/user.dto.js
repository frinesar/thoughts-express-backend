module.exports = class UserDto {
  id;
  username;

  constructor(user) {
    this.id = user._id;
    this.username = user.username;
  }
};
