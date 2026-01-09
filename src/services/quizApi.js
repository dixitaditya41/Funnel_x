const API_URL = 'https://opentdb.com/api.php?amount=15';

/**
 * Fetches quiz questions from OpenTDB API
 * @returns {Promise<Array>} Array of formatted quiz questions
 */
export const fetchQuizQuestions = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.response_code !== 0) {
            throw new Error('Failed to fetch questions from API');
        }

        // Format and shuffle answers
        const formattedQuestions = data.results.map((question, index) => {
            const allAnswers = [
                ...question.incorrect_answers,
                question.correct_answer
            ];

            // Shuffle answers using Fisher-Yates algorithm
            const shuffledAnswers = shuffleArray(allAnswers);

            return {
                id: index + 1,
                question: question.question,
                choices: shuffledAnswers,
                correctAnswer: question.correct_answer,
                category: question.category,
                difficulty: question.difficulty,
                type: question.type
            };
        });

        return formattedQuestions;
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        throw error;
    }
};

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
