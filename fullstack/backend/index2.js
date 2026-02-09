const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json()); //! i have to put middleware

mongoose.connect("mongodb://127.0.0.1:27017/testdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running");
});


// ! import user model
const User = require("./model/User")


//! post
app.post("/user", async (req, res) => {
  try{
    const {name,email} = req.body;
    if(!name || !email){
      return res.status(400).json({message : "name or email not provided"})
    }

    const user = await User.create({name,email});
    res.status(201).json(user);
  }catch{
    res.status(500).json({message:"server error"})
  }
});

//! get route

app.get("/users", async (req, res) => {
  try{ 
    console.log("GET /users hit");
    const users = await User.find();
    res.json(users);
  }catch{
    res.status(500).json({message:"server error"});
  }
});

//! put request for updateing data

app.put("/users/:id",async (req,res)=>{
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name:req.body.name,
      email:req.body.email
    },
    {new : true}
  );

  res.json(updateUser);
})

// ! delete route

app.delete("/users/:id",async (req,res)=>{
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  res.json(deleteUser);
})



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
