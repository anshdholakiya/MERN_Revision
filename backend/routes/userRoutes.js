const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  signup,
  login
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/",authMiddleware,getUsers);

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/", createUser);
router.post("/signup",signup);  //! post reuest in signup
router.post("/login",login);  


module.exports = router;