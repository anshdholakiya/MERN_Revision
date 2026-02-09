const express = require("express"); 
const app = express();

//!middle ware
app.use(express.json());
app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Login hit");
});

//! custom middleware

function anshmiddleware(req,res,next){
    req.user = "Ansh";
    next();
}

app.use(anshmiddleware);

app.get("/ansh/" , anshmiddleware,(req,res)=>{
    res.send(req.user);
})





app.get("/", (req, res) => {
  res.send("Backend is running");
});


//! route paramter
app.get("/api/users/:id",(req,res)=>{
    const userId = req.params.id;
    res.json({message : `user id is ${userId}`});
})

//! query parameter
app.get("/api/search",(req,res)=>{
    const keyword = req.query.q;
    res.json({search:keyword})
})
 

// app.get("/api/users", (req, res) => {
//   res.json([
//     { id: 1, name: "Ansh" },
//     { id: 2, name: "User2" }
//   ]);
// });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});