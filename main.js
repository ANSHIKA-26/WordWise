document.addEventListener('DOMContentLoaded', function () {

    // Toggle button functionality
    const toggle = document.querySelector("#header .toggle-button");
    const collapse = document.querySelectorAll("#header .collapse");

    if (toggle) {
      toggle.addEventListener('click', function () {
        collapse.forEach(col => col.classList.toggle("collapse-toggle"));
      });
    }

    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
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

    // Sticky Navbar
    const navbar = document.getElementById("header");
    const sticky = navbar ? navbar.offsetTop : 0;

    window.onscroll = function () {
      if (navbar) {
        navbar.classList.toggle("sticky", window.pageYOffset >= sticky);
      }
    };

    // Theme Toggle
    const toggleSwitch = document.querySelector('#theme-switch input[type="checkbox"]');

    if (toggleSwitch) {
      toggleSwitch.addEventListener('change', switchTheme, false);
    }

    // Initialize theme
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      toggleSwitch.checked = true;
    }

    // Smooth Scrolling to About Section
    const aboutLink = document.querySelector('#about');
    if (aboutLink) {
      aboutLink.addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('#about-us').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Active Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');

    const setActiveLink = () => {
      const activePath = localStorage.getItem('activeLink');
      navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.toggle('active', linkHref === activePath);
      });
    };

    setActiveLink();

    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        localStorage.setItem('activeLink', this.getAttribute('href'));
      });
    });
});

// Theme Detection
function detectColorScheme() {
    let theme = localStorage.getItem("theme") ||
                (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", theme);

    const toggleSwitch = document.querySelector('#theme-switch input[type="checkbox"]');
    if (toggleSwitch) {
        toggleSwitch.checked = (theme === "dark");
    }
}

// Theme Switch Function
function switchTheme(e) {
    const theme = e.target.checked ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
}
