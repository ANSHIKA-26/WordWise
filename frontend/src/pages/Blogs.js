const blogPosts = [
    {
        id: 1,
        title: "Mastering Vocabulary: 10 Words to Boost Your Language Skills",
        excerpt: "Expand your vocabulary and improve your language proficiency with these essential words...",
        date: "2023-05-15",
        tags: "Vocabulary, Learning Tips",
        imagePath: "../assets/blog/4.webp"
    },
    {
        id: 2,
        title: "Essential Grammar Rules for Clear Communication",
        excerpt: "Master these fundamental grammar rules to enhance your language skills and communicate more effectively...",
        date: "2023-05-20",
        tags: "Grammar, Writing",
        imagePath: "../assets/blog/2.webp"
    },
    {
        id: 3,
        title: "Mastering Pronunciation: Tips and Tricks",
        excerpt: "Improve your accent and speak more clearly with these pronunciation techniques...",
        date: "2023-05-25",
        tags: "Pronunciation, Speaking",
        imagePath: "../assets/blog/3.webp"
    }
];

export function renderBlogs(container) {
    container.innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <header class="mb-8">
                <h1 class="text-4xl font-bold mb-2 text-gray-900 dark:text-white">WordWise Blog</h1>
                <p class="text-xl text-gray-600 dark:text-gray-400">Insights and tips for language learners</p>
            </header>

            <div class="flex flex-col md:flex-row gap-8">
                <main class="md:w-2/3" id="blog-posts-container">
                    <div class="grid gap-6">
                        ${renderBlogPosts(blogPosts)}
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

    document.getElementById('search-input').addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filteredPosts = blogPosts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.tags.toLowerCase().includes(query)
        );

        const blogPostsContainer = document.getElementById('blog-posts-container');
        blogPostsContainer.innerHTML = `<div class="grid gap-6">${renderBlogPosts(filteredPosts)}</div>`;
    });
}

function renderBlogPosts(posts) {
    return posts.map(post => renderBlogPost(post.id, post.title, post.excerpt, post.date, post.tags, post.imagePath)).join('');
}

function renderBlogPost(id, title, excerpt, date, tags, imagePath) {
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
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414v5c0 .512-.195 1.024-.586 1.414l-5 5a2 2 0 01-1.414.586H7a2 2 0 01-2-2v-8a2 2 0 012-2z" />
                    </svg>
                    <span class="font-medium text-gray-900 dark:text-white">${tags}</span>
                    <a href="/readmore" class="flex items-center ml-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-500 cursor-pointer">
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `;
}

function renderSearchWidget() {
    return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Search</h2>
            <div class="relative">
                <input type="text" id="search-input" placeholder="Search blog posts" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 dark:text-gray-300 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
    `;
}

function renderCategoriesWidget() {
    // Your categories widget code here
    return `<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Categories</h2>
            <ul class="space-y-2">
                <li><a href="/blog/category/vocabulary" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Vocabulary</a></li>
                <li><a href="/blog/category/grammar" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Grammar</a></li>
                <li><a href="/blog/category/pronunciation" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Pronunciation</a></li>
                <li><a href="/blog/category/culture" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Culture</a></li>
                <li><a href="/blog/category/learning-tips" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Learning Tips</a></li>
            </ul>
        </div>`;
}

function renderRecentPostsWidget() {
    // Your recent posts widget code here
    return `<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Posts</h2>
            <ul class="space-y-2">
                <li><a href="/blog/post-4" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">The Art of Conversation</a></li>
                <li><a href="/blog/post-5" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Idioms Around the World</a></li>
                <li><a href="/blog/post-6" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Effective Note-Taking Strategies</a></li>
            </ul>
        </div>`;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
