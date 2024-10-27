document.addEventListener("DOMContentLoaded", () => {
  const sendEmailButton = document.getElementById("sendEmailButton"); // Assuming your button has this ID

  sendEmailButton.addEventListener("click", SendEmail);
});

async function SendEmail(event) {
  event.preventDefault();

  const Name = document.getElementById("Name").value;
  const email = document.getElementById("email2").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  console.log(Name, email, phone, message);

  // Trusted email domains
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

  // Extract domain from email
  const emailDomain = email.split('@')[1];

  // Verify email domain
  if (!trustedDomains.includes(emailDomain)) {
    alert("Please use an email from a trusted provider.");
    return;
  }

  // Verify message length
  if (message.length < 10) {
    alert("Message must be at least 10 characters long.");
    return;
  }

  const data = {
    Name: Name,
    email: email,
    phone: phone,
    message: message,
  };

  try {
    const response = await fetch("http://127.0.0.1:3000/send-email", {
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