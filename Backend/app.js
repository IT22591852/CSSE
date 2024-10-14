const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// link routes
const regularCollectionRoute = require("./Routes/RegularCollectionRoutes.js");
const userRoute = require("./Routes/UserLoginRoutes.js");
const driverRoute = require("./Routes/DriveLoginRoutes.js");
const adminRoute = require("./Routes/AdminLoginRoutes.js");





// middleware
app.use(express.json());
app.use(cors());


// routes
app.use("/regularcollection", regularCollectionRoute);
app.use("/userlogin", userRoute);
app.use("/driverlogin", driverRoute);
app.use("/adminlogin", adminRoute);









// connect to MongoDB
mongoose.connect("mongodb+srv://admin:DiiHZaELJTGkk6CE@atlascluster.3atuzvl.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");``
  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
}).catch((err) => {
  console.log(err);
});
