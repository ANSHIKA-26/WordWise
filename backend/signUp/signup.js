const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function validateSignupForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPsw").value;
  const confirmPassword = document.getElementById("confirmPsw").value;

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Check if user already exists
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && storedUser.email === email) {
    alert("Account already exists. Please sign in.");
    openLogin();
    return false;
  }

  // Validate password strength
  const strengthPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!strengthPattern.test(password)) {
    alert(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
    return false;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  // check user present in database or not
  const existingUser = await User.find({ email });
  if (existingUser) {
    alert("User already exist!");
    openLogin();
    return false;
  }

  await createUser();

  alert("Signup successful!");
  closeForm("signup");
  // Store user data including password
  const user = { name, email, password }; // Store password securely
  localStorage.setItem("user", JSON.stringify(user));
  return true;
}

async function createUser(user) {
  const { name, email, password } = user;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user in db
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
  });

  return;
}

export async function login() {
  // Get email and password from request body
  const email = document.querySelector(".name").value;
  const password = document.querySelector(".pass").value;

  // Find user exist or not for this email
  const user = await User.findOne({ email });

  // If user not found
  if (!user) {
    alert("User not exist!");
    return;
  }

  // Generate JWT token and Compare Password
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
  }
}

// Function to toggle password visibility
function togglePasswordVisibility(inputId, toggleButtonId) {
  const passwordInput = document.getElementById(inputId);
  const toggleButton = document.getElementById(toggleButtonId);

  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  toggleButton.textContent = type === "password" ? "Show" : "Hide";
}

document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners for toggle buttons
  document
    .getElementById("toggleSignupPassword")
    .addEventListener("click", function () {
      togglePasswordVisibility("signupPsw", "toggleSignupPassword");
    });

  document
    .getElementById("toggleConfirmPassword")
    .addEventListener("click", function () {
      togglePasswordVisibility("confirmPsw", "toggleConfirmPassword");
    });
});

// Functions to open and close the form
function openSignup() {
  document.getElementById("signupForm").style.display = "block";
}

function closeForm(formId) {
  document.getElementById(formId + "Form").style.display = "none";
}

// Example function to open login form (to be implemented)
function openLogin() {
  // Implement your login opening logic here
}
