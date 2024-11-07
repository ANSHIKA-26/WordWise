import toastr from "toastr";
export function renderFeedback(container) {
    container.innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <header class="mb-8">
                <h1 class="text-4xl font-bold mb-2 text-gray-900 dark:text-white" data-aos="fade-right" data-aos-delay="100">Feedback</h1>
                <p class="text-xl text-gray-600 dark:text-gray-400" data-aos="fade-right" data-aos-delay="300">Help us improve WordWise</p>
            </header>

            <main class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="500">
                <form id="feedbackForm" class="space-y-6">
                    <div>
                        <label for="overallExperience" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">How would you rate your overall experience with WordWise?</label>
                        <div class="flex items-center space-x-4">
                            ${renderRatingInputs('overallExperience', 5)}
                        </div>
                    </div>

                    <div>
                        <label for="featuresUsed" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Which features of WordWise have you used? (Select all that apply)</label>
                        <div class="space-y-2">
                            ${renderCheckboxes([
        { id: 'feature-vocabulary', value: 'vocabulary', label: 'Vocabulary Exercises' },
        { id: 'feature-grammar', value: 'grammar', label: 'Grammar Lessons' },
        { id: 'feature-pronunciation', value: 'pronunciation', label: 'Pronunciation Practice' },
        { id: 'feature-reading', value: 'reading', label: 'Reading Comprehension' },
        { id: 'feature-listening', value: 'listening', label: 'Listening Exercises' }
    ])}
                        </div>
                    </div>

                    <div>
                        <label for="mostHelpfulFeature" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Which feature did you find most helpful?</label>
                        <select id="mostHelpfulFeature" name="mostHelpfulFeature" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option value="">Select a feature</option>
                            <option value="vocabulary">Vocabulary Exercises</option>
                            <option value="grammar">Grammar Lessons</option>
                            <option value="pronunciation">Pronunciation Practice</option>
                            <option value="reading">Reading Comprehension</option>
                            <option value="listening">Listening Exercises</option>
                        </select>
                    </div>

                    ${renderTextarea('improvement', 'What aspect of WordWise do you think needs the most improvement?')}
                    ${renderTextarea('newFeatures', 'Are there any new features you\'d like to see added to WordWise?')}

                    <div>
                        <label for="recommendation" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">How likely are you to recommend WordWise to a friend or colleague?</label>
                        <div class="flex items-center space-x-4">
                            ${renderRatingInputs('recommendation', 5)}
                        </div>
                    </div>

                    ${renderTextarea('additionalComments', 'Do you have any additional comments or suggestions?', 4)}

                    <div>
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                            Submit Feedback
                        </button>
                    </div>
                </form>
                <div id="formSuccess" class="mt-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 px-4 py-3 rounded relative hidden" role="alert">
                    <strong class="font-bold">Thank you for your feedback!</strong>
                    <span class="block sm:inline">We appreciate your input and will use it to improve WordWise.</span>
                </div>
            </main>
        </div>
    `;

    document.getElementById('feedbackForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = {};

        formData.forEach((value, key) => {
            if (key === 'features-used') {
                if (!data.featuresUsed) {
                    data.featuresUsed = [];
                }
                data.featuresUsed.push(value);
            } else {
                data[key] = ['overallExperience', 'recommendation'].includes(key) ? parseInt(value, 10) : value;
            }
        });


        try {
            const response = await fetch('http://localhost:5000/api/feedback/saveFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                document.getElementById('formSuccess').classList.remove('hidden');
                this.reset();
                document.getElementById('formSuccess').scrollIntoView({ behavior: 'smooth' });
                toastr.info('Thanks for your feedback')
            } else {
                const errorData = await response.json();
                console.error("Error submitting form:", errorData);
                toastr.error('Error submitting feedback')
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toastr.error('Error submitting feedback')

        }
    });
}

function renderRatingInputs(name, count) {
    return Array.from({ length: count }, (_, i) => i + 1)
        .map(value => `
            <input type="radio" id="${name}-${value}" name="${name}" value="${value}" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-gray-600">
            <label for="${name}-${value}" class="text-sm text-gray-700 dark:text-gray-300">${value}${value === 1 ? ' (Poor)' : value === count ? ' (Excellent)' : ''}</label>
        `).join('');
}

function renderCheckboxes(items) {
    return items.map(item => `
        <div class="flex items-center">
            <input type="checkbox" id="${item.id}" name="features-used" value="${item.value}" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-gray-600 rounded">
            <label for="${item.id}" class="ml-2 text-sm text-gray-700 dark:text-gray-300">${item.label}</label>
        </div>
    `).join('');
}

function renderTextarea(id, label, rows = 3) {
    return `
        <div>
            <label for="${id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${label}</label>
            <textarea id="${id}" name="${id}" rows="${rows}" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
        </div>
    `;
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