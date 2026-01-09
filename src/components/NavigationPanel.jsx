import React from 'react';

const NavigationPanel = ({
    totalQuestions,
    currentQuestion,
    visitedQuestions,
    answeredQuestions,
    onNavigate
}) => {
    return (
        <div className="glass-dark p-6 rounded-2xl">
            <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-pitch-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Question Navigator
            </h3>

            <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: totalQuestions }, (_, i) => {
                    const questionNum = i + 1;
                    const isAnswered = answeredQuestions.includes(questionNum);
                    const isVisited = visitedQuestions.includes(questionNum);
                    const isCurrent = questionNum === currentQuestion;

                    return (
                        <button
                            key={questionNum}
                            onClick={() => onNavigate(questionNum)}
                            className={`
                aspect-square rounded-lg font-bold text-sm transition-all duration-200
                ${isCurrent
                                    ? 'bg-pitch-600 text-white ring-2 ring-pitch-400 ring-offset-2 ring-offset-stadium-900 scale-110'
                                    : isAnswered
                                        ? 'bg-yellow-card/40 text-yellow-200 border-2 border-yellow-card hover:bg-yellow-card/60'
                                        : isVisited
                                            ? 'bg-stadium-700 text-white border-2 border-stadium-500 hover:bg-stadium-600'
                                            : 'bg-stadium-800 text-stadium-400 border-2 border-stadium-700 hover:bg-stadium-700'
                                }
                hover:scale-105 active:scale-95
              `}
                            title={
                                isCurrent ? 'Current Question' :
                                    isAnswered ? 'Attempted' :
                                        isVisited ? 'Visited' :
                                            'Not Visited'
                            }
                        >
                            {questionNum}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-pitch-600 rounded border-2 border-pitch-400"></div>
                    <span className="text-stadium-300">Current</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-card/40 rounded border-2 border-yellow-card"></div>
                    <span className="text-stadium-300">Attempted</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-stadium-700 rounded border-2 border-stadium-500"></div>
                    <span className="text-stadium-300">Visited</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-stadium-800 rounded border-2 border-stadium-700"></div>
                    <span className="text-stadium-300">Not Visited</span>
                </div>
            </div>
        </div>
    );
};

export default NavigationPanel;
