export function renderBlogs(container) {
    container.innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <header class="mb-8">
                <h1 class="text-4xl font-bold mb-2 text-gray-900 dark:text-white">WordWise Blog</h1>
                <p class="text-xl text-gray-600 dark:text-gray-400">Insights and tips for language learners</p>
            </header>

            <div class="flex flex-col md:flex-row gap-8">
                <main class="md:w-2/3">
                    <div class="grid gap-6">
                        ${renderBlogPost(
                            "Mastering Vocabulary: 10 Words to Boost Your Language Skills",
                            "Expand your vocabulary and improve your language proficiency with these essential words...",
                            "2023-05-15",
                            "Vocabulary, Learning Tips",
                            "../assets/blog/4.webp"
                        )}
                        ${renderBlogPost(
                            "Essential Grammar Rules for Clear Communication",
                            "Master these fundamental grammar rules to enhance your language skills and communicate more effectively...",
                            "2023-05-20",
                            "Grammar, Writing",
                            "../assets/blog/2.webp"
                        )}
                        ${renderBlogPost(
                            "Mastering Pronunciation: Tips and Tricks",
                            "Improve your accent and speak more clearly with these pronunciation techniques...",
                            "2023-05-25",
                            "Pronunciation, Speaking",
                            "../assets/blog/3.webp"
                        )}
                    </div>
                </main>

                <aside class="md:w-1/3">
                    ${renderSearchWidget()}
                    ${renderCategoriesWidget()}
                    ${renderRecentPostsWidget()}
                </aside>
            </div>
        </div>
    `;
}

function renderBlogPost(title, excerpt, date, tags, imagePath) {
    return `
        <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src="${imagePath}" alt="${title}" class="w-full h-48 object-cover" onerror="this.onerror=null; this.src='/placeholder.svg?height=200&width=400';">
            <div class="p-6">
                <h2 class="text-2xl font-semibold mb-2">
                    <a href="#" class="text-gray-900 dark:text-white hover:underline">${title}</a>
                </h2>
                <p class="text-gray-600 dark:text-gray-300 mb-4">${excerpt}</p>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time datetime="${date}">${formatDate(date)}</time>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>${tags}</span>
                </div>
            </div>
            <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <a href="#" class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Read More
                </a>
            </div>
        </article>
    `;
}

function renderSearchWidget() {
    return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Search</h2>
            <div class="relative">
                <input type="text" placeholder="Search blog posts" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 dark:text-gray-300 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
    `;
}

function renderCategoriesWidget() {
    return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Categories</h2>
            <ul class="space-y-2">
                <li><a href="/blog/category/vocabulary" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Vocabulary</a></li>
                <li><a href="/blog/category/grammar" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Grammar</a></li>
                <li><a href="/blog/category/pronunciation" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Pronunciation</a></li>
                <li><a href="/blog/category/culture" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Culture</a></li>
                <li><a href="/blog/category/learning-tips" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Learning Tips</a></li>
            </ul>
        </div>
    `;
}

function renderRecentPostsWidget() {
    return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Posts</h2>
            <ul class="space-y-2">
                <li><a href="/blog/post-4" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">The Art of Conversation</a></li>
                <li><a href="/blog/post-5" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Idioms Around the World</a></li>
                <li><a href="/blog/post-6" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Effective Note-Taking Strategies</a></li>
            </ul>
        </div>
    `;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
