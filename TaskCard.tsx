

import React, { useState } from 'react';
import { motion } from 'framer-motion';
// FIX: Correct the import path for types.
import type { Plant, Task } from '../types';
// FIX: Corrected import path for geminiService from components directory.
import { getAlternativeTask } from '../services/geminiService';
// FIX: Correct the import path for icons.
import { CheckIcon, BackIcon, KneeIcon, RefreshIcon } from './icons/Icons';
import { fadeInUp } from './animations';

interface TaskCardProps {
  task: Task;
  plant: Plant | undefined;
  onComplete: (taskId: string) => void;
  onNewTask: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, plant, onComplete, onNewTask }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetAlternative = async (issue: 'knee' | 'back') => {
    setIsLoading(true);
    setError(null);
    try {
      const alternativeTask = await getAlternativeTask(task, plant, issue);
      onNewTask(alternativeTask);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPlantIcon = () => {
    if (task.isAlternative) return '✨';
    if (!plant) return '🌳';
    return plant.icon;
  };

  const cardBorderColor = task.isAlternative ? 'border-purple-400' : 'border-transparent';
  const cardBgColor = task.completed ? 'bg-green-50' : 'bg-white';
  const textMuted = task.completed ? 'text-gray-400' : 'text-gray-600';

  return (
    <motion.div
      variants={fadeInUp}
      layout
      className={`p-4 rounded-xl shadow-md border-2 transition-all duration-300 w-80 flex-shrink-0 ${cardBorderColor} ${cardBgColor}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <span className="text-3xl mr-3 mt-1">{getPlantIcon()}</span>
          <div>
            <h3 className={`font-bold text-lg ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <p className={`text-sm ${textMuted}`}>{task.description}</p>
          </div>
        </div>
        {!task.completed && (
          <button
            onClick={() => onComplete(task.id)}
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-gray-300 hover:bg-green-100 hover:border-green-400 transition-colors"
            aria-label="Complete task"
          >
            <CheckIcon className="w-6 h-6 text-gray-500" />
          </button>
        )}
      </div>

      {!task.completed && !task.isAlternative && task.movementProfile !== 'Low' && !task.title.toLowerCase().includes('water') && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-2">Feeling sore? Get a gentler alternative:</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleGetAlternative('back')}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-800 bg-blue-100 rounded-full hover:bg-blue-200 transition disabled:opacity-50"
            >
              {isLoading ? <RefreshIcon className="w-4 h-4 animate-spin" /> : <BackIcon className="w-4 h-4" />}
              Sore Back
            </button>
            <button
              onClick={() => handleGetAlternative('knee')}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-orange-800 bg-orange-100 rounded-full hover:bg-orange-200 transition disabled:opacity-50"
            >
              {isLoading ? <RefreshIcon className="w-4 h-4 animate-spin" /> : <KneeIcon className="w-4 h-4" />}
              Sore Knees
            </button>
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;