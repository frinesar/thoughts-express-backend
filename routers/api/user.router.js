const { Router } = require("express");
const UserController = require("../../controllers/user.controller");

const router = new Router();

router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);

module.exports = router;
