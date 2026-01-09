import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { fetchQuizQuestions } from '../services/quizApi';
import Input from '../components/Input';
import Button from '../components/Button';

const StartPage = () => {
    const navigate = useNavigate();
    const { setEmail, startQuiz } = useQuiz();
    const [emailInput, setEmailInput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setApiError('');

        if (!emailInput.trim()) {
            setError('Email is required');
            return;
        }

        if (!validateEmail(emailInput)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);

        try {
            const questions = await fetchQuizQuestions();
            setEmail(emailInput);
            startQuiz(questions);
            navigate('/quiz');
        } catch (err) {
            setApiError('Failed to load quiz questions. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stadium-900 bg-pitch-pattern relative overflow-hidden flex items-center justify-center p-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-64 h-64 bg-pitch-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-pitch-700/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo/Title */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-block p-4 bg-pitch-600 rounded-full mb-4 shadow-lg shadow-pitch-900/50">
                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display font-black text-white mb-3">
                        Football
                        <span className="text-pitch-500"> Quiz</span>
                    </h1>
                    <p className="text-stadium-300 text-lg font-medium">
                        Test your knowledge and compete for the top spot!
                    </p>
                </div>

                {/* Main Card */}
                <div className="glass-dark p-8 rounded-2xl shadow-2xl animate-slide-in">
                    <div className="mb-6">
                        <h2 className="text-2xl font-display font-bold text-white mb-2">
                            Ready to Play?
                        </h2>
                        <p className="text-stadium-400">
                            Enter your email to start the 15-question quiz. You'll have 30 minutes to complete it.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder="your.email@example.com"
                            error={error}
                            required
                        />

                        {apiError && (
                            <div className="mb-4 p-4 bg-red-card/20 border border-red-card rounded-lg flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-card flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-red-card font-semibold">{apiError}</p>
                                    <p className="text-red-300 text-sm mt-1">Check your internet connection and try again.</p>
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            loading={loading}
                            disabled={loading}
                        >
                            {loading ? 'Loading Quiz...' : 'Start Quiz'}
                        </Button>
                    </form>

                    {/* Info Cards */}
                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <div className="bg-stadium-800 p-3 rounded-lg text-center">
                            <div className="text-pitch-500 font-bold text-2xl">15</div>
                            <div className="text-stadium-400 text-xs">Questions</div>
                        </div>
                        <div className="bg-stadium-800 p-3 rounded-lg text-center">
                            <div className="text-pitch-500 font-bold text-2xl">30</div>
                            <div className="text-stadium-400 text-xs">Minutes</div>
                        </div>
                        <div className="bg-stadium-800 p-3 rounded-lg text-center">
                            <div className="text-pitch-500 font-bold text-2xl">🏆</div>
                            <div className="text-stadium-400 text-xs">Win Big</div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-stadium-500 text-sm mt-6">
                    Your progress will be saved. You can refresh the page without losing your answers.
                </p>
            </div>
        </div>
    );
};

export default StartPage;
