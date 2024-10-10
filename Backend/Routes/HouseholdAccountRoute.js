const express = require("express");
const router = express.Router();
const HouseholdWasteManageController = require("../Controllers/HouseholdAccounController");

router.get("/", HouseholdWasteManageController.getAllHouseholds);
router.get("/:id", HouseholdWasteManageController.getHouseholdById);
router.post("/", HouseholdWasteManageController.addHousehold);
router.put("/:id", HouseholdWasteManageController.updateHousehold);
router.delete("/:id", HouseholdWasteManageController.deleteHousehold);

module.exports = router;