// mongodb+srv://admin:<db_password>@atlascluster.3atuzvl.mongodb.net/
//  DiiHZaELJTGkk6CE
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// middleware
app.use(express.json());
app.use(cors());   

mongoose.connect("mongodb+srv://admin:DiiHZaELJTGkk6CE@atlascluster.3atuzvl.mongodb.net/").then(() => 
    console.log("MongoDB connected"))
    .then(() => {
        app.listen(4000)

    }).catch((err) => 
        console.log(err));