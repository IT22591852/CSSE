const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserLoginControllers');

router.get('/', userController.getAllUsers);
router.post('/', userController.addUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;