const mongoose = require("mongoose");

const schema = mongoose.Schema;

const AccountSchema = new schema({
    accounttype: {
        type: String,
        enum: ["Business", "Household"],     //give dropdownoptions
        required: true
    },
    accountname: {
        type: String,
        required: true
    },
    contactno: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("AccountDetails", AccountSchema)