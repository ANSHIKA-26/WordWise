
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

function checkLogin() {
  const isLoggedIn = localStorage.getItem('authToken'); // Example: Check for token
  const profileLink = document.getElementById('profileLink');

  // Show "My Profile" if the user is logged in
  if (isLoggedIn) {
    profileLink.style.display = 'block';
  }
}

 // Toggle menu display
 function toggleProfileMenu() {
  const profileMenu = document.getElementById('profileMenu');
  profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

