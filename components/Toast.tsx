import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onDismiss]);

  const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white max-w-sm z-50 transition-all duration-300 transform";
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500"
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]} animate-fade-in`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onDismiss} className="ml-4 text-white hover:bg-white/20 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
