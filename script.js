document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission

  const emailInput = document.getElementById('emailInput');
  const errorMessage = document.getElementById('error-message');

  // Clear previous error message
  errorMessage.style.display = 'none';

  // Check if '@' is included in the email input
  if (!emailInput.value.includes('@')) {
      errorMessage.style.display = 'block'; // Show error message
      return; // Exit the function if there's an error
  }

  // If the email is valid, proceed with hiding the form and showing success messages
  const form = document.getElementById('newsletterForm');
  form.classList.add('hide-form');

  // Show a success message after form hides
  const successMessage = document.createElement('div');
  successMessage.classList.add('success-message');
  successMessage.textContent = "Thank you for subscribing!";
  form.parentElement.appendChild(successMessage);

  setTimeout(() => {
      successMessage.style.display = 'block'; // Show message
      successMessage.style.opacity = '1'; // Fade in effect
  }, 500); // Delay for smooth effect

  // Show toast notification
  const toast = document.getElementById('toast');
  toast.textContent = "Subscription Successful!";
  toast.classList.add('show');
// Toggle display of share options
const shareBtn = document.getElementById("shareBtn");
const shareOptions = document.getElementById("shareOptions");

shareBtn.onclick = () => {
    shareOptions.classList.toggle("show-share-options");
};

// Update share links
const urlToShare = encodeURIComponent(window.location.href);
document.getElementById("whatsappShare").href = `https://api.whatsapp.com/send?text=${urlToShare}`;
document.getElementById("facebookShare").href = `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`;
document.getElementById("emailShare").href = `mailto:?subject=Check this out!&body=${urlToShare}`;

  // Hide toast after 3 seconds
  setTimeout(() => {
      toast.classList.remove('show');
  }, 3000);
});


// LOAD POSTS 
const initialVisibleItems = 6; // Number of items to show initially
const blogItems = document.querySelectorAll('.blog-item'); // Get all blog items
const loadMoreBtn = document.querySelector('.load-posts-btn'); // Load more button

// Hide items initially except the first few
blogItems.forEach((item, index) => {
  if (index >= initialVisibleItems) {
    item.classList.add('hidden'); // Add hidden class for items beyond the limit
  }
});

// Load more items when the button is clicked   (~Nivesh2003)
loadMoreBtn.addEventListener('click', function () {
  const hiddenItems = Array.from(blogItems).filter(item => item.classList.contains('hidden')); // Find hidden items

  // Show a certain number of hidden items (e.g., the next 3)
  hiddenItems.slice(0, 3).forEach((item, index) => {
    // Delay for each item's reveal to create a staggered effect
    setTimeout(() => {
      item.classList.remove('hidden'); // Remove hidden class
      item.classList.add('reveal'); // Add reveal class to trigger animation
    }, index * 300); // Adjust the delay (300ms) as needed
  });

  // Check if there are no more hidden items
  if (hiddenItems.length <= initialVisibleItems) {
    loadMoreBtn.style.display = 'none'; // Hide the button if there are no more items to load
  }
});

// Optional: If you want to control existing animations when new items are added
const manageExistingAnimations = () => {
  blogItems.forEach(item => {
    // Remove the animation class after a delay to prevent repeated animations
    if (item.classList.contains('reveal')) {
      setTimeout(() => {
        item.classList.remove('reveal'); // Remove animation class after animation completes
      }, 500); // Adjust this duration to match your CSS transition duration
    }
  });
};

// Call manageExistingAnimations whenever new items are revealed
loadMoreBtn.addEventListener('click', function () {
  manageExistingAnimations(); // Control existing items' animations
});


