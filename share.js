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

function shareOnFacebook() {
    const postTitle = document.title;
    const postUrl = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}&t=${encodeURIComponent(postTitle)}`;
    window.open(facebookUrl, '_blank');
}

function shareOnTwitter() {
    const postTitle = document.title;
    const postUrl = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
    window.open(twitterUrl, '_blank');
}

function shareOnLinkedIn() {
    const postTitle = document.title;
    const postUrl = window.location.href;
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;
    window.open(linkedInUrl, '_blank');
}

function shareOnPinterest() {
    const postTitle = document.title;
    const postUrl = window.location.href;
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(postUrl)}&description=${encodeURIComponent(postTitle)}`;
    window.open(pinterestUrl, '_blank');
}