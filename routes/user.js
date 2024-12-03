const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { email, username, password, name, surname, phoneNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      name,
      surname,
      phoneNumber,
    });

    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error registering user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    req.session.userId = user._id;
    req.session.email = user.email;

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// GetCurrentUser
router.get("/currentUser", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(req.session.userId).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
});

// Update user profile information
router.put("/updateProfile", async (req, res) => {
  const { username, password, name, surname, phoneNumber } = req.body;

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error logging out", error: err });
      } else {
        return res.status(200).json({ message: "Logout successful" });
      }
    });
  } else {
    return res.status(400).json({ message: "No active session" });
  }
});

module.exports = router;
