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

        // Apply the detected theme
        document.documentElement.setAttribute("data-theme", theme);
    }

    // Run color scheme detection
    detectColorScheme();
});

