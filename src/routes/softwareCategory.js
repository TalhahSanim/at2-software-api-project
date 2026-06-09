const express = require("express");
const router = express.Router();

const softwareCategoryController = require("../controllers/softwareCategory");

router.get("/:id", softwareCategoryController.getSoftwareCategoryById);

router.post("/", softwareCategoryController.createSoftwareCategory);

router.put("/:id", softwareCategoryController.updateSoftwareCategory);

router.delete("/:id", softwareCategoryController.deleteSoftwareCategory);

module.exports = router;
