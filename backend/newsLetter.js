document.getElementById('newsletterForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('emailInput').value;
    const toast = document.getElementById('toast');

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function showToast(message, isSuccess) {
        toast.innerText = message;
        toast.className = `toast show ${isSuccess ? 'success' : 'error'}`;
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    if (!validateEmail(email)) {
        showToast("Please enter a valid email address.", false);
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/subscribe', {  // backend endpoint defined in server.js
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email }) 
        });

        const result = await response.json();

        if (response.ok) {
            showToast("Subscription successful! Thank you for subscribing.", true);
        } else {
            throw new Error(result.message || "Subscription failed.");
        }
    } catch (error) {
        showToast(`Subscription Unsuccessful! (Internal Error : ${error.message})`, false);
    }
});
