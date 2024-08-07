const ApiError = require("../exceptions/api.error");

module.exports = (err, req, res, next) => {
  console.log(err);

  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Server error" });
  }
};
