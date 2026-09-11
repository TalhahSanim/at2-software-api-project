const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const sysAdmin = require("../middleware/sysAdmin");

const softwareCategoryController = require("../controllers/softwareCategory");

router.get("/", softwareCategoryController.getAllSoftwareCategory);

router.get(
  "/:id",
  [authentication, sysAdmin],
  softwareCategoryController.getSoftwareCategoryById,
);

router.post(
  "/",
  authentication,
  softwareCategoryController.createSoftwareCategory,
);

router.put(
  "/:id",
  [authentication, sysAdmin],
  softwareCategoryController.updateSoftwareCategory,
);

router.delete(
  "/:id",
  [authentication, sysAdmin],
  softwareCategoryController.deleteSoftwareCategory,
);

module.exports = router;
