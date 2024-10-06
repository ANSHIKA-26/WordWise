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
  