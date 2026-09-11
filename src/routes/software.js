const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const sysAdmin = require("../middleware/sysAdmin");

const softwareController = require("../controllers/software");

router.get("/", softwareController.getAllSoftware);

router.get("/name", softwareController.getSoftwareByName);

router.get(
  "/:id",
  [authentication, sysAdmin],
  softwareController.getSoftwareById,
);

router.post("/", authentication, softwareController.createSoftware);

router.put(
  "/:id",

  softwareController.updateSoftware,
);

router.delete(
  "/:id",

  softwareController.deleteSoftware,
);

module.exports = router;
