const { Router } = require("express");
const UserController = require("../../controllers/user.controller");

const router = new Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUser);
router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);
router.delete("/:id", UserController.deleteUser);
router.put("/:id", UserController.updateUser);

module.exports = router;
