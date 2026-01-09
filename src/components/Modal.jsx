import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, showClose = true }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative glass-dark p-6 rounded-2xl max-w-md w-full shadow-2xl animate-bounce-goal">
                {showClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-stadium-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                {title && (
                    <h2 className="text-2xl font-display font-bold text-white mb-4">
                        {title}
                    </h2>
                )}

                <div className="text-stadium-200">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
