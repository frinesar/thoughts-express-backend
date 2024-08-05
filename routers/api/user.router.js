const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) =>
  res.status(200).json({
    message: "users",
  })
);

module.exports = router;
