function validateSignupForm() {
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

  // Store user data including password
  const user = { name, email, password }; // Store password securely
  localStorage.setItem("user", JSON.stringify(user));
  alert("Signup successful!");
  closeForm("signup");
  return true;
}

// Function to toggle password visibility
function togglePasswordVisibility(inputId, toggleButtonId) {
  const passwordInput = document.getElementById(inputId);
  const toggleButton = document.getElementById(toggleButtonId);
  
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  toggleButton.textContent = type === "password" ? "Show" : "Hide";
}

document.addEventListener("DOMContentLoaded", function() {

    // Add event listeners for toggle buttons
    document.getElementById("toggleSignupPassword").addEventListener("click", function() {
    togglePasswordVisibility("signupPsw", "toggleSignupPassword");
    });

    document.getElementById("toggleConfirmPassword").addEventListener("click", function() {
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
