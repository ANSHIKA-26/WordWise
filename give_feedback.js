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
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    const domain = email.split('@')[1];

    return (
        emailPattern.test(email) && 
        trustedDomains.some((trusted) => 
            trusted.includes('*') ? domain.endsWith(trusted.slice(1)) : domain === trusted
        )
    );
}

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const feedback = document.getElementById('feedback').value.trim();
    const rating = document.getElementById('rating').value;

    if (name === '' || email === '' || feedback === '' || rating === '') {
        alert('Please fill out all fields.');
        return;
    }

    // Trusted email validation
    if (!validateEmail(email)) {
        alert('Please enter a valid email address from a trusted provider.');
        return;
    }

    // If validation passes, submit the form (e.g., send data to server)
    alert('Thank you for your feedback!');
    document.getElementById('feedbackForm').reset(); // Reset the form
});