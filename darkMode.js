const checkbox = document.getElementById('checkbox')
const modeLabel = document.getElementById('mode-label')

// Check if dark mode is already enabled
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
    checkbox.checked = true
    modeLabel.textContent = 'Dark Mode'
}

// Add event listener for the FAB icon
themeToggle.addEventListener('click', () => {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        modeLabel.textContent = 'Light Mode';
        themeToggle.classList.remove('fa-sun'); // If you want to use sun icon for light mode
        themeToggle.classList.add('fa-moon'); // Moon icon for dark mode
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        modeLabel.textContent = 'Dark Mode';
        themeToggle.classList.remove('fa-moon'); // If you want to use moon icon for dark mode
        themeToggle.classList.add('fa-sun'); // Sun icon for light mode
    }
});

// Toggle dark mode class on the body
document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});