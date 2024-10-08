function handleGoogleLogin() {
    // The pop up for google login will only appear if the clientID is provided
    const clientId = 'YOUR_CLIENT_ID'; // Replace with your actual Client ID

    // Initialize the Google Identity Services library
    window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse
    });

    // Prompt the user to sign in
    window.google.accounts.id.prompt();
}

function handleCredentialResponse(response) {
    const token = response.credential; // This is the access token

    // Send the token to your backend for verification
    // Backend logic has to be written
    fetch('http://localhost:3000/oauth/google-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                // Save the token in cookies or local storage
                document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24}`; // 1 day expiration

                // Redirect to home or other page
                window.location.href = '/home'; // Adjust as needed
            } else {
                alert('Login failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during Google login:', error);
            alert('Google login failed. Please try again.');
        });
}