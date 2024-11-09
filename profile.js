// profile.js
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch user profile data from backend
        const response = await fetch("http://localhost:5000/api/users/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Use your auth token here
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch profile data.");
        }

        // Parse the JSON data
        const profileData = await response.json();

        // Populate profile data in HTML
        document.querySelector(".profile-name").textContent = profileData.username;
        document.querySelector(".profile-email").textContent = `Email: ${profileData.email}`;
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
});
