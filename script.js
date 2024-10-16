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


document.getElementById('sendBtn').addEventListener('click', function() {
  const userInput = document.getElementById('userInput');
  const message = userInput.value;
  if (message) {
      appendMessage('User: ' + message);
      userInput.value = '';
      generateResponse(message);
  }
});

// Close chatbot functionality
document.getElementById('closeBtn').addEventListener('click', function() {
  const chatbot = document.getElementById('chatbot');
  chatbot.style.display = 'none'; // Hide the chatbot
});

function appendMessage(message) {
  const messagesDiv = document.getElementById('messages');
  const newMessage = document.createElement('div');
  newMessage.textContent = message;
  messagesDiv.appendChild(newMessage);
}

function generateResponse(userMessage) {
  const messagesDiv = document.getElementById('messages');
  let botResponse = "Sorry, I don't understand.";
  
  if (userMessage.toLowerCase().includes('hello')) {
      botResponse = "Welcome! How can I assist you?";
      appendButtonOptions(['Learn more about WordWise', 'View latest blogs'], messagesDiv);
  } else if (userMessage.toLowerCase().includes('help')) {
      botResponse = "Sure! What do you need help with?";
      appendButtonOptions(['Features', 'Contact Us'], messagesDiv);
  }

  appendMessage('Bot: ' + botResponse);
}

function appendButtonOptions(options, messagesDiv) {
  const buttonContainer = document.createElement('div');
  
  options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.style.margin = '5px';
      button.addEventListener('click', () => {
          appendMessage('User: ' + option);
          handleButtonResponse(option);
      });
      buttonContainer.appendChild(button);
  });

  messagesDiv.appendChild(buttonContainer);
}

function handleButtonResponse(option) {
  let botResponse;
  switch (option) {
      case 'Learn more about WordWise':
          botResponse = "WordWise is a blogging platform focused on enriching your vocabulary and providing insightful content.";
          break;
      case 'View latest blogs':
          botResponse = "You can check the latest blogs on our homepage!";
          break;
      case 'Features':
          botResponse = "Our features include responsive design, user engagement, and an intuitive UI.";
          break;
      case 'Contact Us':
          botResponse = "You can reach us at support@wordwise.com.";
          break;
      default:
          botResponse = "Sorry, I don't have information on that.";
  }
  appendMessage('Bot: ' + botResponse);
}
