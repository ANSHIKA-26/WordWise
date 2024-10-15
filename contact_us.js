document.addEventListener("DOMContentLoaded", () => {
  const sendEmailButton = document.getElementById("sendEmailButton"); // Assuming your button has this ID

  sendEmailButton.addEventListener("click", SendEmail);
});

async function SendEmail(event) {
  event.preventDefault();
<<<<<<< HEAD

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // Input validation
  if (!firstName || !lastName || !email || !phone || !message) {
    alert("All fields are required.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }
=======
  const Name = document.getElementById("Name").value;
  const email = document.getElementById("email2").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;
>>>>>>> 0203b56f2d4e0b05cb8cc09a606fc346248d059e

  console.log(Name,email,phone,message);

  if (message.length < 10) {
    alert("Message must be at least 10 characters long.");
    return;
  }
<<<<<<< HEAD

  const data = { firstName, lastName, email, phone, message };
  
  const API_URL = "http://localhost:3000/send-email";
  
  try {
    const response = await fetch(API_URL, {
=======
  //console.log("Email value:", email , Name, phone, message); 
  const data = {
    Name: Name,
    email: email,
    phone: phone,
    message: message,
  };

  try {
    const response = await fetch("http://127.0.0.1:3000/send-email", {
>>>>>>> 0203b56f2d4e0b05cb8cc09a606fc346248d059e
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (response.ok) {
      showPopup();
      document.getElementById("contactForm").reset();
    } else {
      handleErrorResponse(result);
    }
    
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Error sending email. Please try again later.");
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function showPopup() {
  const popup = document.getElementById("popupMessage");
  const overlay = document.getElementById("overlay");
  
  overlay.style.display = "block";
  popup.style.display = "block";

  // Close the popup
  document.getElementById("closePopup").addEventListener("click", hidePopup);
  
  // Close when clicking outside
  overlay.addEventListener("click", hidePopup);
}

function hidePopup() {
  const popup = document.getElementById("popupMessage");
  const overlay = document.getElementById("overlay");
  
  popup.style.display = "none";
  overlay.style.display = "none";
}

function handleErrorResponse(result) {
  alert(`Error: ${result.message || 'An unexpected error occurred.'}`);
}