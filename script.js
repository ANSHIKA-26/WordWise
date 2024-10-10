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

  // Hide toast after 3 seconds
  setTimeout(() => {
      toast.classList.remove('show');
  }, 3000);
});
