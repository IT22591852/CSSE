const Account = require("../Model/AccountDetailsModel");

const getAllAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find();
    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ message: "No accounts found" });
    }
    return res.status(200).json({ accounts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAccountById = async (req, res, next) => {
  const id = req.params.id;
  let account;

  try {
    account = await Account.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!account) {
    return res.status(404).json({ message: "Account Not Found" });
  }
  return res.status(200).json({ account });
};

const addAccount = async (req, res, next) => {
  const { accounttype, accountname, contactno } = req.body;
  try {
    const newAccount = new Account({
      accounttype,
      accountname,
      contactno,
    });
    await newAccount.save();
    return res.status(201).json({ account: newAccount });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add account" });
  }
};

const updateAccount = async (req, res, next) => {
  const id = req.params.id;
  const { accounttype, accountname, contactno } = req.body;
  let account;

  try {
    account = await Account.findByIdAndUpdate(id, {
      accounttype: accounttype,
      accountname: accountname,
      contactno: contactno,
    });
    account = await account.save();
  } catch (err) {
    console.log(err);
  }
  if (!account) {
    return res
      .status(404)
      .json({ message: "Unable to Update Account Details" });
  }
  return res.status(200).json({ account });
};

const deleteAccount = async (req, res, next) => {
  const id = req.params.id;

  try {
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      return res.status(404).json({ message: "Unable to delete account details" });
    }
    return res.status(200).json({ account });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllAccounts,
  getAccountById,
  addAccount,
  updateAccount,
  deleteAccount,
};