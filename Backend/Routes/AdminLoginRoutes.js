const express = require('express');
const router = express.Router();
const AdminLoginController = require('../Controllers/AdminLoginControllers');


router.get('/', AdminLoginController.getAllAdmins);
router.post('/', AdminLoginController.addAdmin);
router.get('/:id', AdminLoginController.getAdminById);
router.put('/:id', AdminLoginController.updateAdmin);
router.delete('/:id', AdminLoginController.deleteAdmin);

module.exports = router;
