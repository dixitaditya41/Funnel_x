import React from 'react';

const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    required = false,
    className = ''
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-semibold text-stadium-300 mb-2">
                    {label} {required && <span className="text-red-card">*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`
          w-full px-4 py-3 rounded-lg
          bg-stadium-800 border-2 
          ${error ? 'border-red-card' : 'border-stadium-700 focus:border-pitch-600'}
          text-white placeholder-stadium-500
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-pitch-600/50
        `}
            />
            {error && (
                <p className="mt-2 text-sm text-red-card flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
