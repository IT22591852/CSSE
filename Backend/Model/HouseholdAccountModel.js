const mongoose = require("mongoose");

const HouseholdSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    residenceType: {
        type: String,
        enum: ["Residential", "Non-Residential"],     //give dropdownoptions
        required: true
    },
    wastegenarationhabbit: {
        type: String,
        enum: ["1-2GarbageBags/Week", "3-4GarbageBags/Week", "6+GarbageBags/Week","notSure"],     //give dropdownoptions
        required: true

    }
});

module.exports = mongoose.model("HouseholdWasteManage", HouseholdSchema);