const DriverRegistration = require("../Model/DriverLoginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

if(!DriverRegistration) {
    throw new Error('DriverRegistration model is not defined');
}
// Get all drivers
const getAllDrivers = async (req, res, next) => {
  let drivers;
  try {
    drivers = await DriverRegistration.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to retrieve drivers" });
  }
  if (!drivers) {
    return res.status(404).json({ message: "Drivers not found" });
  }
  return res.status(200).json({ drivers });
};

// Add a new driver
const addDriver = async (req, res, next) => {
  const { name, email, address, phone, licenseNo, vehicleNo, password, confirmPassword } = req.body;

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Check if driver already exists
  const oldDriver = await DriverRegistration.findOne({ email });
  if (oldDriver) {
    return res.status(400).json({ error: "Driver already exists" });
  }

  // Hash the password
  const encryptedPassword = await bcrypt.hash(password, 10);

  let driver;
  try {
    // Create a new driver instance
    driver = new DriverRegistration({
      name,
      email,
      address,
      phone,
      licenseNo,
      vehicleNo,
      password: encryptedPassword,
      confirmPassword,
    });
    await driver.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Unable to add driver" });
  }

  return res.status(201).json({ message: "Driver added successfully", driver });
};

// Get driver by ID
const getDriverById = async (req, res, next) => {
  const id = req.params.id;

  let driver;
  try {
    driver = await DriverRegistration.findById(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error retrieving driver" });
  }

  if (!driver) {
    return res.status(404).json({ message: "Driver not found" });
  }
  return res.status(200).json({ driver });
};

// Update driver details
const updateDriver = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, address, phone, licenseNo, vehicleNo, password, confirmPassword } = req.body;

  // Check if password needs to be updated
  let updateData ;
  try {
    updateData = await DriverRegistration.findById(id,{
   name: name,
   email: email,
   address: address,
   phone: phone,
   licenseNo: licenseNo,
   vehicleNo: vehicleNo,
   password: password, 
   confirmPassword: confirmPassword,
    });
    updateData = await updateData.save();
  } catch (err) {
    console.log(err);
  }
  if (!updateData) {
    return res.status(404).json({ message: "Unable to update driver details" }); 
  }
  return res.status(200).json({ message: "Driver updated successfully", driver: updateData });
  };
// Delete a driver
const deleteDriver = async (req, res, next) => {
  const id = req.params.id;

  let driver;
  try {
    driver = await DriverRegistration.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error deleting driver" });
  }

  if (!driver) {
    return res.status(404).json({ message: "Driver not found" });
  }

  return res.status(200).json({ message: "Driver deleted successfully", driver });
};

module.exports = {
  getAllDrivers,
  addDriver,
  getDriverById,
  updateDriver,
  deleteDriver,
};
