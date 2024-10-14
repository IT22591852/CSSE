const express = require('express');
const router = express.Router();
const driverController = require('../Controllers/DriverLoginControllers');

// Define routes and map them to controller functions
router.get('/', driverController.getAllDrivers);             
router.post('/', driverController.addDriver);                
router.get('/:id', driverController.getDriverById);        
router.put('/:id', driverController.updateDriver);           
router.delete('/:id', driverController.deleteDriver);        

module.exports = router;
