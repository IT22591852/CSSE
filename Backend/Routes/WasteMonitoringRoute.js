const express = require("express");
const router = express.Router();
const WasteMonitoringController = require("../Controllers/WasteMonitoringController");

router.get("/", WasteMonitoringController.getAllWasteMonitorings);
router.get("/:id", WasteMonitoringController.getWasteMonitoringById);
router.post("/", WasteMonitoringController.addWasteMonitoring);
router.put("/:id", WasteMonitoringController.updateWasteMonitoring);
router.delete("/:id", WasteMonitoringController.deleteWasteMonitoring);

module.exports = router;