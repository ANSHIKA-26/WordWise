const checkbox = document.getElementById('checkbox');
const modeLabel = document.getElementById('mode-label');

// Function to apply the theme and update the label
const applyTheme = (theme) => {
    console.log(`Applying theme: ${theme}`); // Debugging line
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    checkbox.checked = (theme === 'dark');

    // Update the label text based on the current theme
    modeLabel.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
};

// Check for saved theme in localStorage or use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    console.log(`Found saved theme: ${savedTheme}`); // Debugging line
    applyTheme(savedTheme);
} else {
    console.log(`Using system preference: ${systemPrefersDark ? 'dark' : 'light'}`); // Debugging line
    applyTheme(systemPrefersDark ? 'dark' : 'light');
}

// Add event listener for toggle switch
checkbox.addEventListener('change', () => {
    const newTheme = checkbox.checked ? 'dark' : 'light';
    console.log(`Checkbox changed: ${newTheme}`); // Debugging line
    applyTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    const newTheme = event.matches ? 'dark' : 'light';
    console.log(`System theme changed: ${newTheme}`); // Debugging line
    applyTheme(newTheme);
});
