let toggle = document.querySelector("#header .toggle-button");
let collapse = document.querySelectorAll("#header .collapse");

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

// Open the specific form (login or signup)
function openForm(formType) {
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
