export function renderAddBlog(container) {
    container.innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <header class="mb-8">
                <h1 class="text-4xl font-bold mb-2 text-gray-900 dark:text-white" data-aos="fade-right" data-aos-delay="100">Create New Blog Post</h1>
                <p class="text-xl text-gray-600 dark:text-gray-400" data-aos="fade-right" data-aos-delay="300">Share your insights and tips with the WordWise community</p>
            </header>

            <main class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <form id="add-blog-form" enctype="multipart/form-data" data-aos="fade-up" data-aos-delay="300">
                    <div class="mb-6">
                        <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                        <input type="text" id="title" name="title" required
                               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    </div>

                    <div class="mb-6">
                        <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                        <select id="category" name="category" required
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option value="">Select a category</option>
                            <option value="vocabulary">Vocabulary</option>
                            <option value="grammar">Grammar</option>
                            <option value="pronunciation">Pronunciation</option>
                            <option value="culture">Culture</option>
                            <option value="learning-tips">Learning Tips</option>
                        </select>
                    </div>

                    <div class="mb-6">
                        <label for="featured-image" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Featured Image</label>
                        <input type="file" id="featured-image" name="featured-image" accept="image/*"
                               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    </div>

                    <div class="mb-6">
                        <label for="summary" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Summary</label>
                        <textarea id="summary" name="summary" rows="3" required
                                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
                    </div>

                    <div class="mb-6">
                        <label for="excerpt" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                        <textarea id="excerpt" name="excerpt" rows="10" required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
                    </div>

                    <div class="mb-6">
                        <label for="tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma-separated)</label>
                        <input type="text" id="tags" name="tags"
                               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    </div>

                    <div class="flex items-center mb-6">
                        <input type="checkbox" id="publish" name="publish" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded">
                        <label for="publish" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                            Publish immediately
                        </label>
                    </div>

                    <div class="flex justify-end">
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                            Create Post
                        </button>
                    </div>
                </form>
            </main>
        </div>
    `;

    // Add form submission logic
    // Updated form submission logic
    const form = document.getElementById('add-blog-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        const summary = document.getElementById('summary').value;
        const excerpt = document.getElementById('excerpt').value;
        const tags = document.getElementById('tags').value;
        const publish = document.getElementById('publish').checked;
        const featuredImage = document.getElementById('featured-image').files[0];

        if (!title || !category || !summary || !excerpt) {
            alert('Please fill out all required fields.');
            return;
        }

        // Prepare the form data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('summary', summary);
        formData.append('excerpt', excerpt);
        formData.append('tags', tags);
        formData.append('publish', publish);
        if (featuredImage) {
            formData.append('featuredImage', featuredImage); // Ensure key matches backend
        }

        try {
            const response = await fetch('http://localhost:5000/api/addBlog/saveBlog', {
                method: 'POST',
                body: formData // Send formData directly
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Blog post created:', result);
                alert('Blog post successfully created!');
                form.reset(); // Reset the form after successful submission
            } else {
                console.error('Error creating blog post:', response.statusText);
                alert('Failed to create blog post. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });


}
