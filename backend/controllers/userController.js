const User = require("../model/User");

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: "name and email is not there" });
        }

        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json(user);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(user);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
};