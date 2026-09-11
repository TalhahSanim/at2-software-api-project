const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const sysAdmin = require("../middleware/sysAdmin");

const userController = require("../controllers/users");

router.post("/", userController.createUser);

router.get("/:id", [authentication, sysAdmin], userController.getUserById);

router.put("/:id", [authentication, sysAdmin], userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
