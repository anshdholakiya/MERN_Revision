const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");  //! for browser to access backend 

//! without cores backend can't give access to browser


const app = express();

app.use(cors());          
app.use(express.json());

connectDB(); 

app.use("/users" ,require("./routes/userRoutes.js"))

app.listen(5000, () => {
  console.log("Server running on port 5000");
});