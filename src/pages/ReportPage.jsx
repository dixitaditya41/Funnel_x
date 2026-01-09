import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Button from '../components/Button';

const ReportPage = () => {
    const navigate = useNavigate();
    const { email, questions, answers, quizCompleted, resetQuiz, calculateScore } = useQuiz();

    useEffect(() => {
        if (!quizCompleted || questions.length === 0) {
            navigate('/');
        }
    }, [quizCompleted, questions, navigate]);

    if (!quizCompleted || questions.length === 0) {
        return null;
    }

    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 50;

    // Decode HTML entities
    const decodeHTML = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const handleRetake = () => {
        resetQuiz();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-stadium-900 bg-pitch-pattern">
            {/* Header */}
            <header className="bg-stadium-800/80 backdrop-blur-md border-b border-stadium-700">
                <div className="max-w-5xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-pitch-600 p-2 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-display font-bold text-white">Quiz Results</h1>
                            <p className="text-sm text-stadium-400">{email}</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8">
                {/* Score Card */}
                <div className={`glass-dark p-8 rounded-2xl shadow-2xl mb-8 text-center ${passed ? 'animate-bounce-goal' : ''}`}>
                    <div className={`inline-block p-6 rounded-full mb-4 ${passed ? 'bg-pitch-600/20' : 'bg-red-card/20'
                        }`}>
                        <div className="text-6xl">
                            {passed ? '🏆' : '⚽'}
                        </div>
                    </div>

                    <h2 className="text-4xl font-display font-black text-white mb-2">
                        {passed ? 'Great Job!' : 'Good Try!'}
                    </h2>

                    <p className="text-stadium-300 mb-6">
                        {passed ? 'You passed the quiz!' : 'Keep practicing to improve!'}
                    </p>

                    <div className="flex justify-center items-baseline gap-2 mb-6">
                        <span className={`text-7xl font-black ${passed ? 'text-pitch-500' : 'text-red-card'}`}>
                            {score}
                        </span>
                        <span className="text-4xl text-stadium-400">/ {questions.length}</span>
                    </div>

                    <div className="inline-block px-6 py-3 bg-stadium-800 rounded-full">
                        <span className="text-2xl font-bold text-white">{percentage}%</span>
                    </div>

                    <div className="mt-8">
                        <Button onClick={handleRetake} variant="primary">
                            Retake Quiz
                        </Button>
                    </div>
                </div>

                {/* Detailed Results */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-pitch-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Answer Review
                    </h3>

                    {questions.map((question, index) => {
                        const userAnswer = answers[question.id];
                        const isCorrect = userAnswer === question.correctAnswer;
                        const wasAnswered = userAnswer !== undefined;

                        return (
                            <div key={question.id} className="glass-dark p-6 rounded-xl">
                                {/* Question Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isCorrect ? 'bg-pitch-600 text-white' : 'bg-red-card text-white'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${question.difficulty === 'easy' ? 'bg-pitch-900/50 text-pitch-400' :
                                                    question.difficulty === 'medium' ? 'bg-yellow-card/20 text-yellow-card' :
                                                        'bg-red-card/20 text-red-card'
                                                }`}>
                                                {question.difficulty.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {isCorrect ? (
                                            <span className="flex items-center gap-1 text-pitch-500 font-semibold">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                Correct
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-red-card font-semibold">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                                {wasAnswered ? 'Incorrect' : 'Not Answered'}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Question */}
                                <h4 className="text-lg font-semibold text-white mb-4">
                                    {decodeHTML(question.question)}
                                </h4>

                                {/* Answers Comparison */}
                                <div className="space-y-3">
                                    {wasAnswered && (
                                        <div className={`p-4 rounded-lg border-2 ${isCorrect
                                                ? 'bg-pitch-900/30 border-pitch-600'
                                                : 'bg-red-card/10 border-red-card'
                                            }`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-semibold text-stadium-400 uppercase">Your Answer:</span>
                                                {isCorrect && (
                                                    <svg className="w-4 h-4 text-pitch-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <p className={`font-medium ${isCorrect ? 'text-pitch-400' : 'text-red-300'}`}>
                                                {decodeHTML(userAnswer)}
                                            </p>
                                        </div>
                                    )}

                                    {!isCorrect && (
                                        <div className="p-4 rounded-lg border-2 bg-pitch-900/30 border-pitch-600">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-semibold text-stadium-400 uppercase">Correct Answer:</span>
                                                <svg className="w-4 h-4 text-pitch-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="font-medium text-pitch-400">
                                                {decodeHTML(question.correctAnswer)}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="mt-3 text-sm text-stadium-400">
                                    Category: <span className="text-pitch-500 font-semibold">{question.category}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <Button onClick={handleRetake} variant="outline">
                        Take Another Quiz
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default ReportPage;
