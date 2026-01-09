import React from 'react';

const QuestionCard = ({
    question,
    choices,
    selectedAnswer,
    onSelectAnswer,
    questionNumber,
    totalQuestions
}) => {
    // Decode HTML entities
    const decodeHTML = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    return (
        <div className="glass-dark p-8 rounded-2xl shadow-2xl animate-fade-in">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-pitch-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        {questionNumber}
                    </div>
                    <span className="text-stadium-400 font-medium">
                        of {totalQuestions}
                    </span>
                </div>
                <div className="bg-stadium-800 px-4 py-2 rounded-lg">
                    <span className="text-pitch-500 font-semibold">{question.category}</span>
                </div>
            </div>

            {/* Question Text */}
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                {decodeHTML(question.question)}
            </h2>

            {/* Difficulty Badge */}
            <div className="mb-8">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${question.difficulty === 'easy' ? 'bg-pitch-900/50 text-pitch-400' :
                        question.difficulty === 'medium' ? 'bg-yellow-card/20 text-yellow-card' :
                            'bg-red-card/20 text-red-card'
                    }`}>
                    {question.difficulty.toUpperCase()}
                </span>
            </div>

            {/* Answer Choices */}
            <div className="space-y-3">
                {choices.map((choice, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectAnswer(choice)}
                        className={`w-full p-4 rounded-xl text-left transition-all duration-200 transform hover:scale-[1.02] ${selectedAnswer === choice
                                ? 'bg-pitch-600 border-2 border-pitch-400 text-white shadow-lg shadow-pitch-900/50'
                                : 'glass border-2 border-transparent hover:border-pitch-600/50 text-slate-200'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${selectedAnswer === choice
                                    ? 'border-white bg-white'
                                    : 'border-stadium-500'
                                }`}>
                                {selectedAnswer === choice && (
                                    <svg className="w-5 h-5 text-pitch-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <span className="font-medium text-lg">{decodeHTML(choice)}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;
