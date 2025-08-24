const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ fullName, email, password: hash });
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Email already exists" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d", 
  });

res.cookie("token", token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, 
  });
 return res.status(200).json({ token, message: "Logged",user: { id: user._id, fullName: user.fullName, email: user.email } });
};


exports.logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};
