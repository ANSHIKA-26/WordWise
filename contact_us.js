document.addEventListener("DOMContentLoaded", () => {
  const sendEmailButton = document.getElementById("sendEmailButton");

  sendEmailButton.addEventListener("click", SendEmail);
});

const trustedDomains = [
  'gmail.com',
  'outlook.com',
  'yahoo.com',
  'protonmail.com',
  'icloud.com',
  'tutanota.com',
  'hotmail.com',
  'live.com',
  'mail.com',
  'zoho.com',
  'gmx.com',
  'aol.com',
  'fastmail.com',
  'yandex.com',
  '*.edu',
  '*.ac.uk',
  '*.edu.in',
  '*.edu.au',
  'examplecompany.com',
  'mailfence.com',
  'posteo.de',
  'runbox.com'
];

// Email validation function to check format and domain
function ValidateTrustEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
  const domain = email.split('@')[1];

  return (
    emailPattern.test(email) && 
    trustedDomains.some((trusted) => 
      trusted.includes('*') ? domain.endsWith(trusted.slice(1)) : domain === trusted
    )
  );
}

async function SendEmail(event) {
  event.preventDefault();

  const Name = document.getElementById("Name").value.trim();
  const email = document.getElementById("email2").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // Input validation
  if (!Name || !email || !phone || !message) {
    alert("All fields are required.");
    return;
  }

  if (!ValidateTrustEmail(email)) {
    alert("Please enter a valid email address from a trusted provider.");
    return;
  }

  if (message.length < 10) {
    alert("Message must be at least 10 characters long.");
    return;
  }
  // If validation passes
  alert('Form submitted successfully!');

  const data = { Name, email, phone, message };

  try {
    const response = await fetch("http://127.0.0.1:3000/send-email", {
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
function validateForm() {
  const phonePattern = /^\d{10}$/; //for 10-digit phone numbers
  // Validate phone number
  if (!phonePattern.test(phone)) {
      alert('Please enter a valid phone number (10 digits).');
      return; // Stop further execution
  }
}

function restrictInputToNumbers(event) {
  const key = event.key;
  if (!/^\d$/.test(key) && key !== "Backspace" && key !== "Delete") {
      event.preventDefault(); // Prevent input if it's not a digit
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('keydown', restrictInputToNumbers);
});