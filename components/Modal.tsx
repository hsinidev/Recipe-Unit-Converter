
import React from 'react';
import { XMarkIcon } from './icons/XMarkIcon';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-lg bg-gray-800 border border-white/10 rounded-xl shadow-2xl p-6 text-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full"
            aria-label="Close modal"
          >
            <XMarkIcon />
          </button>
        </div>
        <div className="prose prose-invert prose-p:text-gray-300 max-w-none">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
