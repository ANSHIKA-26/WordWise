import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
dotenv.config();

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// Register new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile (authenticated route)
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Admin route: Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export function ForgotPassWordEmail(req, resp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your email id",
      pass: "your password",
    },
  });

  const mailOptions = {
    from: "your email id",
    to: req.body.Email,
    subject: "WordWise Reset Password",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f7f7f7;
                  color: #333;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
              }
              h2 {
                  color: #333;
              }
              p {
                  font-size: 16px;
                  line-height: 1.5;
                  color: #666;
              }
              .button-container {
                  text-align: center;
                  margin-top: 20px;
              }
              .button {
                  background-color: #4CAF50;
                  color: #ffffff;
                  padding: 12px 20px;
                  border: none;
                  border-radius: 4px;
                  text-decoration: none;
                  font-size: 16px;
                  cursor: pointer;
                  transition: background-color 0.3s ease;
              }
              .button:hover {
                  background-color: #45a049;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <h2>Password Reset Request</h2>
              <p>Hello,</p>
              <p>We received a request to reset your password. Click the button below to proceed with resetting your password.</p>
              <div class="button-container">
                  <a href="https://wordwise-k9ho.onrender.com/resetpass.html" class="button">Reset Password</a>
              </div>
             
              <p>Thank you,<br>Team WordWise</p>
          </div>
      </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: " + error);
      resp.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      resp.status(200).send("Form data sent successfully");
    }
  });
}

export async function ResetPassword(req, resp) {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return resp
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    await user.save();

    resp
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    resp.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
}
