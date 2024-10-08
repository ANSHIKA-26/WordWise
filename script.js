document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
  
    // Show success message
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
  