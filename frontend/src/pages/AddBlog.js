import toastr from 'toastr';

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
                        <label for="featured-image" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Featured Image</label>
                        <input type="file" id="featured-image" name="featured-image" accept="image/*"
                               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    </div>

                    <div class="mb-6">
                        <label for="summary" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Summary</label>
                        <textarea id="summary" name="summary" rows="3" required
                                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
                    </div>

                    <div class="mb-6 relative">
                        <label for="excerpt" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                        <div class="relative">
                            <!-- Button for generating content -->
                            <button id="generateContent" class="absolute top-2 right-2 text-2xl text-gray-500 dark:text-gray-300 hover:text-indigo-500 cursor-pointer" title="Generate AI Content">
                                ✨
                                <span class="tooltip absolute right-[95%] mr-2 hidden text-sm bg-gray-800 text-white p-1 rounded-md">
                                    Generate AI Content
                                </span>
                            </button>

                            <!-- Textarea for content -->
                            <textarea id="excerpt" name="excerpt" rows="10" required
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
                        </div>
                    </div>

                    <div class="mb-6">
                        <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                        <select id="category" name="category" required
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <!-- Categories will be populated here dynamically -->
                        </select>
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

    const generateContent = document.getElementById('generateContent');

    generateContent.addEventListener('click', async function (e) {
        const title = document.getElementById('title').value;
        const summary = document.getElementById('summary').value;
        const excerpt = document.getElementById('excerpt');

        // Check if the title is empty
        if (title === '' && summary === '') {
            toastr.error('Enter title and summary for more relevant content');
            return;
        }

        try {
            // Configure toastr to keep the message displayed until manually cleared
            toastr.options = {
                timeOut: 0, // Infinite timeout
                extendedTimeOut: 0, // Prevents auto-hiding on hover
                tapToDismiss: false // Prevents closing on click
            };

            // Display the loading message
            let loadingToastr = toastr.info('Your content is getting ready, please wait!');

            // Fetch content from the API using title and summary
            let response = await fetch('http://127.0.0.1:8000/generate-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: title, summary: summary })
            });


            // Clear the loading message after the response
            toastr.clear(loadingToastr);

            // Check if the response is successful
            if (response.ok) {
                let data = await response.json();

                const lines = data.content.split("\n").map(line => line.trim());

                // Extract content, category, and tags
                let servercontent = "";
                let servercategory = "";
                let servertags = "";

                lines.forEach(line => {
                    if (line.startsWith("**Category:**") || line.startsWith("**Categories:**")) {
                        servercategory = line.replace("**Category:**", "").replace("**Categories:**", "").replace("**Categories**:", "").trim();
                    } else if (line.startsWith("**Tags:**")) {
                        servertags = line.replace("**Tags:**", "").replace("**Tags**:", "").trim();
                    } else if (line) {
                        servercontent += line + " "; // Append to content
                    }
                });

                // Display generated content in the textarea
                excerpt.value = servercontent;

                // // Show success message

                const categories = servercategory.split(",").map(category => category.trim());

                const selectElement = document.getElementById("category");
                selectElement.innerHTML = '';

                const defaultOption = document.createElement("option");
                defaultOption.value = "";
                defaultOption.textContent = "Select Category";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                selectElement.appendChild(defaultOption);
                categories.forEach(category => {
                    const option = document.createElement("option");
                    option.value = category;
                    option.textContent = category;
                    selectElement.appendChild(option);
                });

                // // Update the tags field with comma-separated tags
                const tagsInput = document.getElementById('tags');
                tagsInput.value = servertags

                toastr.success('Content generated successfully!');

            } else {
                toastr.error('Failed to generate content. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toastr.error('An error occurred. Please check the console for details.');
        }
    });


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
        formData.append('likes', 0);
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
                toastr.success('Blog post created successfully')
                form.reset(); // Reset the form after successful submission
            } else {
                console.error('Error creating blog post:', response.statusText);
                toastr.error('Failed to create blog post. Please try again.')
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
            toastr.error('An error occurred. Please try again.')
        }
    });
}

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
