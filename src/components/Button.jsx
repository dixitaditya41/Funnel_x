import React from 'react';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    className = '',
    type = 'button',
    loading = false
}) => {
    const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

    const variants = {
        primary: 'bg-pitch-600 hover:bg-pitch-700 text-white shadow-lg shadow-pitch-900/50',
        secondary: 'bg-stadium-700 hover:bg-stadium-600 text-white shadow-lg shadow-black/50',
        danger: 'bg-red-card hover:bg-red-600 text-white shadow-lg shadow-red-900/50',
        outline: 'border-2 border-pitch-600 text-pitch-500 hover:bg-pitch-600 hover:text-white',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
