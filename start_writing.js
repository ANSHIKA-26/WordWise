async function PostBlog(event) {
  event.preventDefault();

  // Collect form data
  const form = document.getElementById("blogForm");
  const formData = new FormData(form);

  try {
    // Send the form data to the backend using Fetch API
    const response = await fetch("http://localhost:3000/post_blog", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      // Check if popup already exists, if so, remove it
      let existingPopup = document.getElementById("popupMessage");
      if (existingPopup) {
        existingPopup.remove();
      }

      // Create the popup element
      const popup = document.createElement("div");
      popup.id = "popupMessage";
      popup.innerText = "Blog submitted successfully!";

      // Append the popup to the body
      document.body.appendChild(popup);

      // Show the popup and hide it after 3 seconds
      popup.style.display = "block";

      setTimeout(() => {
        popup.style.display = "none";
        document.getElementById("blogForm").reset();
      }, 3000);
    } else {
      alert("Error: " + result.message);
    }
  } catch (error) {
    console.error("Error submitting blog:", error);
    alert("An error occurred while submitting the blog.");
  }
}
