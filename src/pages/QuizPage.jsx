import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import NavigationPanel from '../components/NavigationPanel';
import Button from '../components/Button';
import Modal from '../components/Modal';

const QuizPage = () => {
    const navigate = useNavigate();
    const {
        email,
        questions,
        answers,
        currentQuestionIndex,
        visitedQuestions,
        timeLeft,
        setTimeLeft,
        quizCompleted,
        saveAnswer,
        navigateToQuestion,
        nextQuestion,
        previousQuestion,
        submitQuiz,
        getAnsweredQuestions,
    } = useQuiz();

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [showNavigationPanel, setShowNavigationPanel] = useState(false);

    // Redirect if no email or questions
    useEffect(() => {
        if (!email || questions.length === 0) {
            navigate('/');
        }
    }, [email, questions, navigate]);

    // Redirect if quiz is already completed
    useEffect(() => {
        if (quizCompleted) {
            navigate('/report');
        }
    }, [quizCompleted, navigate]);

    // Warn before leaving page
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!quizCompleted) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [quizCompleted]);

    if (!email || questions.length === 0) {
        return null;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const currentQuestionNumber = currentQuestionIndex + 1;
    const answeredQuestions = getAnsweredQuestions();
    const selectedAnswer = answers[currentQuestion.id];

    const handleAnswerSelect = (answer) => {
        saveAnswer(currentQuestion.id, answer);
    };

    const handleTimeUp = () => {
        submitQuiz();
    };

    const handleSubmitClick = () => {
        setShowSubmitModal(true);
    };

    const handleConfirmSubmit = () => {
        submitQuiz();
        navigate('/report');
    };

    const unansweredCount = questions.length - answeredQuestions.length;

    return (
        <div className="min-h-screen bg-stadium-900 bg-pitch-pattern">
            {/* Header */}
            <header className="bg-stadium-800/80 backdrop-blur-md border-b border-stadium-700 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-pitch-600 p-2 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-display font-bold text-white">Football Quiz</h1>
                                <p className="text-sm text-stadium-400">{email}</p>
                            </div>
                        </div>

                        <Timer
                            duration={timeLeft}
                            onTimeUp={handleTimeUp}
                            onTick={setTimeLeft}
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Question Area */}
                    <div className="lg:col-span-2">
                        <QuestionCard
                            question={currentQuestion}
                            choices={currentQuestion.choices}
                            selectedAnswer={selectedAnswer}
                            onSelectAnswer={handleAnswerSelect}
                            questionNumber={currentQuestionNumber}
                            totalQuestions={questions.length}
                        />

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-6 gap-4">
                            <Button
                                onClick={previousQuestion}
                                disabled={currentQuestionIndex === 0}
                                variant="secondary"
                            >
                                ← Previous
                            </Button>

                            <button
                                onClick={() => setShowNavigationPanel(!showNavigationPanel)}
                                className="lg:hidden glass-dark px-4 py-2 rounded-lg text-white font-semibold"
                            >
                                {showNavigationPanel ? 'Hide' : 'Show'} Navigator
                            </button>

                            {currentQuestionIndex === questions.length - 1 ? (
                                <Button
                                    onClick={handleSubmitClick}
                                    variant="primary"
                                >
                                    Submit Quiz →
                                </Button>
                            ) : (
                                <Button
                                    onClick={nextQuestion}
                                    variant="primary"
                                >
                                    Next →
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Navigation Panel - Desktop */}
                    <div className="hidden lg:block">
                        <NavigationPanel
                            totalQuestions={questions.length}
                            currentQuestion={currentQuestionNumber}
                            visitedQuestions={visitedQuestions}
                            answeredQuestions={answeredQuestions}
                            onNavigate={navigateToQuestion}
                        />

                        {/* Progress Summary */}
                        <div className="glass-dark p-4 rounded-xl mt-4">
                            <h3 className="font-display font-bold text-white mb-3">Progress</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-stadium-400">Answered:</span>
                                    <span className="text-pitch-500 font-bold">{answeredQuestions.length}/{questions.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stadium-400">Remaining:</span>
                                    <span className="text-yellow-card font-bold">{unansweredCount}</span>
                                </div>
                            </div>

                            {unansweredCount > 0 && (
                                <div className="mt-4 p-3 bg-yellow-card/10 border border-yellow-card/30 rounded-lg">
                                    <p className="text-yellow-card text-xs font-semibold">
                                        ⚠️ {unansweredCount} question{unansweredCount !== 1 ? 's' : ''} unanswered
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation Panel - Mobile */}
                    {showNavigationPanel && (
                        <div className="lg:hidden">
                            <NavigationPanel
                                totalQuestions={questions.length}
                                currentQuestion={currentQuestionNumber}
                                visitedQuestions={visitedQuestions}
                                answeredQuestions={answeredQuestions}
                                onNavigate={navigateToQuestion}
                            />
                        </div>
                    )}
                </div>
            </main>

            {/* Submit Confirmation Modal */}
            <Modal
                isOpen={showSubmitModal}
                onClose={() => setShowSubmitModal(false)}
                title="Submit Quiz?"
            >
                <div className="space-y-4">
                    <p className="text-stadium-300">
                        Are you sure you want to submit your quiz?
                    </p>

                    {unansweredCount > 0 && (
                        <div className="p-4 bg-yellow-card/10 border border-yellow-card rounded-lg">
                            <p className="text-yellow-card font-semibold">
                                ⚠️ You have {unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}.
                            </p>
                            <p className="text-yellow-200 text-sm mt-1">
                                Unanswered questions will be marked as incorrect.
                            </p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button
                            onClick={() => setShowSubmitModal(false)}
                            variant="secondary"
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmSubmit}
                            variant="primary"
                            className="flex-1"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default QuizPage;
