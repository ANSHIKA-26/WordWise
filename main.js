let toggle = document.querySelector("#header .toggle-button");
let collapse = document.querySelectorAll("#header .collapse");
document.getElementById("backToTop").style.display = "none";

if (toggle) {
  toggle.addEventListener("click", function () {
    collapse.forEach((col) => col.classList.toggle("collapse-toggle"));
  });
}

//swiper library
// main.js
document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".swiper-container", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  detectColorScheme();
});

window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;
  var height = document.body.offsetHeight - window.innerHeight;
  if (scrollPosition > 90) {
    document.getElementById("backToTop").style.display = "block";
  } else {
    document.getElementById("backToTop").style.display = "none";
  }
});

document.getElementById("backToTop").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.onscroll = function () {
  myFunction();
};

// get the current value
let navbar = document.getElementById("header");

// sticky function
function myFunction() {
  // get the navbar position
  let sticky = navbar.offsetTop;

  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

// Open the specific form (login or signup)
function openForm(formType) {
  // Hide both forms first
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "none";

  // Display the requested form
  if (formType === "login") {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
  } else if (formType === "signup") {
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
  }
}

// Close the specific form
function closeForm(formType) {
  if (formType === "login") {
    document.getElementById("loginForm").style.display = "none";
  } else if (formType === "signup") {
    document.getElementById("signupForm").style.display = "none";
  }
}

//Active Nav bar
function openForgotPassword() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("email").value = "";
  document.getElementById("forgot-password-modal").style.display = "block";
}

// Close Forgot Password Modal
function closeForgotPasswordModal() {
  document.getElementById("email").value = "";
  document.getElementById("forgot-password-modal").style.display = "none";
}

// Simulate form submission for Forgot Password
// function submitForgotPassword() {
//   const email = document.getElementById("email").value;
//   if (email) {
//     alert("Password reset instructions have been sent to " + email);
//     closeForgotPasswordModal(); // Close modal after submission
//   } else {
//     alert("Please enter your email.");
//   }

async function submitForgotPassword() {
  const email = document.getElementById("email").value;

  try {
    const response = await fetch(
      "http://localhost:5000/api/users/forgotpassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
        }),
      }
    );

    if (response.status === 200) {
      alert("Email sent successfully!");
    } else {
      alert("Failed to send email");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("forgot-password-modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const navLinks = document.querySelectorAll(".nav-link");
const setActiveLink = () => {
  const activePath = localStorage.getItem("activeLink");
  if (activePath) {
    navLinks.forEach((link) => {
      const linkHref = link.getAttribute("href");
      if (linkHref === activePath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", setActiveLink);

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((link) => link.classList.remove("active"));

    this.classList.add("active");

    localStorage.setItem("activeLink", this.getAttribute("href"));
  });
});

function detectColorScheme() {
  var theme = "light";

  //local storage is used to override OS theme settings
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") == "dark") {
      var theme = "dark";
    }
  } else if (!window.matchMedia) {
    //matchMedia method not supported
    return false;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //OS theme setting detected as dark
    var theme = "dark";
  }

  //dark theme preferred, set document with a `data-theme` attribute
  if (theme == "dark") {
    let toggleSwitch = document.querySelector(
      '#theme-switch input[type="checkbox"]'
    );
    document.documentElement.setAttribute("data-theme", "dark");
    toggleSwitch.checked = true;
  }
}

//identify the toggle switch HTML element
const toggleSwitch = document.querySelector(
  '#theme-switch input[type="checkbox"]'
);

//function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme(e) {
  if (e.target.checked) {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    toggleSwitch.checked = true;
  } else {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    toggleSwitch.checked = false;
  }
}

if (toggleSwitch)
  //listener for changing themes
  toggleSwitch.addEventListener("change", switchTheme, false);

//pre-check the dark-theme checkbox if dark-theme is set
if (document.documentElement.getAttribute("data-theme") == "dark") {
  toggleSwitch.checked = true;
}

let aboutSection = document.querySelector("#about");

if (aboutSection) {
  document.querySelector("#about").addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#about-us").scrollIntoView({ behavior: "smooth" });
  });
}

function submitNewsletter() {
  const emailInput = document.getElementById("emailInput");
  const errorMessage = document.getElementById("error-message");
  const email = emailInput.value;

  // Simple email validation check
  if (!email.includes("@")) {
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  // Send POST request
  fetch("http://127.0.0.1:3000/newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Subscribed successfully!");
        emailInput.value = ""; // Clear the input field
      } else {
        alert("Failed to subscribe. Please try again later.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
}

// Get hamburger and nav links
var hamburger = document.getElementById("hamburger");
var navLinks1 = document.getElementById("nav-links1");

// Only add event listener if both elements exist on the page
if (hamburger && navLinks1) {
  hamburger.addEventListener("click", () => {
    navLinks1.classList.toggle("active");
  });
} else {
  console.warn("Hamburger or Nav Links not found on this page.");
}



// Function to validate and handle login form submission
async function validateLoginForm() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPsw").value;

  try {
    const response = await fetch('http://127.0.0.1:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    console.log(result);
    console.log(result.token);

    if (response.ok) {
      localStorage.setItem('authToken', result.token);
      alert("You are logged in");
      closeForm('login');
      window.location.reload(); // Reload to show the user as logged in
    } else {
      alert(result.message || 'Login failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }

  return false; // Prevent default form submission
}

// Function to validate and handle signup form submission
async function validateSignupForm() {
  const username = document.getElementById("name").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPsw").value;
  const confirmPassword = document.getElementById("confirmPsw").value;

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  try {
    const response = await fetch('http://127.0.0.1:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem('authToken', result.token);
      alert(result.message);
      closeForm('signup');
      window.location.reload(); // Reload to show the user as logged in
    } else {
      alert(result.message || 'Signup failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }

  return false; // Prevent default form submission
}

// Utility function to toggle password visibility
function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("bi-eye");
    icon.classList.add("bi-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("bi-eye-slash");
    icon.classList.add("bi-eye");
  }
}


// Function to check login status and toggle menu options
function checkLoginStatus() {
  const authToken = localStorage.getItem('authToken');
  const profileLink = document.getElementById('profileLink');
  const loginLink = document.getElementById('loginLink');
  const signupLink = document.getElementById('signupLink');
  const logoutLink = document.getElementById('logoutLink');

  if (authToken) {
      // User is logged in: show "My Profile" and "Logout", hide "Login" and "Signup"
      profileLink.style.display = 'block';
      logoutLink.style.display = 'block';
      loginLink.style.display = 'none';
      signupLink.style.display = 'none';
  } else {
      // User is not logged in: show "Login" and "Signup", hide "My Profile" and "Logout"
      profileLink.style.display = 'none';
      logoutLink.style.display = 'none';
      loginLink.style.display = 'block';
      signupLink.style.display = 'block';
  }
}



// Function to handle user logout
function logoutUser() {
  localStorage.removeItem('authToken'); // Remove token
  alert('You have been logged out.');
  checkLoginStatus(); // Update menu after logout
}

