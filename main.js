document.addEventListener('DOMContentLoaded', function () {
const toggle = document.querySelector("#header .toggle-button");
const collapse = document.querySelectorAll("#header .collapse");
const toggleSwitch = document.querySelector('#theme-switch input[type="checkbox"]');
const navbar = document.getElementById("header");
const sticky = navbar.offsetTop;

// Event listener for toggle button to collapse sections
if (toggle) {
    toggle.addEventListener('click', function () {
        collapse.forEach(col => col.classList.toggle("collapse-toggle"));
    });
}

// Initialize Swiper for carousel functionality
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

// Sticky navbar on scroll
window.onscroll = function () { stickyNavbar() };

function stickyNavbar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

// Active navbar link functionality
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
    link.addEventListener('click', function () {
        navLinks.forEach(link => link.classList.remove('active'));

        this.classList.add('active');

        localStorage.setItem('activeLink', this.getAttribute('href'));
    });
});

// Detect and apply color scheme (dark/light mode)
function detectColorScheme() {
    var theme = "light"; // default to light theme

    // Check if the user has a theme preference saved in local storage
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "dark") {
            theme = "dark";
        }
    }

    // Apply the detected theme (this code should handle adding the appropriate classes or styles)
    document.documentElement.setAttribute("data-theme", theme);
}

// Run color scheme detection
detectColorScheme();

    }

    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false, // Allows autoplay to continue even after user interaction
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

    // Sticky navbar function
    window.onscroll = function () {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    };

    // Function to detect color scheme
    function detectColorScheme() {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        
        // Set the theme based on localStorage or system preference
        const theme = storedTheme || (prefersDark ? "dark" : "light");

        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            if (toggleSwitch) {
                toggleSwitch.checked = true;
            }
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            if (toggleSwitch) {
                toggleSwitch.checked = false;
            }
        }
    }

    // Function to switch themes
    function switchTheme(e) {
        const newTheme = e.target.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }

    // Attach event listener to theme switch
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme, false);
        
        // Pre-check the dark-theme checkbox if dark-theme is set
        if (document.documentElement.getAttribute("data-theme") === "dark") {
            toggleSwitch.checked = true;
        }
    }
});
