const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/middleware");

//Public route
router.post("/register", UserController.register);

//Protected routes (requiring authentication)
router.get("/getAllUsers", verifyToken, UserController.getAllUsers);
router.put("/updateUser", verifyToken, UserController.updateUser);
router.delete("/deleteUser", verifyToken, UserController.deleteUser);
router.get("/getUser", verifyToken, UserController.getUser);

module.exports = router;
