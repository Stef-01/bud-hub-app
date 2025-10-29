

import React from 'react';
import { motion } from 'framer-motion';
// FIX: Corrected import path for types.
import type { Alert } from '../types';
import {fadeInUp} from './animations';

const AlertBanner: React.FC<{ alert: Alert }> = ({ alert }) => {
  const isCritical = alert.severity === 'Critical';
  const bgColor = isCritical ? 'bg-red-100 border-red-500' : 'bg-yellow-100 border-yellow-500';
  const textColor = isCritical ? 'text-red-800' : 'text-yellow-800';
  const iconColor = isCritical ? 'text-red-500' : 'text-yellow-500';

  const Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );

  return (
    <motion.div
      variants={fadeInUp}
      className={`border-l-4 p-4 rounded-md shadow-lg mb-4 ${bgColor} ${textColor}`}
      role="alert"
    >
      <div className="flex">
        <div className={`py-1 ${iconColor}`}>
          <Icon />
        </div>
        <div className="ml-3">
          <p className="font-bold">{alert.title}</p>
          <p className="text-sm">{alert.message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AlertBanner;