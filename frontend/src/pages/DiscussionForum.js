export async function renderDiscussionForum(container) {
    // Fetch questions data from the backend
    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/discussion/getQuestion');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching questions:', error);
            return [];
        }
    };

    // Helper function to save a new question to the backend
    const addQuestion = async (content) => {
        const newQuestion = {
            content: content,
            answered: false,
            answer: '',
        };
        try {
            const response = await fetch('http://localhost:5000/api/discussion/postQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuestion),
            });
            const savedQuestion = await response.json();
            window.location.reload()
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    // Helper function to add an answer to a question
    const addAnswer = async (questionId, answerContent) => {
        const answer = { answer: answerContent };
        try {
            const response = await fetch(`http://localhost:5000/api/discussion/${questionId}/answer`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answer),
            });
            const updatedQuestion = await response.json();
            window.location.reload()
        } catch (error) {
            console.error('Error adding answer:', error);
        }
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
            const answerForm = renderAnswerForm(question._id);
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
    const renderQuestionList = async () => {
        const questions = await fetchQuestions();

        // Create containers for unanswered and answered sections
        const unansweredContainer = document.createElement('div');
        const answeredContainer = document.createElement('div');

        // Create titles for unanswered and answered questions
        const unansweredTitleContainer = document.createElement('div');
        const unansweredTitle = document.createElement('h2');
        unansweredTitle.textContent = 'Unanswered Questions';
        unansweredTitle.classList.add('text-2xl', 'font-semibold', 'mb-4', 'text-gray-800', 'dark:text-white');

        const answeredTitleContainer = document.createElement('div');
        const answeredTitle = document.createElement('h2');
        answeredTitle.textContent = 'Answered Questions';
        answeredTitle.classList.add('text-2xl', 'font-semibold', 'mb-4', 'text-gray-800', 'dark:text-white', 'mt-8');

        // Append the titles to their respective containers
        unansweredTitleContainer.appendChild(unansweredTitle);
        answeredTitleContainer.appendChild(answeredTitle);

        // Create containers for the question cards
        const unansweredCardsContainer = document.createElement('div');
        const answeredCardsContainer = document.createElement('div');
        answeredCardsContainer.classList.add('flex', 'flex-wrap', 'gap-5')
        unansweredCardsContainer.classList.add('flex', 'flex-wrap', 'gap-5')

        questions.forEach((question) => {
            const questionCard = renderQuestionCard(question);
            if (question.answered) {
                answeredCardsContainer.appendChild(questionCard);
            } else {
                unansweredCardsContainer.appendChild(questionCard);
            }
        });

        // Clear previous content
        container.innerHTML = '';

        // Append new content
        container.appendChild(renderQuestionForm());
        container.appendChild(unansweredTitleContainer);
        container.appendChild(unansweredCardsContainer);
        container.appendChild(answeredTitleContainer);
        container.appendChild(answeredCardsContainer);
    };


    renderQuestionList();
}
