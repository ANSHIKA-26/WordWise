let toggle = document.querySelector("#header .toggle-button");
let collapse = document.querySelectorAll("#header .collapse");


toggle.addEventListener('click', function () {
  collapse.forEach(col => col.classList.toggle("collapse-toggle"));
})
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


// get the navbar position
let sticky = navbar.offsetTop;


// sticky function
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}




// Theme Switcher
//determines if the user has a set theme
function detectColorScheme() {
  var theme = "light";    //default to light


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


//listener for changing themes
toggleSwitch.addEventListener('change', switchTheme, false);


//pre-check the dark-theme checkbox if dark-theme is set
if (document.documentElement.getAttribute("data-theme") == "dark") {
  toggleSwitch.checked = true;
}

