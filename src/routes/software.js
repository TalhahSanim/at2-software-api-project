const express = require("express");
const router = express.Router();

const softwareController = require("../controllers/software");

router.get("/", softwareController.getAllSoftware);

router.get("/name", softwareController.getSoftwareByName);

router.get("/:id", softwareController.getSoftwareById);

router.post("/", softwareController.createSoftware);

router.put("/:id", softwareController.updateSoftware);

router.delete("/:id", softwareController.deleteSoftware);

module.exports = router;
