"use strict";

function SendEmail(event) {
  var firstName, lastName, email, phone, message, data, API_URL, response, result;
  return regeneratorRuntime.async(function SendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          firstName = document.getElementById("firstName").value.trim();
          lastName = document.getElementById("lastName").value.trim();
          email = document.getElementById("email").value.trim();
          phone = document.getElementById("phone").value.trim();
          message = document.getElementById("message").value.trim(); // Input validation

          if (!(!firstName || !lastName || !email || !phone || !message)) {
            _context.next = 9;
            break;
          }

          alert("All fields are required.");
          return _context.abrupt("return");

        case 9:
          if (validateEmail(email)) {
            _context.next = 12;
            break;
          }

          alert("Please enter a valid email address.");
          return _context.abrupt("return");

        case 12:
          if (!(message.length < 10)) {
            _context.next = 15;
            break;
          }

          alert("Message must be at least 10 characters long.");
          return _context.abrupt("return");

        case 15:
          data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            message: message
          };
          API_URL = "http://localhost:3000/send-email";
          _context.prev = 17;
          _context.next = 20;
          return regeneratorRuntime.awrap(fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }));

        case 20:
          response = _context.sent;
          _context.next = 23;
          return regeneratorRuntime.awrap(response.json());

        case 23:
          result = _context.sent;

          if (response.ok) {
            showPopup();
            document.getElementById("contactForm").reset();
          } else {
            handleErrorResponse(result);
          }

          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](17);
          console.error("Error sending email:", _context.t0);
          alert("Error sending email. Please try again later.");

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[17, 27]]);
}

function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function showPopup() {
  var popup = document.getElementById("popupMessage");
  var overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  popup.style.display = "block"; // Close the popup

  document.getElementById("closePopup").addEventListener("click", hidePopup); // Close when clicking outside

  overlay.addEventListener("click", hidePopup);
}

function hidePopup() {
  var popup = document.getElementById("popupMessage");
  var overlay = document.getElementById("overlay");
  popup.style.display = "none";
  overlay.style.display = "none";
}

function handleErrorResponse(result) {
  alert("Error: ".concat(result.message || 'An unexpected error occurred.'));
}
//# sourceMappingURL=contact_us.dev.js.map
