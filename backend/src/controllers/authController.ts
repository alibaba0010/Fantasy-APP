import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;
    if (!email || !username || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    user.lastLogin = new Date();
    await user.save();
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const logout = async (req: Request, res: Response) => {
  // For JWT, logout is handled client-side by deleting the token
  res.json({ message: "Logged out" });
};

export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const updates = req.body;
    if (updates.password) delete updates.password; // Don't allow password update here
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  // Placeholder: Implement email sending logic
  res.json({ message: "Password reset link sent (not implemented)" });
};

export const resetPassword = async (req: Request, res: Response) => {
  // Placeholder: Implement password reset logic
  res.json({ message: "Password reset (not implemented)" });
};
