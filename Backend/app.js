const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// link routes
const HouseholdAccountRoute = require("./Routes/HouseholdAccountRoute");
const BusinessAccountRoute = require("./Routes/BusinessAccountRoute");
const AccountDetailsRoute = require("./Routes/AccountDetailsRoute");

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/household", HouseholdAccountRoute);
app.use("/business", BusinessAccountRoute);
app.use("/account", AccountDetailsRoute);

// connect to MongoDB
mongoose.connect("mongodb+srv://admin:DiiHZaELJTGkk6CE@atlascluster.3atuzvl.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
}).catch((err) => {
  console.log(err);
});
