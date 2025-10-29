import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { RecipeIdea } from '../types';
import { getSavedRecipes, unsaveRecipe } from '../services/savedRecipesService';
import { CookbookIcon, CloseIcon, StarFilledIcon } from './icons/Icons';

interface SavedRecipesModalProps {
  show: boolean;
  onClose: () => void;
}

const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalContent: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

const SavedRecipesModal: React.FC<SavedRecipesModalProps> = ({ show, onClose }) => {
  const [savedRecipes, setSavedRecipes] = useState<RecipeIdea[]>([]);

  useEffect(() => {
    if (show) {
      setSavedRecipes(getSavedRecipes());
    }
  }, [show]);
  
  const handleUnsave = (recipeId: string) => {
    unsaveRecipe(recipeId);
    setSavedRecipes(prev => prev.filter(r => r.id !== recipeId));
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalContent}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4 flex-shrink-0">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                    <CookbookIcon className="w-6 h-6 text-green-700" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">My Cookbook</h2>
                    <p className="text-gray-500">Your saved recipe ideas</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                aria-label="Close modal"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar flex-grow">
              {savedRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedRecipes.map((recipe) => (
                    <div key={recipe.id} className="bg-gray-50 rounded-lg p-4 flex flex-col justify-between border border-gray-200">
                      <div>
                        <h3 className="font-bold text-gray-800">{recipe.dishName}</h3>
                        <p className="text-sm text-gray-600 mt-1">{recipe.shortDescription}</p>
                      </div>
                      <button 
                        onClick={() => handleUnsave(recipe.id)}
                        className="flex items-center gap-1 text-xs text-yellow-600 font-semibold mt-3 self-start hover:text-yellow-800"
                      >
                        <StarFilledIcon className="w-4 h-4 text-yellow-500" />
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <CookbookIcon className="w-16 h-16 text-gray-300 mx-auto" />
                  <p className="mt-4 font-semibold text-gray-700">Your cookbook is empty.</p>
                  <p className="text-gray-500">Star your favorite recipes from the inspiration gallery to save them here!</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SavedRecipesModal;