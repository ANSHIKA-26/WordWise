
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



export function renderProfilePage(container) {
    container.innerHTML = `
        <div class="w-4/5 mx-auto p-6 pb-20">
            <div class='flex w-full justify-between'>
                <!-- Draft Form -->
                <div class="p-6 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-md w-3/5">
                    <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Draft a New Blog</h2>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">Create and save your blog drafts below.</p>

                    <input type="text" id="draft-title" placeholder="Draft Title..."
                        class="border border-gray-300 dark:border-gray-700 p-3 w-full rounded-lg shadow-sm focus:outline-none 
                        focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:text-gray-200" />

                    <textarea id="draft-details" placeholder="Draft Details..."
                        class="border border-gray-300 dark:border-gray-700 p-3 w-full mt-4 rounded-lg shadow-sm focus:outline-none 
                        focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 h-32 dark:bg-gray-700 dark:text-gray-200"></textarea>
                    
                    <!-- Category Selection -->
                    <select id="draft-category" class="border border-gray-300 dark:border-gray-700 p-3 w-full mt-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 dark:bg-gray-700 dark:text-gray-200">
                        <option value="" disabled selected>Select Category</option>
                        <option value="Vocabulary">Vocabulary</option>
                        <option value="Grammar">Grammar</option>
                        <option value="Pronunciation">Pronunciation</option>
                        <option value="Culture">Culture</option>
                        <option value="Learning Tips">Learning Tips</option>
                    </select>

                    <!-- Image Upload -->
                    <input type="file" id="draft-image" accept="image/*"
                        class="mt-4 border border-gray-300 dark:border-gray-700 p-2 w-full rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:text-gray-200" />

                    <button id="save-draft-btn"
                        class="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 w-full sm:w-auto">
                        Save Draft
                    </button>
                </div>

                <!-- Profile Header -->
                <div class="bg-white dark:bg-gray-800 dark:text-gray-200 p-6 rounded-lg border-2 border-blue-300 shadow-lg w-1/3 h-64 flex flex-col items-center transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                   <button id="logout-btn" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out hidden relative -top-[17px]  left-[135px]">
                        Sign out
                    </button>    
                <img
                        src=${userDetails.profilePic}
                        alt="Profile"
                        class="rounded-full object-cover w-28 h-28 border-4 border-gray-200 shadow-sm transition-transform duration-300 hover:scale-105" />
                    <div class="">
                        <h1 class="text-2xl text-center font-semibold text-gray-800 dark:text-gray-100 tracking-wide transition-colors duration-300 hover:text-blue-600">
                            ${userDetails.name}
                        </h1>
                        <p class="text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">${userDetails.email}</p>
                    </div>
                </div>
            </div>

            <!-- My Drafts Section -->
            <div class="my-8 border-t-2 border-gray-500 dark:border-gray-600 w-full"></div>

            <div class="mt-6 p-6 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-md w-full">
                <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">My Drafts</h2>
                <ul class="space-y-3" id="draft-list"></ul>
            </div>
        </div>
    `;
    document.getElementById('logout-btn').addEventListener('click', () => {
        signOut()
        window.location.href = '/';
    });
    // Sample Data (Simulating State)
    let drafts = [];

    // Save draft functionality
    const saveDraftButton = container.querySelector('#save-draft-btn');
    saveDraftButton.addEventListener('click', () => {
        const draftTitle = container.querySelector('#draft-title').value.trim();
        const draftDetails = container.querySelector('#draft-details').value.trim();
        const draftCategory = container.querySelector('#draft-category').value;
        const draftImageInput = container.querySelector('#draft-image');
        const draftImage = draftImageInput.files[0]; // Get the selected file

        if (draftTitle && draftDetails && draftCategory && draftImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                drafts.push({
                    title: draftTitle,
                    details: draftDetails,
                    category: draftCategory,
                    image: e.target.result, // Save the image as a data URL
                    date: new Date()
                });
                renderDrafts();
                container.querySelector('#draft-title').value = '';
                container.querySelector('#draft-details').value = '';
                container.querySelector('#draft-category').value = ''; // Reset category
                draftImageInput.value = ''; // Reset the file input
            };
            reader.readAsDataURL(draftImage); // Convert image to data URL
        }
    });

    // Render Drafts
    // Render Drafts
    function renderDrafts() {
        const draftList = container.querySelector('#draft-list');
        draftList.innerHTML = drafts.length
            ? drafts.map((draft, index) =>
                `<article class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <img src="${draft.image}" alt="${draft.title}" class="w-full h-48 object-cover" 
                    onerror="this.onerror=null; this.src='/placeholder.svg?height=200&width=400';">
                <div class="p-6">
                    <h2 class="text-2xl font-semibold mb-2">
                        <a href="#" class="text-gray-900 dark:text-white hover:underline">${draft.title}</a>
                    </h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">${draft.details}</p>
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time datetime="${draft.date.toISOString()}">${draft.date.toDateString()}</time>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span>${draft.category}</span>
                    </div>
                </div>
                <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <a href="#" class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 edit-btn" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h8M8 16h8M8 8h8" />
                        </svg>
                        Edit
                    </a>
                </div>
            </article>
            `).join('')
            : `<p class="text-center text-gray-500 dark:text-gray-400">No drafts available. Create your first draft!</p>`;

        // Attach edit event listeners
        const editButtons = draftList.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior

                const draftIndex = event.target.dataset.index; // Get the index of the draft to edit
                const draftToEdit = drafts[draftIndex]; // Get the draft object

                // Fill the form with draft details
                container.querySelector('#draft-title').value = draftToEdit.title;
                container.querySelector('#draft-details').value = draftToEdit.details;
                container.querySelector('#draft-category').value = draftToEdit.category;

                // Remove the draft from the drafts array
                drafts.splice(draftIndex, 1);
                renderDrafts(); // Re-render the drafts list
            });
        });
    }






}
