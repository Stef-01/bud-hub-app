
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Corrected import path for Icons.
import { CheckCircleIcon } from './icons/Icons';

interface CompletionToastProps {
  message: string;
  show: boolean;
  onDismiss: () => void;
}

const CompletionToast: React.FC<CompletionToastProps> = ({ message, show, onDismiss }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-10 right-10 bg-green-600 text-white p-4 rounded-xl shadow-2xl flex items-center z-50"
        >
          <CheckCircleIcon className="w-6 h-6 mr-3" />
          <p className="font-semibold">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompletionToast;