

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Correct the import path for types.
import type { Weather, Plant } from '../types';
// FIX: Corrected import path for geminiService from components directory.
import { getGardeningTip } from '../services/geminiService';
// FIX: Corrected import path for Icons.
import { SparklesIcon, RefreshIcon } from './icons/Icons';
import { fadeIn } from './animations';

interface GeminiTipProps {
  weather: Weather | null;
  plant: Plant | null;
}

const GeminiTip: React.FC<GeminiTipProps> = ({ weather, plant }) => {
  const [tip, setTip] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchTip = useCallback(async () => {
    if (!plant || !weather) return;

    setLoading(true);
    setError('');
    try {
      const newTip = await getGardeningTip(weather, plant);
      setTip(newTip);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, [plant, weather]);

  useEffect(() => {
    fetchTip();
  }, [fetchTip]);
  
  const handleRefresh = () => {
    fetchTip();
  };

  if (!plant) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-indigo-100 p-4 sm:p-6 rounded-xl shadow-lg text-center text-gray-600">
        <p>Select a plant from your garden to get a personalized tip!</p>
      </div>
    );
  }

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="show" className="bg-gradient-to-br from-purple-50 to-indigo-100 p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-purple-800 flex items-center">
            <SparklesIcon className="w-6 h-6 mr-2" />
            Vibe-Check Tip for your {plant.name}
          </h3>
        </div>
        <button onClick={handleRefresh} disabled={loading} className="p-1 rounded-full hover:bg-purple-200 transition disabled:opacity-50 disabled:cursor-not-allowed">
            <RefreshIcon className={`w-5 h-5 text-purple-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <div className="mt-3 text-purple-900 min-h-[4rem] flex items-center">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
              <p className="italic">Checking the cosmic garden vibes...</p>
              <div className="w-full bg-purple-200 rounded-full h-1.5 mt-2">
                <div className="bg-purple-500 h-1.5 rounded-full animate-pulse w-3/4"></div>
              </div>
            </motion.div>
          )}
          {error && (
            <motion.p key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-600">
              {error}
            </motion.p>
          )}
          {!loading && !error && tip && (
             <motion.p key="tip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-lg font-medium">
              "{tip}"
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default GeminiTip;