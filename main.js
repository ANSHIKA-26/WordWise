const themeSwitcher = document.getElementById('checkbox');

const body = document.body;

function switchTheme() {
    if (themeSwitcher.checked) {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
}

themeSwitcher.addEventListener('change', switchTheme);
