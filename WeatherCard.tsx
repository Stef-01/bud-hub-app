

import React from 'react';
import { motion } from 'framer-motion';
// FIX: Corrected import path for types.
import type { Weather } from '../types';
import { staggerContainer, fadeInUp } from './animations';
// FIX: Corrected import path for Icons.
import { SunIcon, RainIcon } from './icons/Icons';

const WeatherCard: React.FC<{ weather: Weather | null }> = ({ weather }) => {
  if (!weather) {
    return <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse h-64"></div>;
  }

  const getIcon = (condition: string) => {
    if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('showers')) {
      return <RainIcon className="w-8 h-8 text-blue-500" />;
    }
    return <SunIcon className="w-8 h-8 text-yellow-500" />;
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
    >
      <motion.div variants={fadeInUp}>
        <h2 className="text-2xl font-bold text-gray-800">Weather for {weather.location.name}</h2>
        <div className="flex items-center mt-2">
          <p className="text-5xl font-bold text-gray-900">{weather.current.tempC}°</p>
          <div className="ml-4">
            <p className="text-lg text-gray-700">{weather.current.condition}</p>
            <p className="text-sm text-gray-500">Humidity: {weather.current.humidity}%</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">This Week's Forecast</h3>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 text-center">
          {weather.forecast.map((day) => (
            <div key={day.day} className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
              <p className="font-bold text-sm text-gray-800">{day.day.substring(0, 3)}</p>
              <div className="my-1">{getIcon(day.condition)}</div>
              <p className="text-sm text-gray-700">{day.maxTempC}°</p>
              <p className="text-xs text-gray-500">{day.minTempC}°</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherCard;