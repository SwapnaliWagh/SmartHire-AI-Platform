const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// REGISTER

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.json({ message: "User Registered Successfully" });

    } catch (error) {
        console.log(error);
    }
});


// LOGIN

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ message: "Invalid Password" });
        }

        res.json({ message: "Login Successful" });

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;