document.getElementById('blogForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Check if popup already exists, if so, remove it
    let existingPopup = document.getElementById('popupMessage');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create the popup element
    const popup = document.createElement('div');
    popup.id = 'popupMessage';
    popup.innerText = 'Blog submitted successfully!';
    
    // Append the popup to the body
    document.body.appendChild(popup);

    // Show the popup and hide it after 3 seconds
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
        document.getElementById('blogForm').reset();
    }, 3000);
});
