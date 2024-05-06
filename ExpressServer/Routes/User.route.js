const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/User.controller");

router.get("/", UserController.hello);
router.get("/getAllUser", UserController.getAllUsers);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.patch("/updateInfo/:_id", UserController.updateInfo);
router.delete("/deleteOneUser/:_id", UserController.deleteOneUser);
router.patch("/logOut/:_userId", UserController.logOut);

module.exports = router;
