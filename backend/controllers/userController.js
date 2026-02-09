const User = require("../model/User");
const bcrypt = require("bcryptjs"); //! for bycrupt password
const jwt = require("jsonwebtoken");



exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        //* if usrer aleredy there
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        //save user

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User created" });
    } catch {
        res.status(500).json({ message: "Server Error" })
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("LOGIN HIT");
        console.log("EMAIL:", email);
        console.log("PASSWORD:", password);

        // 1. check input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        //! find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        console.log("USER FROM DB:", user);

        //! compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credantialis" });
        console.log("PASSWORD MATCH:", isMatch);

        //! create token
        const token = jwt.sign(
            { userId: user._id },
            "SECRET_KEY",
            { expiresIn: "1h" }
        )

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

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
        const users = await User.findById(req.userId).select("-password");  //! it means do not send password back
        // const users = await User.findById(req.userId)
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


