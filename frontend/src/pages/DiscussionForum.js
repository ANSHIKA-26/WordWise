export async function renderDiscussionForum(container) {
    // Initialize questions data
    let questions = JSON.parse(localStorage.getItem('questions')) || [];

    // Helper function to save questions to localStorage
    const saveQuestions = () => {
        localStorage.setItem('questions', JSON.stringify(questions));
    };

    // Function to handle adding a new question
    const addQuestion = (content) => {
        const newQuestion = {
            id: Date.now(),
            content: content,
            answered: false,
            answer: '',
        };
        questions.push(newQuestion);
        saveQuestions();
        render();
    };

    // Function to handle adding an answer to a question
    const addAnswer = (questionId, answerContent) => {
        questions = questions.map(q =>
            q.id === questionId ? { ...q, answered: true, answer: answerContent } : q
        );
        saveQuestions();
        render();
    };

    // Function to render the Question Card
    const renderQuestionCard = (question) => {
        const card = document.createElement('div');
        card.classList.add('bg-white', 'dark:bg-gray-800', 'p-4', 'rounded-md', 'shadow-md', 'mb-4', 'w-[30%]');

        const questionText = document.createElement('p');
        questionText.textContent = question.content;
        questionText.classList.add('text-lg', 'text-gray-800', 'dark:text-gray-100');

        card.appendChild(questionText);

        if (question.answered) {
            const answerSection = document.createElement('div');
            answerSection.classList.add('mt-4', 'text-gray-600', 'dark:text-gray', 'dark:bg-gray-700', 'p-5', 'rounded-lg')
            const answerTitle = document.createElement('h3');
            answerTitle.textContent = 'Answer:';
            answerTitle.classList.add('text-indigo-600', 'dark:text-indigo-400');

            const answerText = document.createElement('p');
            answerText.textContent = question.answer;
            answerText.classList.add('text-gray-700', 'dark:text-gray-300');

            answerSection.appendChild(answerTitle);
            answerSection.appendChild(answerText);
            card.appendChild(answerSection);
        } else {
            const answerForm = renderAnswerForm(question.id);
            card.appendChild(answerForm);
        }

        return card;
    };
    // Function to render the Question Form
    const renderQuestionForm = () => {
        const formContainer = document.createElement('div');
        formContainer.classList.add('bg-white', 'dark:bg-gray-800', 'p-4', 'rounded-md', 'shadow-md', 'mb-6');

        const textarea = document.createElement('textarea');
        textarea.placeholder = 'Ask your question...';
        textarea.classList.add('w-full', 'p-3', 'border', 'rounded-md', 'dark:bg-gray-700', 'dark:text-white', 'focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-500');

        const button = document.createElement('button');
        button.textContent = 'Ask Question';
        button.classList.add('mt-4', 'bg-indigo-500', 'text-white', 'px-4', 'py-2', 'rounded-md', 'hover:bg-indigo-600', 'focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-500');

        formContainer.appendChild(textarea);
        formContainer.appendChild(button);

        button.addEventListener('click', (e) => {
            e.preventDefault();
            const content = textarea.value.trim();
            if (content) {
                addQuestion(content);
                textarea.value = '';
            }
        });

        return formContainer;
    };

    // Function to render the Answer Form
    const renderAnswerForm = (questionId) => {
        const formContainer = document.createElement('div');
        formContainer.classList.add('bg-white', 'dark:bg-gray-800', 'p-4', 'rounded-md', 'shadow-md', 'mt-4');

        const textarea = document.createElement('textarea');
        textarea.placeholder = 'Write your answer...';
        textarea.classList.add('w-full', 'p-3', 'border', 'rounded-md', 'dark:bg-gray-700', 'dark:text-white', 'focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-500');

        const button = document.createElement('button');
        button.textContent = 'Submit Answer';
        button.classList.add('mt-4', 'bg-green-500', 'text-white', 'px-4', 'py-2', 'rounded-md', 'hover:bg-green-600', 'focus:outline-none', 'focus:ring-2', 'focus:ring-green-500');

        formContainer.appendChild(textarea);
        formContainer.appendChild(button);

        button.addEventListener('click', (e) => {
            e.preventDefault();
            const answerContent = textarea.value.trim();
            if (answerContent) {
                addAnswer(questionId, answerContent);
                textarea.value = '';
            }
        });

        return formContainer;
    };



    // Function to render the list of questions
    const renderQuestionList = () => {
        // Create container divs for unanswered and answered sections
        const unansweredContainer = document.createElement('div');
        const answeredContainer = document.createElement('div');

        // Create titles for unanswered and answered questions
        const unansweredTitle = document.createElement('h2');
        unansweredTitle.textContent = 'Unanswered Questions';
        unansweredTitle.classList.add('text-2xl', 'font-semibold', 'mb-4', 'text-gray-800', 'dark:text-white');

        const answeredTitle = document.createElement('h2');
        answeredTitle.textContent = 'Answered Questions';
        answeredTitle.classList.add('text-2xl', 'font-semibold', 'mb-4', 'text-gray-800', 'dark:text-white', 'mt-8');

        // Append the titles to their respective containers
        unansweredContainer.appendChild(unansweredTitle);
        answeredContainer.appendChild(answeredTitle);

        // Filter questions into answered and unanswered arrays
        const unansweredQuestions = questions.filter(q => !q.answered);
        const answeredQuestions = questions.filter(q => q.answered);

        // Create a wrapper div for unanswered questions
        const unansweredCardsContainer = document.createElement('div');
        unansweredCardsContainer.classList.add('flex', 'gap-9', 'flex-wrap'); // Add space between cards

        // Handle unanswered questions
        if (unansweredQuestions.length === 0) {
            const noUnansweredMessage = document.createElement('p');
            noUnansweredMessage.textContent = 'No unanswered questions yet.';
            unansweredCardsContainer.appendChild(noUnansweredMessage);
        } else {
            unansweredQuestions.forEach(q => {
                const questionCard = renderQuestionCard(q);
                unansweredCardsContainer.appendChild(questionCard);
            });
        }

        // Create a wrapper div for answered questions
        const answeredCardsContainer = document.createElement('div');
        answeredCardsContainer.classList.add('flex', 'gap-9', 'flex-wrap'); // Add space between cards

        // Handle answered questions
        if (answeredQuestions.length === 0) {
            const noAnsweredMessage = document.createElement('p');
            noAnsweredMessage.textContent = 'No answered questions yet.';
            answeredCardsContainer.appendChild(noAnsweredMessage);
        } else {
            answeredQuestions.forEach(q => {
                const questionCard = renderQuestionCard(q);
                answeredCardsContainer.appendChild(questionCard);
            });
        }

        // Append the card containers to their respective sections
        unansweredContainer.appendChild(unansweredCardsContainer);
        answeredContainer.appendChild(answeredCardsContainer);

        // Append both sections to the container
        container.appendChild(unansweredContainer);
        container.appendChild(answeredContainer);
    };



    const render = () => {
        container.innerHTML = '';  // Clear the container

        // Create the heading for the forum
        const heading = document.createElement('h1');
        heading.textContent = 'Wordwise Discussion Forum';
        heading.classList.add('text-3xl', 'font-bold', 'mb-6', 'text-gray-800', 'dark:text-white');
        container.appendChild(heading);

        // First, append the question form at the top
        const questionForm = renderQuestionForm();
        container.appendChild(questionForm);

        // Then, append the question list (answered and unanswered)
        const questionList = renderQuestionList();
        container.appendChild(questionList);
    };



    render();  // Initial render
}
