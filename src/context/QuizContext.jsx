import React, { createContext, useContext, useState, useEffect } from 'react';

const QuizContext = createContext();

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};

export const QuizProvider = ({ children }) => {
    // Load state from sessionStorage or use defaults
    const [email, setEmail] = useState(() => {
        return sessionStorage.getItem('quizEmail') || '';
    });

    const [questions, setQuestions] = useState(() => {
        const saved = sessionStorage.getItem('quizQuestions');
        return saved ? JSON.parse(saved) : [];
    });

    const [answers, setAnswers] = useState(() => {
        const saved = sessionStorage.getItem('quizAnswers');
        return saved ? JSON.parse(saved) : {};
    });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
        const saved = sessionStorage.getItem('currentQuestionIndex');
        return saved ? parseInt(saved) : 0;
    });

    const [visitedQuestions, setVisitedQuestions] = useState(() => {
        const saved = sessionStorage.getItem('visitedQuestions');
        return saved ? JSON.parse(saved) : [1];
    });

    const [timeLeft, setTimeLeft] = useState(() => {
        const saved = sessionStorage.getItem('timeLeft');
        return saved ? parseInt(saved) : 30 * 60; // 30 minutes in seconds
    });

    const [quizStartTime, setQuizStartTime] = useState(() => {
        return sessionStorage.getItem('quizStartTime') || null;
    });

    const [quizCompleted, setQuizCompleted] = useState(() => {
        const saved = sessionStorage.getItem('quizCompleted');
        return saved === 'true';
    });

    // Persist to sessionStorage whenever state changes
    useEffect(() => {
        if (email) sessionStorage.setItem('quizEmail', email);
    }, [email]);

    useEffect(() => {
        if (questions.length > 0) {
            sessionStorage.setItem('quizQuestions', JSON.stringify(questions));
        }
    }, [questions]);

    useEffect(() => {
        sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
    }, [answers]);

    useEffect(() => {
        sessionStorage.setItem('currentQuestionIndex', currentQuestionIndex.toString());
    }, [currentQuestionIndex]);

    useEffect(() => {
        sessionStorage.setItem('visitedQuestions', JSON.stringify(visitedQuestions));
    }, [visitedQuestions]);

    useEffect(() => {
        sessionStorage.setItem('timeLeft', timeLeft.toString());
    }, [timeLeft]);

    useEffect(() => {
        if (quizStartTime) sessionStorage.setItem('quizStartTime', quizStartTime);
    }, [quizStartTime]);

    useEffect(() => {
        sessionStorage.setItem('quizCompleted', quizCompleted.toString());
    }, [quizCompleted]);

    const startQuiz = (quizQuestions) => {
        setQuestions(quizQuestions);
        setQuizStartTime(new Date().toISOString());
        setCurrentQuestionIndex(0);
        setVisitedQuestions([1]);
        setAnswers({});
        setTimeLeft(30 * 60);
        setQuizCompleted(false);
    };

    const saveAnswer = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const navigateToQuestion = (questionNumber) => {
        const index = questionNumber - 1;
        setCurrentQuestionIndex(index);

        if (!visitedQuestions.includes(questionNumber)) {
            setVisitedQuestions(prev => [...prev, questionNumber]);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            const nextQuestionNum = nextIndex + 1;
            setCurrentQuestionIndex(nextIndex);

            if (!visitedQuestions.includes(nextQuestionNum)) {
                setVisitedQuestions(prev => [...prev, nextQuestionNum]);
            }
        }
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const submitQuiz = () => {
        setQuizCompleted(true);
    };

    const resetQuiz = () => {
        sessionStorage.clear();
        setEmail('');
        setQuestions([]);
        setAnswers({});
        setCurrentQuestionIndex(0);
        setVisitedQuestions([1]);
        setTimeLeft(30 * 60);
        setQuizStartTime(null);
        setQuizCompleted(false);
    };

    const getAnsweredQuestions = () => {
        return Object.keys(answers).map(Number);
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach(question => {
            if (answers[question.id] === question.correctAnswer) {
                correct++;
            }
        });
        return correct;
    };

    const value = {
        email,
        setEmail,
        questions,
        answers,
        currentQuestionIndex,
        visitedQuestions,
        timeLeft,
        setTimeLeft,
        quizStartTime,
        quizCompleted,
        startQuiz,
        saveAnswer,
        navigateToQuestion,
        nextQuestion,
        previousQuestion,
        submitQuiz,
        resetQuiz,
        getAnsweredQuestions,
        calculateScore,
    };

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
