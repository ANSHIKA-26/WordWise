export function renderStories(container) {
    let posts = [];
    let title = '';
    let content = '';
    let category = '';

    // Function to fetch posts from localStorage
    const fetchPosts = () => {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
            posts = JSON.parse(storedPosts);
        }
        render();  // Render after fetching posts
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && content && category) {
            const newPost = { title, content, category, date: new Date().toISOString() };

            // Add new post to the posts array
            posts.unshift(newPost);

            // Save the updated posts to localStorage
            localStorage.setItem('posts', JSON.stringify(posts));
            // Clear form fields
            title = '';
            content = '';
            category = '';

            render();  // Re-render after saving the post


        }
    };

    // Function to render the DOM
    const render = () => {
        // Clear the container
        container.innerHTML = '';

        // Title
        const titleElement = document.createElement('h1');
        titleElement.className = 'text-3xl font-bold text-center mt-10 mb-5 text-white';  // Changed to white for contrast
        titleElement.innerText = 'Real Stories, Real Advice: Share Your Experience';
        container.appendChild(titleElement);

        // Flex container for posts and form
        const flexContainer = document.createElement('div');
        flexContainer.className = 'flex flex-col lg:flex-row items-start gap-8 px-6 lg:px-20 mb-14';

        // Left side - Posts
        const postsContainer = document.createElement('div');
        postsContainer.className = 'flex-1 space-y-6';

        if (posts.length === 0) {
            const noPostsMessage = document.createElement('p');
            noPostsMessage.className = 'text-gray-400 text-center';  // Lightened text for dark theme
            noPostsMessage.innerText = 'No posts yet. Share your experience!';
            postsContainer.appendChild(noPostsMessage);
        } else {
            posts.forEach((post) => {
                const postElement = document.createElement('div');
                postElement.className = 'bg-gray-800 text-white shadow-lg rounded-xl p-8 border border-gray-700 hover:shadow-xl transition-all duration-300 ease-in-out';

                const postTitle = document.createElement('h3');
                postTitle.className = 'text-2xl font-bold mb-2';
                postTitle.innerText = post.title;
                postElement.appendChild(postTitle);

                const postCategory = document.createElement('p');
                postCategory.className = 'text-sm text-indigo-400 font-medium mb-6';  // Lightened category text
                postCategory.innerText = post.category;
                postElement.appendChild(postCategory);

                const postContent = document.createElement('p');
                postContent.className = 'text-gray-300 leading-relaxed mb-4';  // Lighter content text
                postContent.innerText = post.content;
                postElement.appendChild(postContent);

                const postFooter = document.createElement('div');
                postFooter.className = 'flex items-center justify-between';

                const postDate = document.createElement('p');
                postDate.className = 'text-xs text-gray-500';
                postDate.innerText = new Date(post.date).toLocaleDateString();
                postFooter.appendChild(postDate);

                const readMoreButton = document.createElement('button');
                readMoreButton.className = 'text-indigo-400 text-sm font-medium border border-indigo-700 rounded-full px-5 py-2 hover:bg-indigo-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';
                readMoreButton.innerText = 'Read More';
                postFooter.appendChild(readMoreButton);


                postElement.appendChild(postFooter);
                postsContainer.appendChild(postElement);
            });
        }

        flexContainer.appendChild(postsContainer);

        // Right side - Form
        const formContainer = document.createElement('div');
        formContainer.className = 'w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md';

        const form = document.createElement('form');
        form.className = 'space-y-4';

        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Title of your story';
        titleInput.value = title;
        titleInput.oninput = (e) => { title = e.target.value; };
        titleInput.className = 'w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:border-blue-500';
        form.appendChild(titleInput);

        const contentInput = document.createElement('textarea');
        contentInput.placeholder = 'Write about your story...';
        contentInput.value = content;
        contentInput.oninput = (e) => { content = e.target.value; };
        contentInput.className = 'w-full p-3 h-32 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:border-blue-500';
        form.appendChild(contentInput);

        const categorySelect = document.createElement('select');
        categorySelect.value = category;
        categorySelect.onchange = (e) => { category = e.target.value; };
        categorySelect.className = 'block w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-white';

        const optionPlaceholder = document.createElement('option');
        optionPlaceholder.value = '';
        optionPlaceholder.disabled = true;
        optionPlaceholder.innerText = 'Select Blog Category';
        categorySelect.appendChild(optionPlaceholder);

        const categories = [
            { label: 'Career and Growth', options: ['Interview Tips', 'Job Referrals', 'Career Advice', 'Networking Strategies', 'Skill Building', 'Resume & Portfolio Tips', 'Job Hunt Strategies'] },
            { label: 'Tech and Industry Trends', options: ['Latest Tech News', 'Emerging Technologies', 'Industry Analysis', 'Tech Events & Conferences'] },
            { label: 'Work Culture & Lifestyle', options: ['Work-Life Balance', 'Remote Work Tips', 'Productivity Hacks', 'Workplace Culture', 'Mental Health in Tech'] },
            { label: 'Personal Development', options: ['Personal Branding', 'Public Speaking & Communication', 'Learning New Skills', 'Freelancing Tips'] },
        ];

        categories.forEach(categoryGroup => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = categoryGroup.label;

            categoryGroup.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.innerText = option;
                optgroup.appendChild(optionElement);
            });

            categorySelect.appendChild(optgroup);
        });

        form.appendChild(categorySelect);

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md focus:outline-none';
        submitButton.innerText = 'Post Experience';
        submitButton.onclick = handleSubmit;
        form.appendChild(submitButton);

        formContainer.appendChild(form);
        flexContainer.appendChild(formContainer);

        container.appendChild(flexContainer);
    };

    // Fetch posts from localStorage
    fetchPosts();
}
