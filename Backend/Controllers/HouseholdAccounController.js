const HouseholdWasteManage = require("../Model/HouseholdAccountModel");

const getAllHouseholds = async (req, res, next) => {
  try {
    const households = await HouseholdWasteManage.find();
    if (!households || households.length === 0) {
      return res.status(404).json({ message: "No households found" });
    }
    return res.status(200).json({ households });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getHouseholdById = async (req, res, next) => {
  const id = req.params.id;
  let household;

  try {
    household = await HouseholdWasteManage.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!household) {
    return res.status(404).json({ message: "Household Not Found" });
  }
  return res.status(200).json({ household });
};

const addHousehold = async (req, res, next) => {
  const { address, residenceType, wastegenarationhabbit } = req.body;
  try {
    const newHousehold = new HouseholdWasteManage({
      address,
      residenceType,
      wastegenarationhabbit,
    });
    await newHousehold.save();
    return res.status(201).json({ household: newHousehold });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add household" });
  }
};

const updateHousehold = async (req, res, next) => {
  const id = req.params.id;
  const { address, residenceType, wastegenarationhabbit } = req.body;
  let household;

  try {
    household = await HouseholdWasteManage.findByIdAndUpdate(id, {
      address: address,
      residenceType: residenceType,
      wastegenarationhabbit: wastegenarationhabbit,
    });
    household = await household.save();
  } catch (err) {
    console.log(err);
  }
  if (!household) {
    return res
      .status(404)
      .json({ message: "Unable to Update Household Details" });
  }
  return res.status(200).json({ household });
};

const deleteHousehold = async (req, res, next) => {
  const id = req.params.id;

  try {
    const household = await HouseholdWasteManage.findByIdAndDelete(id);
    if (!household) {
      return res.status(404).json({ message: "Unable to delete household details" });
    }
    return res.status(200).json({ household });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllHouseholds,
  getHouseholdById,
  addHousehold,
  updateHousehold,
  deleteHousehold,
};