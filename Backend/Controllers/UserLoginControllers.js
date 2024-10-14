const UserRegistration = require('../Model/UserLoginModel');

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

  let user;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    user = new UserRegistration({
      name,
      email,
      address,
      phone,
      password,
    });
    await user.save();
    
    return res.status(201).json({ message: "User added successfully", user });

  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "Unable to add user" });
  }
  return res.status(200).json({ user });
};

// Retrieve user
const getUserById = async (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id);
  
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
    const id = mongoose.Types.ObjectId(req.params.id);
    const { name, email, address, phone, password, confirmPassword } = req.body;
  
    let user;
  
    try {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      user = await UserRegistration.findByIdAndUpdate(id, {
        name,
        email,
        address,
        phone,
        password,
      }, { new: true });
      user = await user.save();
    } catch (err) {
      console.log(err);
    }
    if (!user) {
      return res.status(404).json({ message: "Unable to update user details" });
    }
    return res.status(200).json({ user });
  };

// Delete user
const deleteUser = async (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id);
  
    let user;
  
    try {
      user = await UserRegistration.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
    if (!user) {
      return res.status(404).json({ message: "Unable to delete user details" });
    }
    return res.status(200).json({ user });
  };
exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;