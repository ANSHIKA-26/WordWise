document.addEventListener("DOMContentLoaded", () => {
  const sendEmailButton = document.getElementById("sendEmailButton"); // Assuming your button has this ID

  sendEmailButton.addEventListener("click", SendEmail);
});

async function SendEmail(event) {
  event.preventDefault();

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

  console.log(Name,email,phone,message);

  if (message.length < 10) {
    alert("Message must be at least 10 characters long.");
    return;
  }
  //console.log("Email value:", email , Name, phone, message); 
  const data = {
    Name: Name,
    email: email,
    phone: phone,
    message: message,
  };

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
    alert("Error sending email. Please try again later.");
  }
}



//  mobile No limit with contry code
// ...........................................github->Mayanksaininh..................................................
function getIp(callback) {
  fetch('ipinfo.io/140.82.183.34?token=66e2f39b20a2bd', { headers: { 'Accept': 'application/json' }})
    .then((resp) => resp.json())
    .catch(() => {
      return {
        country: 'us',
      };
    })
    .then((resp) => callback(resp.country));
 }


 
  const phoneInputField = document.querySelector("#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
 
//  const info = document.querySelector(".alert-info");
 
 function process(event) {
  event.preventDefault();
 
  const phoneNumber = phoneInput.getNumber();
 
  info.style.display = "";
  info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
 }
//  ...............................................github->Mayanksaininh........................................................

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

