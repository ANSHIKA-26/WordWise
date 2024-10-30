document
  .getElementById("newsletterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    const emailInput = document.getElementById("emailInput");
    const errorMessage = document.getElementById("error-message");

    // Clear previous error message
    errorMessage.style.display = "none";

    // Check if '@' is included in the email input
    if (!emailInput.value.includes("@")) {
      errorMessage.style.display = "block"; // Show error message
      return; // Exit the function if there's an error
    }

    // If the email is valid, proceed with hiding the form and showing success messages
    const form = document.getElementById("newsletterForm");
    form.classList.add("hide-form");

    // Show a success message after form hides
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.textContent = "Thank you for subscribing!";
    form.parentElement.appendChild(successMessage);

    setTimeout(() => {
      successMessage.style.display = "block"; // Show message
      successMessage.style.opacity = "1"; // Fade in effect
    }, 500); // Delay for smooth effect

    // Show toast notification
    const toast = document.getElementById("toast");
    toast.textContent = "Subscription Successful!";
    toast.classList.add("show");

    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  });

// LOAD POSTS
const initialVisibleItems = 6; // Number of items to show initially
const blogItems = document.querySelectorAll(".blog-item"); // Get all blog items
const loadMoreBtn = document.querySelector(".load-posts-btn"); // Load more button

// Hide items initially except the first few
blogItems.forEach((item, index) => {
  if (index >= initialVisibleItems) {
    item.classList.add("hidden"); // Add hidden class for items beyond the limit
  }
});

// Load more items when the button is clicked
loadMoreBtn.addEventListener("click", function () {
  const hiddenItems = Array.from(blogItems).filter((item) =>
    item.classList.contains("hidden")
  ); // Find hidden items

  // Show a certain number of hidden items (e.g., the next 3)
  hiddenItems.slice(0, 3).forEach((item, index) => {
    // Delay for each item's reveal to create a staggered effect
    setTimeout(() => {
      item.classList.remove("hidden"); // Remove hidden class
      item.classList.add("reveal"); // Add reveal class to trigger animation
    }, index * 300); // Adjust the delay (300ms) as needed
  });

  // Check if there are no more hidden items
  if (hiddenItems.length <= initialVisibleItems) {
    loadMoreBtn.style.display = "none"; // Hide the button if there are no more items to load
  }
});

// Optional: If you want to control existing animations when new items are added
const manageExistingAnimations = () => {
  blogItems.forEach((item) => {
    // Remove the animation class after a delay to prevent repeated animations
    if (item.classList.contains("reveal")) {
      setTimeout(() => {
        item.classList.remove("reveal"); // Remove animation class after animation completes
      }, 500); // Adjust this duration to match your CSS transition duration
    }
  });
};

// Call manageExistingAnimations whenever new items are revealed
loadMoreBtn.addEventListener("click", function () {
  manageExistingAnimations(); // Control existing items' animations
});

// Variable to keep track of the current word index
let currentIndex = 0;

// Function to load and update the word of the day
async function loadWordOfTheDay() {
  try {
    const response = await fetch("words.json"); // Ensure this path is correct
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    const words = data.words;

    // Check if words array is not empty
    if (words.length === 0) {
      console.error("No words available in the JSON file.");
      return;
    }

    // Update the word and definition immediately
    updateWord(words[currentIndex]);

    // Set an interval to change the word every 10 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % words.length; // Increment index and loop back
      updateWord(words[currentIndex]); // Update the display with the new word
    }, 15000); // 15 seconds interval
  } catch (error) {
    console.error("Error loading words:", error);
  }
}

// Function to update the word and definition in the HTML
function updateWord(wordData) {
  document.getElementById("word").textContent = wordData.word;
  document.getElementById("definition").textContent = wordData.definition;
  document.getElementById("sentence").textContent = wordData.sentence;
}

// Call the function to load the word of the day
loadWordOfTheDay();
//hamburger (Responsive)

// function toggleHamburgerMenu() {
//   const navLinks = document.getElementById('navLinks');
//   navLinks.classList.toggle('active');
//   }

function toggleHamburgerMenu() {
  const navLinks = document.getElementById("navLinks");
  const isActive = navLinks.classList.toggle("active"); // Toggle 'active' class

  if (isActive) {
    console.log("active");

    // Close the menu when clicking outside
    document.addEventListener("click", closeOnOutsideClick);
  } else {
    console.log("inactive");

    // Remove the event listener when menu is closed
    document.removeEventListener("click", closeOnOutsideClick);
  }
}

function closeOnOutsideClick(event) {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");

  if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
    console.log("menu close");

    navLinks.classList.remove("active"); // Close the menu
    document.removeEventListener("click", closeOnOutsideClick); // Remove the listener
  }
}
