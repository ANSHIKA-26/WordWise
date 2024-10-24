let toggle = document.querySelector("#header .toggle-button");
let collapse = document.querySelectorAll("#header .collapse");
document.getElementById("backToTop").style.display = "none";

if (toggle) {
    toggle.addEventListener('click', function () {
    collapse.forEach(col => col.classList.toggle("collapse-toggle"));
    })
}

//swiper library
// main.js
document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 3000
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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

window.onscroll = function () { myFunction() };


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

function validateSignupForm() {
  var password = document.getElementById("signupPsw").value;
  var confirmPassword = document.getElementById("confirmPsw").value;

  // Check if passwords match
  if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return false; // Prevent form submission
  }

  // Additional validation (if any)
  // You can add further checks here, e.g., email format validation, password strength, etc.

  return true; // Allow form submission if everything is valid
}

// Open the specific form (login or signup)
function openForm(formType) {
  // Hide both forms first
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'none';

  // Display the requested form
  if (formType === 'login') {
      document.getElementById('loginForm').style.display = 'block';
  } else if (formType === 'signup') {
      document.getElementById('signupForm').style.display = 'block';
  }
}


// Close the specific form
function closeForm(formType) {
  if (formType === 'login') {
      document.getElementById('loginForm').style.display = 'none';
  } else if (formType === 'signup') {
      document.getElementById('signupForm').style.display = 'none';
  }
}

//Active Nav bar
function openForgotPassword() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('email').value = '';
    document.getElementById('forgot-password-modal').style.display = 'block';
  }

// Close Forgot Password Modal
function closeForgotPasswordModal() {
    document.getElementById('email').value = '';
    document.getElementById('forgot-password-modal').style.display = 'none';
}

// Simulate form submission for Forgot Password
function submitForgotPassword() {
    const email = document.getElementById('email').value;
    if (email) {
        alert("Password reset instructions have been sent to " + email);
        closeForgotPasswordModal(); // Close modal after submission
    } else {
        alert("Please enter your email.");
}
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('forgot-password-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
}
};

const navLinks = document.querySelectorAll('.nav-link');
const setActiveLink = () => {
  const activePath = localStorage.getItem('activeLink');
  if (activePath) {
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === activePath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', setActiveLink);

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(link => link.classList.remove('active'));

    this.classList.add('active');

    localStorage.setItem('activeLink', this.getAttribute('href'));
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
    let toggleSwitch = document.querySelector('#theme-switch input[type="checkbox"]');
    document.documentElement.setAttribute("data-theme", "dark");
    toggleSwitch.checked = true;
  }
}


//identify the toggle switch HTML element
const toggleSwitch = document.querySelector('#theme-switch input[type="checkbox"]');


//function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme(e) {
  if (e.target.checked) {
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleSwitch.checked = true;
  } else {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
    toggleSwitch.checked = false;
  }
}

if (toggleSwitch)
  //listener for changing themes
  toggleSwitch.addEventListener('change', switchTheme, false);


//pre-check the dark-theme checkbox if dark-theme is set
if (document.documentElement.getAttribute("data-theme") == "dark") {
  toggleSwitch.checked = true;
}

let aboutSection = document.querySelector('#about');

if (aboutSection) {
    document.querySelector('#about').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#about-us').scrollIntoView({ behavior: 'smooth' });
    });
}

function submitNewsletter() {
  const emailInput = document.getElementById('emailInput');
  const errorMessage = document.getElementById('error-message');
  const email = emailInput.value;

  // Simple email validation check
  if (!email.includes('@')) {
    errorMessage.style.display = 'block';
    return;
  } else {
    errorMessage.style.display = 'none';
  }

  // Send POST request
  fetch('http://127.0.0.1:3000/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
  .then(response => {
    if (response.ok) {
      alert('Subscribed successfully!');
      emailInput.value = ''; // Clear the input field
    } else {
      alert('Failed to subscribe. Please try again later.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  });
}

// Get hamburger and nav links
var hamburger = document.getElementById('hamburger');
var navLinks1 = document.getElementById('nav-links1');

// Only add event listener if both elements exist on the page
if (hamburger && navLinks1) {
    hamburger.addEventListener('click', () => {
        navLinks1.classList.toggle('active');
    });
} else {
    console.warn('Hamburger or Nav Links not found on this page.');
}