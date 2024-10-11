// Load saved comments when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadSavedData();
});

// Event listener for the Enter key on the form
document
  .getElementById("commentForm")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission
      submitComment(); // Call the submitComment function
    }
  });

// Function to submit the comment
function submitComment() {
  // Get form values
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const website = document.getElementById("websiteInput").value.trim();
  const message = document.getElementById("messageInput").value.trim();

  // Email and URL regex patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlPattern = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/i;

  // Validation checks
  if (name === "") {
    showToast("Name is required.", "error");
    return;
  } else if (!emailPattern.test(email)) {
    showToast("Please provide a valid email.", "error");
    return;
  } else if (website !== "" && !urlPattern.test(website)) {
    showToast("Please provide a valid website URL.", "error");
    return;
  } else if (message === "") {
    showToast("Message is required.", "error");
    return;
  } else {
    // Show success toast with a custom message
    showToast("Commented Successfully!", "success");
  }

  // Create comment object
  const comment = {
    name: name,
    email: email,
    website: website,
    message: message,
    timestamp: new Date().toISOString(),
  };

  // Get existing comments from local storage or initialize an empty array
  let comments = JSON.parse(localStorage.getItem("comments") || "[]");

  // Add the new comment to the array
  comments.push(comment);

  // Save updated comments back to local storage
  localStorage.setItem("comments", JSON.stringify(comments));

  // Clear the form
  clearForm();

  // Load comments to display them
  loadComments();
}

// Function to load saved data into the form
function loadSavedData() {
  // Get the last comment if it exists
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  if (comments.length > 0) {
    const lastComment = comments[comments.length - 1];

    // Fill in the form with the last submitted data
    document.getElementById("nameInput").value = lastComment.name || "";
    document.getElementById("emailInput").value = lastComment.email || "";
    document.getElementById("websiteInput").value = lastComment.website || "";
    document.getElementById("messageInput").value = lastComment.message || "";
  }

  // Load and display all comments
  loadComments();
}

// Function to clear the form
function clearForm() {
  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("websiteInput").value = "";
  document.getElementById("messageInput").value = "";
}

// Function to load and display all comments
function loadComments() {
  const commentsContainer = document.getElementById("commentsContainer");
  commentsContainer.innerHTML = ""; // Clear existing comments

  const comments = JSON.parse(localStorage.getItem("comments") || "[]");

  // Create and display each comment
  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.style.border = "1px solid #ccc";
    commentElement.style.padding = "10px";
    commentElement.style.marginBottom = "10px";
    commentElement.style.borderRadius = "5px";
    commentElement.style.backgroundColor = "#f9f9f9";

    commentElement.innerHTML = `
            <strong>${comment.name}</strong> <em>(${comment.email})</em><br>
            <a href="${comment.website}" target="_blank">${
      comment.website
    }</a><br>
            <p>${comment.message}</p>
            <small>${new Date(comment.timestamp).toLocaleString()}</small>
        `;

    commentsContainer.appendChild(commentElement);
  });
}

// Function to show toast notifications
function showToast(message, type) {
  // Create toast element
  const toast = document.createElement("div");
  toast.style.position = "fixed";
  toast.style.bottom = "150px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.padding = "15px 20px";
  toast.style.borderRadius = "8px";
  toast.style.color = "#fff";
  toast.style.zIndex = "9999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.5s, transform 0.5s";
  toast.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";

   // Apply different styles based on the type of toast
  if (type === "success") {
    toast.style.backgroundColor = "rgba(40, 167, 69, 0.75)"; // Slightly transparent green
  } else if (type === "error") {
    toast.style.backgroundColor = "rgba(220, 53, 69, 0.75)"; // Slightly transparent red
  }

  toast.innerText = message;

  document.body.appendChild(toast);

  // Show toast
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)"; // Slide up effect
  }, 100);

  // Hide and remove toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)"; // Slide down effect
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 3000);
}
