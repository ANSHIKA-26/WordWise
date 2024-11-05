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
                    <h1 class="text-4xl font-bold mb-2 text-gray-900 dark:text-white" data-aos="fade-right" data-aos-delay="100">WordWise Blog</h1>
                    <p class="text-xl text-gray-600 dark:text-gray-400" data-aos="fade-right" data-aos-delay="300">Insights and tips for language learners</p>
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
                        ${renderRecentPostsWidget(blogPosts)}
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
            post.excerpt.toLowerCase().includes(query)
        );

        const blogPostsContainer = document.getElementById('blog-posts-container');

        if (filteredPosts.length === 0) {
            blogPostsContainer.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6 text-center">
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">No Blogs Found</h2>
                    <p class="text-gray-600 dark:text-gray-300">Try searching with different keywords.</p>
                </div>
            `;
        } else {
            blogPostsContainer.innerHTML = `<div class="grid gap-6">${renderBlogPosts(filteredPosts)}</div>`;
        }
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
    return posts.map(post => renderBlogPost(post._id, post.title, post.excerpt, post.createdAt, post.tags, post.featuredImage, post.publish, post.likes)).join('');
}

function renderBlogPost(id, title, excerpt, date, tags, imageUrl, publish, likes) {
    if (!publish) return '';
    let imagePath = "";
    if (imageUrl) {
        imagePath = `http://localhost:5000/${imageUrl.replace(/\\/g, '/')}`;
    }
    return `
        <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden" data-aos="fade-right" data-aos-delay="500">
            <img src="${imagePath}" alt="${title}" class="w-full h-48 object-cover" onerror="this.onerror=null; this.src='/placeholder.svg?height=200&width=400';">
            <div class="p-6">
                <h2 class="text-2xl font-semibold mb-2 flex justify-between">
                    <a href="#" class="text-gray-900 dark:text-white hover:underline" data-blog-title>${title}</a>
                    <div>
                    <button class="speak-button-${id} text-white text-sm" onclick="handlePlay('${id}')" 
                            data-title="${title.replace(/"/g, '&quot;')}" 
                            data-excerpt="${excerpt.replace(/"/g, '&quot;')}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z" />
                        </svg>
                    </button> 
                    <button class="pause-button-${id} text-white text-sm hidden"  onclick="handlePause('${id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 4h4v16h-4zM6 4h4v16H6z" />
                    </svg>
                    </button>
                    </div>
                </h2>
                <p class="text-gray-600 dark:text-gray-300 mb-4" data-blog-content>${excerpt}</p>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <time datetime="${date}">${formatDate(date)}</time>
                    <span class="ml-4 font-medium text-gray-900 dark:text-white">${tags}</span>
                    <a href="/readmore/${id}" class="flex items-center ml-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-500 cursor-pointer">
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
                <div class="mt-4 flex items-center">
                    <button 
                        onclick="handleReaction('${id}')" 
                        class="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-all duration-200 ease-in-out"
                    >
                        <svg 
                            id="heart-icon-${id}" 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-6 w-6 mr-2 transition-transform duration-200 ease-in-out transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2" 
                                d="M12 21c-1.104-.002-2.113-.365-3.022-1.023C6.568 18.482 4 15.673 4 12.528c0-2.58 1.812-4.528 4.25-4.528 1.1 0 2.161.458 2.884 1.178a4.053 4.053 0 0 1 2.884-1.178c2.438 0 4.25 1.948 4.25 4.528 0 3.145-2.568 5.954-4.978 7.449-.909.658-1.918 1.021-3.022 1.023z"
                            />
                        </svg>
                        <span id="reaction-count-${id}" class="text-sm font-semibold mt-[6px]">${likes}</span>
                        <span class="ml-1 text-sm mt-[6px]">Likes</span>
                    </button>
                </div>
            </div>
        </article>
    `;
}

let speechInstance = null; // Store the current SpeechSynthesisUtterance instance
let isPaused = false;
let currentPosition = 0; // To store the position where we paused

window.handlePlay = function (id) {
    const button = document.querySelector(`button[onclick="handlePlay('${id}')"]`);
    if (button) {
        const title = button.dataset.title;
        const excerpt = button.dataset.excerpt;
        const textToSpeak = `${title}. ${excerpt}`;
        document.getElementsByClassName(`pause-button-${id}`)[0].classList.remove('hidden')
        document.getElementsByClassName(`speak-button-${id}`)[0].classList.add('hidden')

        // If speech is paused, resume from the saved position
        if (isPaused && speechInstance) {
            isPaused = false;
            window.speechSynthesis.speak(speechInstance);
        } else {
            // Create a new SpeechSynthesisUtterance instance
            speechInstance = new SpeechSynthesisUtterance(textToSpeak.slice(currentPosition));
            speechInstance.lang = 'en-US';
            speechInstance.pitch = 1;
            speechInstance.rate = 1;

            // Event listener to track speech progress and save current position
            speechInstance.onboundary = function (event) {
                if (event.name === 'word') {
                    currentPosition = event.charIndex;
                }
            };

            // Play the speech
            window.speechSynthesis.speak(speechInstance);
        }
    }
};

window.handlePause = function (id) {
    document.getElementsByClassName(`pause-button-${id}`)[0].classList.add('hidden')
    document.getElementsByClassName(`speak-button-${id}`)[0].classList.remove('hidden')
    if (speechInstance && !isPaused) {
        window.speechSynthesis.cancel();
        isPaused = true;
    }
};





window.handleReaction = async function (postId) {
    const reactionCountElement = document.getElementById(`reaction-count-${postId}`);
    const heartIcon = document.getElementById(`heart-icon-${postId}`);
    let currentCount = parseInt(reactionCountElement.innerText, 10);

    // Check if the heart is currently filled
    const isFilled = heartIcon.getAttribute("fill") === "currentColor";

    // Toggle the heart fill color and update count with animation
    const newCount = isFilled ? currentCount - 1 : currentCount + 1;
    heartIcon.classList.toggle("text-red-500", !isFilled);
    heartIcon.setAttribute("fill", !isFilled ? "currentColor" : "none");
    reactionCountElement.innerText = newCount;

    // Add a quick scale animation for visual feedback
    heartIcon.classList.add("scale");
    setTimeout(() => heartIcon.classList.remove("scale"), 150);

    // Send updated like count to the server
    try {
        const response = await fetch(`http://localhost:5000/api/addBlog/updateLikes`, {
            method: "PATCH", // Change POST to PATCH
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId, liked: !isFilled }), // Ensure liked reflects the new state
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();
        // Update the like count based on the server response
        reactionCountElement.innerText = data.likesCount; // Ensure the server returns likesCount
    } catch (error) {
        console.error("Failed to update like on server:", error);

        // Revert the UI changes if the server update fails
        heartIcon.classList.toggle("text-red-500", isFilled);
        heartIcon.setAttribute("fill", isFilled ? "currentColor" : "none");
        reactionCountElement.innerText = currentCount; // Revert to previous count
    }
};





function renderSearchWidget() {
    return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6" data-aos="fade-up" data-aos-delay="100">
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
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6" data-aos="fade-up" data-aos-delay="300">
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Categories</h2>
            <ul class="space-y-2">
                <li><a href="#" class="category-link text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" data-category="all">All</a></li>
                ${categories.map(category => `
                    <li><a href="#" class="category-link text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" data-category="${category}">${category}</a></li>
                `).join('')}
            </ul>
        </div>`;
}


function renderRecentPostsWidget(blogPosts) {
    // Sort blog posts by createdAt date in ascending order
    blogPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return `<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="500">
             <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Posts</h2>
            <ul class="space-y-2">
                ${blogPosts.map(post => {
        const postDate = new Date(post.createdAt);
        const formattedDate = `${monthNames[postDate.getMonth()]} ${postDate.getDate()}, ${postDate.getFullYear()}`;
        return `<li class="flex justify-between items-center">
                                <a href="/blog/${post._id}" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white w-[70%]">${post.title}</a>
                                <span class="text-sm text-gray-500 dark:text-gray-400 w-1/4">${formattedDate}</span>
                            </li>`;
    }).join('')}
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
