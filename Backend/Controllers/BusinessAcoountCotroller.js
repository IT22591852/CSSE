const BusinessAccount = require("../Model/BusinessAccountModel");

const getAllBusinesses = async (req, res, next) => {
  try {
    const businesses = await BusinessAccount.find();
    if (!businesses || businesses.length === 0) {
      return res.status(404).json({ message: "No businesses found" });
    }
    return res.status(200).json({ businesses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBusinessById = async (req, res, next) => {
  const id = req.params.id;
  let business;

  try {
    business = await BusinessAccount.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!business) {
    return res.status(404).json({ message: "Business Not Found" });
  }
  return res.status(200).json({ business });
};

const addBusiness = async (req, res, next) => {
  const { Businesstype, estimatedwaste } = req.body;
  try {
    const newBusiness = new BusinessAccount({
      Businesstype,
      estimatedwaste,
    });
    await newBusiness.save();
    return res.status(201).json({ business: newBusiness });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add business" });
  }
};

const updateBusiness = async (req, res, next) => {
  const id = req.params.id;
  const { Businesstype, estimatedwaste } = req.body;
  let business;

  try {
    business = await BusinessAccount.findByIdAndUpdate(id, {
      Businesstype: Businesstype,
      estimatedwaste: estimatedwaste,
    });
    business = await business.save();
  } catch (err) {
    console.log(err);
  }
  if (!business) {
    return res
      .status(404)
      .json({ message: "Unable to Update Business Details" });
  }
  return res.status(200).json({ business });
};

const deleteBusiness = async (req, res, next) => {
  const id = req.params.id;

  try {
    const business = await BusinessAccount.findByIdAndDelete(id);
    if (!business) {
      return res.status(404).json({ message: "Unable to delete business details" });
    }
    return res.status(200).json({ business });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllBusinesses,
  getBusinessById,
  addBusiness,
  updateBusiness,
  deleteBusiness,
};