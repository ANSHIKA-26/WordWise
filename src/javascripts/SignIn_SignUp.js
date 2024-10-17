
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
