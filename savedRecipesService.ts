import type { RecipeIdea } from '../types';

const SAVED_RECIPES_KEY = 'vibeGardenSavedRecipes';

// Load saved recipes from localStorage
function getSavedRecipes(): RecipeIdea[] {
  try {
    const saved = localStorage.getItem(SAVED_RECIPES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error parsing saved recipes from localStorage", error);
    return [];
  }
}

// Save a recipe to localStorage
function saveRecipe(recipeToSave: RecipeIdea): void {
  const savedRecipes = getSavedRecipes();
  // Avoid duplicates
  if (!savedRecipes.some(r => r.id === recipeToSave.id)) {
    const updatedRecipes = [...savedRecipes, { ...recipeToSave, isSaved: true }];
    localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(updatedRecipes));
  }
}

// Unsave a recipe from localStorage
function unsaveRecipe(recipeId: string): void {
  const savedRecipes = getSavedRecipes();
  const updatedRecipes = savedRecipes.filter(r => r.id !== recipeId);
  localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(updatedRecipes));
}

// Check if a recipe is already saved
function isRecipeSaved(recipeId: string): boolean {
  const savedRecipes = getSavedRecipes();
  return savedRecipes.some(r => r.id === recipeId);
}

export { getSavedRecipes, saveRecipe, unsaveRecipe, isRecipeSaved };
