import '../styles/navbar.css'
export function renderNavbar() {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = `
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <!-- Logo -->
                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse" data-aos="fade-down" data-aos-delay="100">
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">WordWise</span>
                </a>

                <!-- Hamburger button for small screens only -->
                <button id="hamburger" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 z-10">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>

                <!-- Navbar links, toggled by screen size -->
                <div id="navbar-menu" class="max-md:hidden flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
                    <a href="/" class="py-2 px-3 text-gray-900 dark:text-white">Home</a>
                    <a href="/blogs" class="py-2 px-3 text-gray-900 dark:text-white">Blogs</a>
                    <a href="/add-blog" class="py-2 px-3 text-gray-900 dark:text-white">Add Blog</a>
                    <a href="/categories" class="py-2 px-3 text-gray-900 dark:text-white">Categories</a>
                    <a href="/about" class="py-2 px-3 text-gray-900 dark:text-white">About</a>
                    <a href="/contact" class="py-2 px-3 text-gray-900 dark:text-white">Contact</a>
                    <a href="/feedback" class="py-2 px-3 text-gray-900 dark:text-white">Feedback</a>
                    <a href="/discussion" class="py-2 px-3 text-gray-900 dark:text-white">Discussion Forum</a>
                    <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 rounded-lg text-sm p-2.5">
                        <!-- Theme Toggle Icons -->
                        <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        </nav>
    `;

    const hamburgerBtn = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbar-menu');

    // Toggle menu visibility on smaller screens
    hamburgerBtn.addEventListener('click', () => {
        navbarMenu.classList.toggle('open');  // Add or remove 'open' class to trigger slide-in
    });
}

// Apply saved theme on load
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}
