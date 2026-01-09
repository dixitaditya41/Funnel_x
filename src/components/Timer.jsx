import React, { useEffect, useState } from 'react';

const Timer = ({ duration, onTimeUp, onTick }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp?.();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                const newTime = prev - 1;
                onTick?.(newTime);
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, onTimeUp, onTick]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const isLowTime = timeLeft <= 300; // 5 minutes
    const isCritical = timeLeft <= 60; // 1 minute

    return (
        <div className={`glass-dark px-6 py-3 rounded-xl flex items-center gap-3 ${isCritical ? 'animate-pulse bg-red-card/20' : isLowTime ? 'bg-yellow-card/20' : ''
            }`}>
            <svg
                className={`w-6 h-6 ${isCritical ? 'text-red-card' : isLowTime ? 'text-yellow-card' : 'text-pitch-500'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <div className="font-display font-bold text-2xl">
                <span className={isCritical ? 'text-red-card' : isLowTime ? 'text-yellow-card' : 'text-white'}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
            </div>
            {isLowTime && (
                <span className={`text-sm font-semibold ${isCritical ? 'text-red-card' : 'text-yellow-card'}`}>
                    {isCritical ? 'HURRY!' : 'Low Time'}
                </span>
            )}
        </div>
    );
};

export default Timer;
