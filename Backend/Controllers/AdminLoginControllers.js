const AdminRegistration = require('../Model/AdminLoginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Ensure AdminRegistration model is defined
if (!AdminRegistration) {
  throw new Error('AdminRegistration model is not defined');
}

// Get all admins
const getAllAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await AdminRegistration.find();
  } catch (err) {
    console.log(err);
  }
  if (!admins) {
    return res.status(404).json({ message: "Admins not found" });
  }
  return res.status(200).json({ admins });
};

// Add a new admin
const addAdmin = async (req, res, next) => {
  const { name, email, address, phone, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Encrypt password
  const encryptedPassword = await bcrypt.hash(password, 10);

  // Check if admin already exists
  const oldAdmin = await AdminRegistration.findOne({ email });
  if (oldAdmin) {
    return res.status(400).json({ error: "Admin already exists" });
  }

  let admin;
  try {
    // Create a new admin instance
    admin = new AdminRegistration({
      name,
      email,
      address,
      phone,
      password: encryptedPassword,
      confirmPassword,
    });
    await admin.save();
    return res.status(201).json({ message: "Admin added successfully", admin });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add admin", error: err.message });
  }
};

// Retrieve admin by ID
const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await AdminRegistration.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }
  return res.status(200).json({ admin });
};

// Update admin details
const updateAdmin = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, address, phone, password, confirmPassword } = req.body;

  // Update data object
  let updateData;
  try {
    updateData = await AdminRegistration.findById(id,{

    name: name,
    email: email,
    address: address,
    phone: phone,
    password: password,
    confirmPassword: confirmPassword,
  });
updateData = await updateData.save();
  } catch (err) { 
    console.log(err);
  }

  if (!updateData) {
    return res.status(404).json({ message: "Unable to update admin details" });
  }
  return res.status(200).json({ message: "Admin updated successfully", admin: updateData });
};
  
 

// Delete admin
const deleteAdmin = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await AdminRegistration.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to delete admin", error: err.message });
  }

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  return res.status(200).json({ message: "Admin deleted successfully", admin });
};

exports.getAllAdmins = getAllAdmins;
exports.addAdmin = addAdmin;
exports.getAdminById = getAdminById;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;
