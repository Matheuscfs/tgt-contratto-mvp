import React, { useEffect, useState } from 'react';
import { ToastMessage, ToastType } from '../../contexts/ToastContext';

interface ToastProps {
  toast: ToastMessage;
  removeToast: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, removeToast }) => {
  const { id, message, type } = toast;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => removeToast(id), 300); // allow for fade out animation
    }, 4700);
    return () => clearTimeout(timer);
  }, [id, removeToast]);

  const baseClasses = 'relative w-full max-w-sm p-4 rounded-lg shadow-lg flex items-center space-x-4 transition-all duration-300 ease-in-out';
  const typeClasses = {
    success: 'bg-green-50 text-green-800',
    error: 'bg-red-50 text-red-800',
    info: 'bg-blue-50 text-blue-800',
  };

  const Icon = () => {
    switch (type) {
      case 'success':
        return <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;
      case 'error':
        return <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
      case 'info':
        return <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
    }
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <Icon />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button onClick={() => removeToast(id)} className="p-1 rounded-full hover:bg-white/50" aria-label="Fechar notificação">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  );
};

export default Toast;
