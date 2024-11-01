export function renderAbout(container) {
    container.innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <header class="mb-8">
                <h1 class="text-4xl font-bold mb-2 text-gray-900 dark:text-white">About WordWise</h1>
                <p class="text-xl text-gray-600 dark:text-gray-400">Your trusted companion in language learning</p>
            </header>

            <main class="grid gap-8">
                <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
                    <p class="text-gray-700 dark:text-gray-300 mb-4">
                        At WordWise, we believe that language is the key to understanding and connecting with the world. Our mission is to make language learning accessible, enjoyable, and effective for everyone, regardless of their background or learning style.
                    </p>
                    <div class="bg-indigo-100 dark:bg-indigo-900 border-l-4 border-indigo-500 text-indigo-700 dark:text-indigo-200 p-4" role="alert">
                        <p class="font-bold">Our Commitment</p>
                        <p>We are dedicated to providing high-quality, engaging content and innovative learning tools to help you achieve your language goals.</p>
                    </div>
                </section>

                <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">What Makes Us Unique</h2>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                            <h3 class="font-semibold text-green-800 dark:text-green-200 mb-2">Personalized Learning Paths</h3>
                            <p class="text-green-700 dark:text-green-300">Tailored content based on your learning style and goals.</p>
                        </div>
                        <div class="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                            <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Interactive Exercises</h3>
                            <p class="text-blue-700 dark:text-blue-300">Engaging activities to reinforce your learning.</p>
                        </div>
                        <div class="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                            <h3 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Native Speaker Audio</h3>
                            <p class="text-yellow-700 dark:text-yellow-300">Improve your pronunciation with authentic recordings.</p>
                        </div>
                        <div class="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
                            <h3 class="font-semibold text-red-800 dark:text-red-200 mb-2">Progress Tracking</h3>
                            <p class="text-red-700 dark:text-red-300">Visualize your improvement over time.</p>
                        </div>
                    </div>
                </section>

                <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Contributors</h2>
                    <p class="text-gray-700 dark:text-gray-300 mb-4">
                        WordWise is an open-source project, and we're grateful for the contributions of developers from around the world. Here are our top contributors:
                    </p>
                    <div id="contributors-list" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <!-- Contributors will be dynamically inserted here -->
                    </div>
                    <div class="mt-6 text-center">
                        <a href="https://github.com/ANSHIKA-26/WordWise/graphs/contributors" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 hover:underline">
                            View all contributors
                        </a>
                    </div>
                </section>

                <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Get in Touch</h2>
                    <form id="getInTouch" class="space-y-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input type="text" id="name" name="name" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white">
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input type="email" id="email" name="email" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white">
                        </div>
                        <div>
                            <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea id="message" name="message" rows="4" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"></textarea>
                        </div>
                        <div>
                            <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                                Send Message
                            </button>
                        </div>
                    </form>
                    <div id="formSuccess" class="mt-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 px-4 py-3 rounded relative hidden" role="alert">
                        <strong class="font-bold">Success!</strong>
                        <span class="block sm:inline">Your message has been sent. We'll get back to you soon.</span>
                    </div>
                </section>
            </main>
        </div>
    `;

    // Fetch and render contributors
    fetchContributors();

    // Form submission
    document.getElementById('getInTouch').addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Prepare data to send to the backend
        const formData = {
            name: name,
            email: email,
            message: message
        };

        try {
            // Send form data to the backend
            const response = await fetch('http://localhost:5000/api/getInTouch/saveGetInTouch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log(response)
            // Check if the response was successful
            if (response.ok) {
                console.log("Form successfully submitted:", formData);
                document.getElementById('formSuccess').classList.remove('hidden');
                this.reset();
            } else {
                console.error("Form submission failed:", response.statusText);
                alert("There was an issue submitting the form. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error connecting to the server. Please try again.");
        }
    });

}

async function fetchContributors() {
    try {
        const response = await fetch('https://api.github.com/repos/ANSHIKA-26/WordWise/contributors');
        if (!response.ok) {
            throw new Error('Failed to fetch contributors');
        }
        const contributors = await response.json();
        const contributorsList = document.getElementById('contributors-list');
        contributors.slice(0, 8).forEach(contributor => {
            contributorsList.innerHTML += renderContributor(contributor.login, contributor.html_url, contributor.avatar_url);
        });
    } catch (error) {
        console.error('Error fetching contributors:', error);
        document.getElementById('contributors-list').innerHTML = '<p class="text-red-500">Failed to load contributors. Please try again later.</p>';
    }
}

function renderContributor(username, profileUrl, avatarUrl) {
    return `
        <div class="text-center">
            <img src="${avatarUrl}" alt="${username}" class="w-16 h-16 rounded-full mx-auto mb-2">
            <a href="${profileUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                ${username}
            </a>
        </div>
    `;
}
