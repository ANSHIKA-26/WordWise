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

    // If validation passes, submit the form (e.g., send data to server)
    alert('Thank you for your feedback!');
    document.getElementById('feedbackForm').reset(); // Reset the form
});
