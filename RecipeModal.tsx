import React, { useState, useEffect } from 'react';
// FIX: Import the `Variants` type from framer-motion to correctly type the animation objects.
import { motion, AnimatePresence, type Variants } from 'framer-motion';
// FIX: Correct the import path for types.
import type { Plant, Recipe } from '../types';
import { getRecipesForPlant } from '../services/geminiService';
// FIX: Correct the import path for icons.
import { RecipeIcon, CloseIcon } from './icons/Icons';

interface RecipeModalProps {
  plant: Plant | null;
  show: boolean;
  onClose: () => void;
}

// FIX: Explicitly type animation objects with `Variants`. This allows TypeScript to correctly
// infer literal types like `type: 'spring'` within the transition object, resolving the type error.
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

const RecipeModal: React.FC<RecipeModalProps> = ({ plant, show, onClose }) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (show && plant) {
      const fetchRecipes = async () => {
        setIsLoading(true);
        setError(null);
        setRecipes(null);
        try {
          const newRecipes = await getRecipesForPlant(plant);
          setRecipes(newRecipes);
        } catch (e) {
          setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchRecipes();
    }
  }, [show, plant]);

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
            className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                    <RecipeIcon className="w-6 h-6 text-green-700" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Recipe Ideas</h2>
                    {plant && <p className="text-gray-500">Featuring your {plant.name}!</p>}
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

            <div className="mt-4">
              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Finding delicious ideas...</p>
                </div>
              )}
              {error && (
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <p className="font-semibold text-red-700">Oops!</p>
                  <p className="text-red-600 mt-1">{error}</p>
                </div>
              )}
              {recipes && recipes.length > 0 && (
                <div className="space-y-4">
                  {recipes.map((recipe, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900">{recipe.name}</h3>
                      <p className="text-gray-600 mt-1">{recipe.description}</p>
                    </div>
                  ))}
                </div>
              )}
               {recipes && recipes.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-600">No specific recipes found for this plant in our database yet.</p>
                </div>
               )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecipeModal;