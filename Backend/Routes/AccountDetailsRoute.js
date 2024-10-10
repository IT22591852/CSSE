const express = require("express");
const router = express.Router();
const AccountController = require("../Controllers/AccountDetailsController");

router.get("/", AccountController.getAllAccounts);
router.get("/:id", AccountController.getAccountById);
router.post("/", AccountController.addAccount);
router.put("/:id", AccountController.updateAccount);
router.delete("/:id", AccountController.deleteAccount);

module.exports = router;