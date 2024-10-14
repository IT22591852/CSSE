const UserRegistration = require('../Model/UserLoginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

if (!UserRegistration) {
  throw new Error('UserRegistration model is not defined');
}

// Get all users
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await UserRegistration.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "Users not found" });
  }
  return res.status(200).json({ users });
};

// Add user
const addUser = async (req, res, next) => {
  const { name, email, address, phone, password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const oldUser = await UserRegistration.findOne({ email });
  if (oldUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  let user;

  try {
    user = new UserRegistration({
      name,
      email,
      address,
      phone,
      password:encryptedPassword,
      confirmPassword,
    });
    await user.save();
    return res.status(201).json({ message: "User added successfully", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add user", error: err.message });
  }
};

// Retrieve user
const getUserById = async (req, res, next) => {
  const id = req.params.id;

  let user;

  try {
    user = await UserRegistration.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
};

// Update user
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, address, phone, password, confirmPassword } = req.body;

  // Check if required fields for non-password updates are provided

  let updateData ;
  try  {
    updateData = await UserRegistration.findById(id,{
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
  if(!updateData) {
    return res.status(404).json({ message: "Unable to update user details" });
  }return res.status(200).json({ message: "User updated successfully", user: updateData });
};

// Delete user
const deleteUser = async (req, res, next) => {
  const id = req.params.id ;

  let user;

  try {
    user = await UserRegistration.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to delete user details", error: err.message });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User deleted successfully", user });
};

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
