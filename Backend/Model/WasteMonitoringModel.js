const mongoose = require("mongoose");

const schema = mongoose.Schema;

const WasteMonitoringSchema = new schema({
    nic: {
        type: String,
        required: true
    },
    bintype: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    binsize: {
        type: String,
        required: true
    },
    
    date: {
        type: Date,
        default: Date.now}
})

module.exports = mongoose.model("WasteMonitoring", WasteMonitoringSchema)