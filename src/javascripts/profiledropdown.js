function toggleDropdown() {
    var dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('show'); // Toggles the 'show' class
}

// Close the dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.closest('.profile-icon')) { // Updated to closest to avoid immediate closing
        var dropdowns = document.getElementsByClassName('dropdown-menu');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}