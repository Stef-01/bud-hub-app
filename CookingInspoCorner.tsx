import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { RecipeIdea } from '../types';
import { getIndianRecipeInspiration, getRecipeImage } from '../services/geminiService';
import { saveRecipe, unsaveRecipe, isRecipeSaved } from '../services/savedRecipesService'; // New import
import { RecipeIcon, ImagePlaceholderIcon, StarIcon, StarFilledIcon } from './icons/Icons';
import { fadeInUp } from './animations';

const CookingInspoCorner: React.FC = () => {
    const [ideas, setIdeas] = useState<RecipeIdea[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleToggleSave = useCallback((ideaToToggle: RecipeIdea) => {
        setIdeas(currentIdeas => 
            currentIdeas.map(idea => {
                if (idea.id === ideaToToggle.id) {
                    const isNowSaved = !idea.isSaved;
                    if (isNowSaved) {
                        saveRecipe(idea);
                    } else {
                        unsaveRecipe(idea.id);
                    }
                    return { ...idea, isSaved: isNowSaved };
                }
                return idea;
            })
        );
    }, []);

    useEffect(() => {
        const fetchInspiration = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const textIdeas = await getIndianRecipeInspiration();
                const ideasWithSaveState = textIdeas.map(idea => ({ ...idea, isSaved: isRecipeSaved(idea.id) }));
                
                const ideasWithPlaceholders = ideasWithSaveState.map(idea => ({ ...idea, imageUrl: undefined }));
                setIdeas(ideasWithPlaceholders);

                for (let i = 0; i < ideasWithSaveState.length; i++) {
                    const idea = ideasWithSaveState[i];
                    // The service will now handle caching internally
                    const imageUrl = await getRecipeImage(idea);
                    setIdeas(currentIdeas => 
                        currentIdeas.map((currentIdea) => 
                            currentIdea.id === idea.id ? { ...currentIdea, imageUrl } : currentIdea
                        )
                    );
                }

            } catch (err) {
                // The service now throws a user-friendly message
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchInspiration();
    }, []);

    const loadedIdeas = ideas.filter(idea => idea.imageUrl);

    return (
        <motion.div variants={fadeInUp} className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <RecipeIcon className="w-7 h-7 mr-2 text-green-600" />
                Endless Cooking Inspiration
            </h2>
            <div className="relative w-full h-80 bg-gray-100 rounded-xl shadow-lg overflow-hidden group">
                {isLoading && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
                        <ImagePlaceholderIcon className="w-16 h-16 text-gray-400 animate-pulse"/>
                        <p className="text-gray-500 mt-2">Gathering fresh ideas...</p>
                    </div>
                )}
                {error && (
                     <div className="absolute inset-0 flex items-center justify-center bg-red-50 text-center p-4">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}
                {!isLoading && !error && loadedIdeas.length > 0 && (
                    <div className="absolute inset-0 flex items-center group-hover:[animation-play-state:paused]">
                        <div className="flex animate-infinite-scroll">
                            {[...loadedIdeas, ...loadedIdeas].map((idea, index) => (
                                <div key={`${idea.id}-${index}`} className="w-72 h-72 mx-4 flex-shrink-0 relative rounded-xl overflow-hidden shadow-xl">
                                    <img src={idea.imageUrl} alt={idea.dishName} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                                        <h3 className="text-white text-xl font-bold">{idea.dishName}</h3>
                                        <p className="text-gray-200 text-xs mt-1">{idea.shortDescription}</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggleSave(idea)}
                                        className="absolute top-2 right-2 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition"
                                        aria-label={idea.isSaved ? 'Unsave recipe' : 'Save recipe'}
                                    >
                                        {idea.isSaved ? (
                                            <StarFilledIcon className="w-5 h-5 text-yellow-400" />
                                        ) : (
                                            <StarIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default CookingInspoCorner;