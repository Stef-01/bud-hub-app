

import React from 'react';
// FIX: Correct the import path for types.
import type { UserProgress } from '../types';
// FIX: Correct the import path for icons.
import { FlameIcon } from './icons/Icons';
import { motion } from 'framer-motion';

interface HeaderProps {
    userProgress: UserProgress;
    xpForNextLevel: number;
}

const Header: React.FC<HeaderProps> = ({ userProgress, xpForNextLevel }) => {
    const progressPercent = (userProgress.xp / xpForNextLevel) * 100;

  return (
    <header className="p-4 bg-white shadow-md rounded-xl mb-6">
        <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-gray-800">
                <span className="text-green-600">Logan</span> Garden Buddy
            </h1>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-orange-500">
                    <FlameIcon className="w-6 h-6" />
                    <span className="font-bold text-xl">{userProgress.streak} Day Streak</span>
                </div>
            </div>
        </div>
      
        <div>
            <div className="flex justify-between items-end mb-1">
                <span className="font-bold text-green-700">Level {userProgress.level}</span>
                <span className="text-sm font-medium text-gray-500">{userProgress.xp} / {xpForNextLevel} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <motion.div
                    className="bg-green-500 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    </header>
  );
};

export default Header;