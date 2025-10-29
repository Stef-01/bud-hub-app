import React from 'react';
import { motion } from 'framer-motion';
// FIX: Correct the import path for types.
import type { Plant } from '../types';
import { fadeInUp } from './animations';

interface PlantCardProps {
  plant: Plant;
  isSelected: boolean;
  onClick: (plant: Plant) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, isSelected, onClick }) => {
  const cardVariants = {
    selected: {
      scale: 1.05,
      borderColor: '#22c55e', // green-500
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    deselected: {
      scale: 1,
      borderColor: '#e5e7eb', // gray-200
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="flex-shrink-0 w-40"
    >
      <motion.div
        onClick={() => onClick(plant)}
        className="bg-white p-4 rounded-xl cursor-pointer border-2 transition-colors"
        variants={cardVariants}
        animate={isSelected ? 'selected' : 'deselected'}
        transition={{ duration: 0.2 }}
      >
        <div className="text-4xl text-center mb-2">{plant.icon}</div>
        <h3 className="font-bold text-center text-gray-800 truncate">{plant.name}</h3>
        <p className="text-xs text-center text-gray-500 italic truncate">{plant.species}</p>
      </motion.div>
    </motion.div>
  );
};

export default PlantCard;