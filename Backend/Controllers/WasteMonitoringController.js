const WasteMonitoring = require("../Model/WasteMonitoringModel");

const getAllWasteMonitorings = async (req, res, next) => {
  try {
    const wasteMonitorings = await WasteMonitoring.find();
    if (!wasteMonitorings || wasteMonitorings.length === 0) {
      return res.status(404).json({ message: "No waste monitorings found" });
    }
    return res.status(200).json({ wasteMonitorings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getWasteMonitoringById = async (req, res, next) => {
  const id = req.params.id;
  let wasteMonitoring;

  try {
    wasteMonitoring = await WasteMonitoring.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!wasteMonitoring) {
    return res.status(404).json({ message: "Waste monitoring not found" });
  }
  return res.status(200).json({ wasteMonitoring });
};

const addWasteMonitoring = async (req, res, next) => {
  const { nic, bintype, location, binsize } = req.body;
  try {
    const newWasteMonitoring = new WasteMonitoring({
      nic,
      bintype,
      location,
      binsize,
    });
    await newWasteMonitoring.save();
    return res.status(201).json({ wasteMonitoring: newWasteMonitoring });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add waste monitoring" });
  }
};

const updateWasteMonitoring = async (req, res, next) => {
  const id = req.params.id;
  const { nic, bintype, location, binsize } = req.body;
  let wasteMonitoring;

  try {
    wasteMonitoring = await WasteMonitoring.findByIdAndUpdate(id, {
      nic: nic,
      bintype: bintype,
      location: location,
      binsize: binsize,
    });
    wasteMonitoring = await wasteMonitoring.save();
  } catch (err) {
    console.log(err);
  }
  if (!wasteMonitoring) {
    return res
      .status(404)
      .json({ message: "Unable to update waste monitoring details" });
  }
  return res.status(200).json({ wasteMonitoring });
};

const deleteWasteMonitoring = async (req, res, next) => {
  const id = req.params.id;

  try {
    const wasteMonitoring = await WasteMonitoring.findByIdAndDelete(id);
    if (!wasteMonitoring) {
      return res.status(404).json({ message: "Unable to delete waste monitoring details" });
    }
    return res.status(200).json({ wasteMonitoring });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllWasteMonitorings,
  getWasteMonitoringById,
  addWasteMonitoring,
  updateWasteMonitoring,
  deleteWasteMonitoring,
};