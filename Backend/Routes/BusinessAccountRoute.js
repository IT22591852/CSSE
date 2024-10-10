const express = require("express");
const router = express.Router();
const BusinessAccountController = require("../Controllers/BusinessAcoountCotroller");

router.get("/", BusinessAccountController.getAllBusinesses);
router.get("/:id", BusinessAccountController.getBusinessById);
router.post("/", BusinessAccountController.addBusiness);
router.put("/:id", BusinessAccountController.updateBusiness);
router.delete("/:id", BusinessAccountController.deleteBusiness);

module.exports = router;