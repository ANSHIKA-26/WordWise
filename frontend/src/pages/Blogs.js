const fetchBlogData = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/addBlog/getAllBlog');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching blogs:', error);
    }
};

export async function renderBlogs(container) {
    try {
        const blogPosts = await fetchBlogData(); // Fetch the blog data
        console.log(blogPosts)

        // Check if blogPosts is valid
        if (!blogPosts || blogPosts.length === 0) {
            container.innerHTML = '<p>No blog posts available.</p>';
            return;
        }

        // Render the blog layout
        container.innerHTML = `
            <div class="container mx-auto px-4 py-8">
                <header class="mb-8">
                    <h1 class="text-4xl font-bold mb-2 text-gray-900 dark:text-white">WordWise Blog</h1>
                    <p class="text-xl text-gray-600 dark:text-gray-400">Insights and tips for language learners</p>
                </header>

                <div class="flex flex-col md:flex-row gap-8">
                    <main class="md:w-2/3" id="blog-posts-container">
                        <div class="grid gap-6">
                            ${renderBlogPosts(blogPosts)} <!-- Render blog posts here -->
                        </div>
                    </main>

                    <aside class="md:w-1/3">
                        ${renderSearchWidget()}
                        ${renderCategoriesWidget(blogPosts)} <!-- Pass blogPosts to categories widget -->
                        ${renderRecentPostsWidget()}
                    </aside>
                </div>
            </div>
        `;

        // Set up the search and category filtering functionality
        setupSearch(blogPosts);
        setupCategoryFilter(blogPosts);
    } catch (error) {
        console.log('Error rendering blogs:', error);
        container.innerHTML = '<p>Error loading blog posts. Please try again later.</p>';
    }
}

function setupSearch(blogPosts) {
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

function setupCategoryFilter(blogPosts) {
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default anchor click behavior
            const selectedCategory = this.dataset.category;
            const filteredPosts = selectedCategory === 'all'
                ? blogPosts
                : blogPosts.filter(post => post.category === selectedCategory); // Filter by category

            const blogPostsContainer = document.getElementById('blog-posts-container');
            blogPostsContainer.innerHTML = `<div class="grid gap-6">${renderBlogPosts(filteredPosts)}</div>`;
        });
    });
}

function renderBlogPosts(posts) {
    return posts.map(post => renderBlogPost(post.id, post.title, post.excerpt, post.date, post.tags, post.featuredImage, post.publish)).join('');
}

function renderBlogPost(id, title, excerpt, date, tags, imageUrl, publish) {
    if (!publish) return '';
    let imagePath = "";
    if (imageUrl) {
        imagePath = `http://localhost:5000/${imageUrl.replace(/\\/g, '/')}`;
    }
    return `
        <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src="${imagePath}" alt="${title}" class="w-full h-48 object-cover" onerror="this.onerror=null; this.src='/placeholder.svg?height=200&width=400';">
            <div class="p-6">
                <h2 class="text-2xl font-semibold mb-2">
                    <a href="#" class="text-gray-900 dark:text-white hover:underline">${title}</a>
                </h2>
                <p class="text-gray-600 dark:text-gray-300 mb-4">${excerpt}</p>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <time datetime="${date}">${formatDate(date)}</time>
                    <span class="ml-4 font-medium text-gray-900 dark:text-white">${tags}</span>
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

function renderCategoriesWidget(blogPosts) {
    const categories = Array.from(new Set(blogPosts.map(post => post.category))).sort();
    return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Categories</h2>
            <ul class="space-y-2">
                <li><a href="#" class="category-link text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" data-category="all">All</a></li>
                ${categories.map(category => `
                    <li><a href="#" class="category-link text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" data-category="${category}">${category}</a></li>
                `).join('')}
            </ul>
        </div>`;
}

function renderRecentPostsWidget() {
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
