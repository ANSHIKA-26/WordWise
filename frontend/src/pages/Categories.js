export function renderCategories(container) {
    container.innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <header class="mb-8">
                <h1 class="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Blog Categories</h1>
                <p class="text-xl text-gray-600 dark:text-gray-400">Explore our articles by topic</p>
            </header>

            <main class="grid gap-8">
                ${renderCategorySection("Vocabulary", [
                    {
                        title: "10 Essential Phrasal Verbs for Daily Conversations",
                        description: "Master these common phrasal verbs to enhance your everyday English communication.",
                        date: "2023-05-15",
                        link: "/blog/post-1"
                    },
                    {
                        title: "Building Your Vocabulary: 5 Effective Strategies",
                        description: "Discover proven methods to expand your word bank and retain new vocabulary.",
                        date: "2023-05-20",
                        link: "/blog/post-2"
                    }
                ])}

                ${renderCategorySection("Grammar", [
                    {
                        title: "Mastering the Present Perfect: When and How to Use It",
                        description: "Unravel the mysteries of the present perfect tense and learn to use it confidently in your writing and speaking.",
                        date: "2023-05-25",
                        link: "/blog/post-3"
                    },
                    {
                        title: "Common Grammar Mistakes and How to Avoid Them",
                        description: "Identify and correct frequent grammatical errors to improve your language accuracy.",
                        date: "2023-05-30",
                        link: "/blog/post-4"
                    }
                ])}

                ${renderCategorySection("Pronunciation", [
                    {
                        title: "The Secret to Perfect English Pronunciation: Stress and Intonation",
                        description: "Learn how word stress and sentence intonation can dramatically improve your spoken English.",
                        date: "2023-06-05",
                        link: "/blog/post-5"
                    },
                    {
                        title: "Mastering the 'Th' Sound: Tips and Exercises",
                        description: "Conquer one of the trickiest sounds in English with our step-by-step guide and practice exercises.",
                        date: "2023-06-10",
                        link: "/blog/post-6"
                    }
                ])}

                ${renderCategorySection("Culture", [
                    {
                        title: "Understanding British vs. American English: Key Differences",
                        description: "Explore the nuances between British and American English in vocabulary, spelling, and pronunciation.",
                        date: "2023-06-15",
                        link: "/blog/post-7"
                    },
                    {
                        title: "Idioms from Around the World: Expanding Your Cultural Vocabulary",
                        description: "Discover fascinating idioms from different cultures and their English equivalents.",
                        date: "2023-06-20",
                        link: "/blog/post-8"
                    }
                ])}

                ${renderCategorySection("Learning Tips", [
                    {
                        title: "5 Proven Techniques to Boost Your Language Learning",
                        description: "Discover effective strategies to accelerate your language acquisition and retention.",
                        date: "2023-06-25",
                        link: "/blog/post-9"
                    },
                    {
                        title: "The Power of Immersion: Creating a Language-Rich Environment",
                        description: "Learn how to surround yourself with your target language for faster and more natural learning.",
                        date: "2023-06-30",
                        link: "/blog/post-10"
                    }
                ])}
            </main>
        </div>
    `;
}

function renderCategorySection(category, posts) {
    return `
        <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">${category}</h2>
            <ul class="space-y-4">
                ${posts.map(post => renderPost(post)).join('')}
            </ul>
        </section>
    `;
}

function renderPost(post) {
    return `
        <li class="border-b border-gray-200 dark:border-gray-700 pb-4">
            <a href="${post.link}" class="block hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                <h3 class="text-lg font-medium text-indigo-600 dark:text-indigo-400">${post.title}</h3>
                <p class="text-gray-600 dark:text-gray-300 mt-1">${post.description}</p>
                <div class="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time datetime="${post.date}">${formatDate(post.date)}</time>
                </div>
            </a>
        </li>
    `;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
