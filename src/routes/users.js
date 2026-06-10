const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");

const userController = require("../controllers/users");

router.post("/", userController.createUser);

router.get("/:id", userController.getUserById);

router.put("/:id", authentication, userController.updateUser);

router.delete("/:id", authentication, userController.deleteUser);

module.exports = router;
