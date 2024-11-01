const blogPosts = [
    {
        id: 1,
        title: "Mastering Vocabulary: 10 Words to Boost Your Language Skills",
        excerpt: "Expanding your vocabulary is essential for improving your language proficiency. By incorporating new words into your daily conversations, you not only enrich your communication but also increase your confidence in expressing complex ideas. This article presents ten powerful words that can elevate your language skills and enhance your ability to articulate thoughts clearly and persuasively. Understanding the nuances of each word will allow you to use them appropriately in different contexts, making your speech and writing more impactful. With consistent practice, you will find yourself communicating with greater precision and clarity in all your interactions.",
        date: "2023-05-15",
        tags: "Vocabulary, Learning Tips",
        imagePath: "../assets/blog/4.webp"
    },
    {
        id: 2,
        title: "Essential Grammar Rules for Clear Communication",
        excerpt: "Grammar forms the backbone of effective communication. Mastering essential grammar rules not only enhances your language skills but also enables you to convey your message with clarity and precision. In this article, we will explore key grammatical principles that every writer and speaker should know, including proper sentence structure, subject-verb agreement, and punctuation usage. By understanding these fundamentals, you can avoid common mistakes that lead to misunderstandings. Clear communication is vital in both personal and professional settings, and solid grammar skills will enhance your credibility and help you connect more effectively with your audience.",
        date: "2023-05-20",
        tags: "Grammar, Writing",
        imagePath: "../assets/blog/2.webp"
    },
    {
        id: 3,
        title: "Mastering Pronunciation: Tips and Tricks",
        excerpt: "Pronunciation plays a crucial role in effective communication. Mastering the sounds of a language can significantly improve your speaking skills and boost your confidence in conversations. In this article, we will share practical tips and tricks to help you enhance your pronunciation. From practicing individual sounds to intonation and rhythm, these techniques will enable you to sound more natural when speaking. Additionally, we’ll discuss the importance of listening to native speakers and mimicking their speech patterns. By dedicating time to practice and incorporating these strategies, you can ensure that your message is understood and appreciated by your audience.",
        date: "2023-05-25",
        tags: "Pronunciation, Speaking",
        imagePath: "../assets/blog/3.webp"
    }
];

const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
};


// Function to extract the `id` parameter from the URL
function getBlogIdFromUrl() {
    // const pathParts = window.location.pathname.split('/');
    return Math.floor(Math.random() * blogPosts.length) + 1; // Get the last part, which is the blog ID
}

// Find and render the blog post based on the ID from the URL
export function renderFullBlogPost(container) {
    const blogId = getBlogIdFromUrl();
    console.log(blogId)
    const blog = blogPosts.find(post => post.id === blogId);

    if (blog) {
        container.innerHTML = `
        <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src="${blog.imagePath}" alt="${blog.title}" class="w-full h-64 object-cover" onerror="this.onerror=null; this.src='/placeholder.svg?height=300&width=800';">
            <div class="p-6">
                <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">${blog.title}</h1>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time datetime="${blog.date}">${formatDate(blog.date)}</time>
                    <span class="ml-4 font-medium text-gray-900 dark:text-white">${blog.tags}</span>
                </div>
                <div class="text-gray-600 dark:text-gray-300 text-lg mb-4">
                    ${blog.excerpt}
                </div>
                <a href="/blog" class="text-indigo-600 dark:text-indigo-400 hover:underline">Back to Blog</a>
            </div>
        </article>
    `;
    } else {
        document.getElementById('app').innerHTML = '<p>Blog post not found.</p>';
    }
}


