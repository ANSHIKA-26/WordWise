async function SendEmail(event) {
  event.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  if (message.length < 10) {
    alert("Message must be at least 10 characters long.");
    return;
  }

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    message: message,
  };

  try {
    const response = await fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      const form = document.getElementById("contactForm");
      const popup = document.getElementById("popupMessage");
      const overlay = document.getElementById("overlay");
      const closePopup = document.getElementById("closePopup");

      // Show popup
      overlay.style.display = "block";
      popup.style.display = "block";

      // Clear the form
      form.reset();

      // Close the popup
      closePopup.addEventListener("click", function () {
        popup.style.display = "none";
        overlay.style.display = "none";
      });

      // Close the popup when clicking outside of it
      overlay.addEventListener("click", function () {
        popup.style.display = "none";
        overlay.style.display = "none";
      });
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Error sending email. Please try again later.");
  }
}
