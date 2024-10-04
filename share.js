// Function to open the sharing modal
function openShareModal(url, title) {
    const modal = document.getElementById('share-modal');
    modal.style.display = 'block'; // Show the modal

    // Set the sharing links in the modal
    const facebookShareLink = document.getElementById('share-facebook');
    const twitterShareLink = document.getElementById('share-twitter');
    const linkedinShareLink = document.getElementById('share-linkedin');
    const pinterestShareLink = document.getElementById('share-pinterest');

    facebookShareLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    twitterShareLink.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    linkedinShareLink.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    pinterestShareLink.href = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`;
}

// Function to close the modal
function closeShareModal() {
    const modal = document.getElementById('share-modal');
    modal.style.display = 'none'; // Hide the modal
}

// Event listener for close button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('close-modal').addEventListener('click', closeShareModal);
});

