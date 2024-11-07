export function renderHome(container) {
    container.innerHTML = `
        <section class="container mx-auto px-8 py-36 text-center sm:px-12">
            <h1 class="mb-12 text-5xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-6xl" data-aos="zoom-in">
                Share Your Story with the World
            </h1>
            <p class="mb-12 leading-relaxed text-gray-700 dark:text-gray-300" data-aos="fade-up" data-aos-delay="100">
                WordWise offers a platform for passionate writers to express their ideas and connect with readers worldwide. 
                Start your blogging journey today and join our community of creative minds.
            </p>
            <div class="mx-auto flex w-fit flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4" data-aos="fade-up" data-aos-delay="200">
                <button
                    class="rounded-md border-0 bg-violet-500 px-12 py-2 text-base text-white shadow-lg shadow-violet-300 transition hover:bg-violet-600 hover:shadow-violet-400 dark:shadow-violet-900/30"
                    onclick="window.location.href='/add-blog'"
                >
                    Start Writing
                </button>
                <button
                    class="rounded-md border-0 bg-gray-100 px-12 py-2 text-base text-gray-900 shadow-lg shadow-gray-200 transition hover:bg-white hover:shadow-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:shadow-gray-800/30 dark:hover:bg-gray-600"
                    onclick="window.location.href='/blogs'"
                >
                    Explore Blogs
                </button>
            </div>
        </section>
        <section class="container mx-auto px-8 py-12 sm:px-12">
            <div class="flex justify-between items-center">
                <h2 class="mb-8 text-3xl font-semibold text-gray-900 dark:text-white" data-aos="fade-up" data-aos-delay="300">
                    Trending Blog Titles
                </h2>
                <button id="nextTitleButton" class="mt-4 rounded-md bg-blue-500 text-white py-2 px-4 hidden">
                    Generate new title
                </button>
            </div>
            <div id="trending-titles" class="space-y-4">
                <!-- AI-generated trending titles will appear here -->
            </div>
        </section>
    `;

    // Fetch and render the titles
    fetchTrendingTitles();
}

async function fetchTrendingTitles() {
    try {
        const response = await fetch('http://127.0.0.1:8000/generate_trending_titles');
        const data = await response.json();

        // Assuming 'data.trending_titles' is an array of titles (without numbering)
        const titles = data.trending_titles.map(item => item
            .replace(/^\d+\.\s*/, '')
            .replace(/^\*\*(.*)\*\*$/, '$1')
        ); // Clean numbering

        const trendingTitlesContainer = document.getElementById('trending-titles');
        const nextButton = document.getElementById('nextTitleButton');

        // Clear any existing titles
        trendingTitlesContainer.innerHTML = '';

        let currentIndex = 0;

        // Function to render the current title
        function renderNextTitle() {
            if (currentIndex < titles.length) {
                const title = titles[currentIndex];
                const titleElement = document.createElement('div');
                titleElement.className = 'text-lg text-gray-800 dark:text-gray-200';
                titleElement.textContent = title;

                titleElement.setAttribute('data-aos', 'fade-right');
                titleElement.setAttribute('data-aos-duration', '1200');

                // Append the title element
                trendingTitlesContainer.appendChild(titleElement);
                currentIndex++;
            }
            if (currentIndex === titles.length) {
                nextButton.classList.add('hidden'); // Hide the button if no more titles
            }
        }

        // Initially render the first title
        renderNextTitle();

        // Show the button after the first title is rendered
        nextButton.classList.remove('hidden');

        // Set up the button to render the next title
        nextButton.onclick = renderNextTitle;
    } catch (error) {
        console.error('Error fetching trending titles:', error);
    }
}
