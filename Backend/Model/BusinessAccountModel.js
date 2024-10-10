const mongoose = require("mongoose");

const schema = mongoose.Schema;

const BusinessSchema = new schema({
    Businesstype: {
        type: String,
        enum: ["Small", "Medium", "Large"],     //give dropdownoptions
        required: true,
        set: (v) => v.charAt(0).toUpperCase() + v.slice(1) // convert to uppercase
  
    },
    
        estimatedwaste: {
            type: String,
            enum: ["0-25", "25-50", "50-75", "75-100"],     //give dropdownoptions
            required: true
    }

});

module.exports = mongoose.model("BusinessAccount", BusinessSchema);