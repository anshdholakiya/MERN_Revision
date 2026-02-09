const express = require("express");
const connectDB = require("./config/db.js");

const app = express();
app.use(express.json());

connectDB();

app.use("/users" ,require("./routes/userRoutes.js"))

app.listen(5000, () => {
  console.log("Server running on port 5000");
});