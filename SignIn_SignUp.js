function validateLoginForm() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPsw").value;

  // Get stored user data from local storage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Validate password length
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  // Check if user exists and password matches
  if (
    storedUser &&
    storedUser.email === email &&
    storedUser.password === password
  ) {
    alert("Login successful!");
    localStorage.setItem("loggedIn", "true"); // Store login status
    closeForm("login");
    return true;
  } else {
    alert(
      "Invalid email or password. Please sign up if you don't have an account."
    );
    openSignup();
    return false;
  }
}

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

function openLogin() {
  document.getElementById("loginForm").style.display = "block";
  closeForm("signup");
}

function openSignup() {
  document.getElementById("signupForm").style.display = "block";
  closeForm("login");
}

function closeForm(formType) {
  if (formType === "login") {
    document.getElementById("loginForm").style.display = "none";
  } else if (formType === "signup") {
    document.getElementById("signupForm").style.display = "none";
  }
}
