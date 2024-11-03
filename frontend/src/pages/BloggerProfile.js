function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        email: params.get('email'),
        profilePic: params.get('profilePic')
    };
}

import signOut from "./Login";

const userDetails = getQueryParams();

function loadDrafts() {
    const storedDrafts = localStorage.getItem('drafts');
    return storedDrafts ? JSON.parse(storedDrafts) : [];
}

let drafts = loadDrafts();

export function renderProfilePage(container) {
    container.innerHTML = `
        <div class="w-4/5 mx-auto p-6 pb-20">
            <div class='flex w-full justify-between'>
                <!-- Draft Form -->
                <div class="p-6 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-md w-3/5" data-aos="fade-up" data-aos-delay="100">
                    <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Draft a New Blog</h2>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">Create and save your blog drafts below.</p>
                    <input type="text" id="draft-title" placeholder="Blog Title..." class=" bg-gray-300 dark:bg-gray-700 p-3 w-full rounded-lg shadow-sm" />
                    <textarea id="draft-summary" placeholder="Blog summary..." class=" bg-gray-300 dark:bg-gray-700 p-3 w-full mt-4 rounded-lg shadow-sm h-32"></textarea>
                    <textarea id="draft-content" placeholder="Blog content..." class=" bg-gray-300 dark:bg-gray-700 p-3 w-full mt-4 rounded-lg shadow-sm h-32"></textarea>
                    <select id="draft-category" class="  bg-gray-300 dark:bg-gray-700 p-3 w-full mt-4 rounded-lg shadow-sm">
                        <option value="" disabled selected>Select Category</option>
                        <option value="vocabulary">Vocabulary</option>
                        <option value="grammar">Grammar</option>
                        <option value="pronunciation">Pronunciation</option>
                        <option value="culture">Culture</option>
                        <option value="learning-tips">Learning Tips</option>
                    </select>
                    <input type="text" id="draft-tags" placeholder="Tags (comma-separated)" class="w-full mt-4 px-3 py-2 bg-gray-300 dark:bg-gray-600 rounded-md shadow-sm" />
                    <input type="file" id="draft-image" accept="image/*" class="mt-4  bg-gray-300 dark:bg-gray-700 p-2 w-full rounded-lg" />
                    <button id="save-draft-btn" class="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 w-full">Save Draft</button>
                </div>
                <!-- Profile Header -->
                <div class="bg-white dark:bg-gray-800 dark:text-gray-200 p-6 rounded-lg border-2 border-blue-300 shadow-lg w-1/3 h-64 flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
                    <button id="logout-btn" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded shadow-md relative left-[135px] -top-4">Sign out</button>
                    <img src="${userDetails.profilePic}" alt="Profile" class="rounded-full object-cover w-28 h-28 border-4 border-gray-200" />
                    <h1 class="text-2xl text-center font-semibold text-gray-800 dark:text-gray-100 tracking-wide">${userDetails.name}</h1>
                    <p class="text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">${userDetails.email}</p>
                </div>
            </div>
            <!-- My Drafts Section -->
            <div class="mt-6 p-6 bg-white dark:bg-gray-900 dark:text-gray-200 rounded-lg shadow-md w-full">
                <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">My Drafts</h2>
                <ul class="space-y-3" id="draft-list"></ul>
            </div>
        </div>
    `;

    document.getElementById('logout-btn').addEventListener('click', () => {
        signOut();
        window.location.href = '/';
    });

    // Save draft functionality
    container.querySelector('#save-draft-btn').addEventListener('click', () => {
        const draftTitle = container.querySelector('#draft-title').value.trim();
        const draftContent = container.querySelector('#draft-content').value.trim();
        const draftSummary = container.querySelector('#draft-summary').value.trim();
        const draftTags = container.querySelector('#draft-tags').value.trim();
        const draftCategory = container.querySelector('#draft-category').value;
        const draftImageInput = container.querySelector('#draft-image');
        const draftImage = draftImageInput.files[0];

        if (draftTitle && draftContent && draftCategory && draftImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newDraft = {
                    title: draftTitle,
                    excerpt: draftContent, // Keeping excerpt as intended
                    summary: draftSummary,
                    category: draftCategory,
                    tags: draftTags,
                    image: e.target.result,
                    date: new Date()
                };

                drafts.push(newDraft);
                localStorage.setItem('drafts', JSON.stringify(drafts));
                renderDrafts(container);

                // Reset the input fields
                resetDraftForm(container);
            };
            reader.readAsDataURL(draftImage);
        }
    });


    const handlePostingDraft = async (event) => {
        const index = event.target.dataset.index;
        const postDraftData = drafts[index];

        const formData = new FormData();
        formData.append('title', postDraftData.title);
        formData.append('category', postDraftData.category);
        formData.append('summary', postDraftData.summary);
        formData.append('excerpt', postDraftData.excerpt);
        formData.append('tags', postDraftData.tags);
        formData.append('publish', true);

        // Ensure the key name matches the backend expectation
        if (postDraftData.image) {  // Check with correct key name
            formData.append('featuredImage', postDraftData.image);
        }

        console.log(postDraftData);

        try {
            const response = await fetch('http://localhost:5000/api/addBlog/saveBlog', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Blog post created:', result);
                alert('Blog post successfully created!');

                // Remove the draft and update localStorage
                drafts.splice(index, 1);
                localStorage.setItem('drafts', JSON.stringify(drafts));

                // Redirect to blogs page
                window.location.href = '/blogs';
            } else {
                console.error('Error creating blog post:', response.statusText);
                alert('Failed to create blog post. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Render Drafts
    renderDrafts(container)

    function renderDrafts(container) {
        const draftList = container.querySelector('#draft-list');

        draftList.innerHTML = drafts.length
            ? drafts.map((draft, index) => `
                <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden my-12">
                    <img src="${draft.image}" alt="${draft.title}" class="w-full h-48 object-cover" onerror="this.onerror=null; this.src='/placeholder.svg?height=200&width=400';">
                    <div class="p-6">
                        <h2 class="text-2xl font-semibold mb-2">
                            <a href="#" class="text-gray-900 dark:text-white hover:underline">${draft.title}</a>
                        </h2>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">${draft.excerpt}</p>
                        <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <time datetime="${new Date(draft.date).toISOString()}">${new Date(draft.date).toDateString()}</time>
                            <span class="ml-4">${draft.category}</span>
                            <span class="ml-4 font-medium text-gray-900 dark:text-white">${draft.tags}</span>
                        </div>
                    </div>
                    <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                        <button class="edit-btn inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" data-index="${index}">Edit</button>
                        <button class="delete-btn inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-red-600 dark:text-red-200 bg-white dark:bg-gray-700 hover:bg-red-500 dark:hover:bg-red-600" data-index="${index}">Delete</button>
                        <button class="post-btn inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-green-600 dark:text-green-200 bg-white dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600" data-index="${index}">Post</button>
                    </div>
                </article>
            `).join('')
            : '<p class="text-gray-600 dark:text-gray-300">No drafts available.</p>';

        draftList.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', handleEditDraft);
        });

        draftList.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', handleDeleteDraft);
        });

        draftList.querySelectorAll('.post-btn').forEach(btn => {
            btn.addEventListener('click', handlePostingDraft);
        });
    }

    function handleEditDraft(event) {
        const index = event.target.dataset.index;
        const draft = drafts[index];
        container.querySelector('#draft-title').value = draft.title;
        container.querySelector('#draft-summary').value = draft.summary;
        container.querySelector('#draft-content').value = draft.excerpt;
        container.querySelector('#draft-category').value = draft.category;
        container.querySelector('#draft-tags').value = draft.tags;
        // Handle the image upload for the draft as needed
        // You can set the draft image if you have a preview option
    }

    function handleDeleteDraft(event) {
        const index = event.target.dataset.index;
        drafts.splice(index, 1);
        localStorage.setItem('drafts', JSON.stringify(drafts));
        renderDrafts(container);
    }



    function resetDraftForm(container) {
        container.querySelector('#draft-title').value = '';
        container.querySelector('#draft-summary').value = '';
        container.querySelector('#draft-content').value = '';
        container.querySelector('#draft-category').value = '';
        container.querySelector('#draft-tags').value = '';
        container.querySelector('#draft-image').value = '';
    }
}
