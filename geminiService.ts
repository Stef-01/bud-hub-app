import { GoogleGenAI, Type, Modality } from "@google/genai";
// FIX: Correct the import path for types.
import type { Task, Plant, Weather, RecipeIdea, Recipe } from '../types';
import { findRecipesInDatabase } from './recipeDatabase';

const CACHE_PREFIX = 'gemini-cache-';

// --- Permanent Caching Layer using LocalStorage ---

function getFromCache<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (item) {
      const { value } = JSON.parse(item);
      return value;
    }
    return null;
  } catch (error) {
    console.error("Error reading from cache:", error);
    return null;
  }
}

function setToCache<T>(key: string, value: T): void {
  try {
    const item = { value };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
  } catch (error) {
    console.error("Error writing to cache:", error);
  }
}

function getAiInstance() {
  // Create a new GoogleGenAI instance right before making an API call
  // to ensure it always uses the most up-to-date API key.
  // The API key is injected from process.env.API_KEY as per guidelines.
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export async function getAlternativeTask(originalTask: Task, plant: Plant | undefined, physicalIssue: 'knee' | 'back'): Promise<Task> {
  const cacheKey = `alt-task-${originalTask.id}-${physicalIssue}`;
  const cached = getFromCache<Task>(cacheKey);
  if (cached) return cached;

  const ai = getAiInstance();
  const model = 'gemini-2.5-flash';

  const prompt = `
    Original Task for a ${plant?.name} plant:
    Title: ${originalTask.title}
    Description: ${originalTask.description}
    Movement Profile: ${originalTask.movementProfile}

    I have a sore ${physicalIssue}. Please provide a gentler, alternative version of this gardening task.
    The alternative should still achieve the goal of the original task but with less strain.
    For example, if the task involves kneeling, suggest using a stool. If it involves heavy lifting, suggest breaking it into smaller loads.
    
    Respond in JSON format with the following structure: { "title": "...", "description": "..." }.
    The title should start with "Alternative:". The description should explain how to do the task gently.
    Do not include any other text, just the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
          },
          required: ['title', 'description'],
        }
      }
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);

    const alternativeTask: Task = {
      ...originalTask,
      id: `alt-${originalTask.id}-${Math.random()}`,
      title: parsed.title,
      description: parsed.description,
      isAlternative: true,
      movementProfile: 'Low',
    };
    setToCache(cacheKey, alternativeTask);
    return alternativeTask;
  } catch (error) {
    console.error("Error generating alternative task:", error);
    throw new Error("Could not generate an alternative task. Please try again.");
  }
}

export async function getGardeningTip(weather: Weather, plant: Plant): Promise<string> {
    const cacheKey = `tip-${plant.id}-${new Date().toISOString().split('T')[0]}`; // Daily tip
    const cached = getFromCache<string>(cacheKey);
    if (cached) return cached;

    const ai = getAiInstance();
    const model = 'gemini-2.5-flash';

    const prompt = `
    Given the current weather and a specific plant, provide a short, encouraging, and actionable gardening tip.
    Keep it under 25 words. Make it sound like a friendly, almost quirky, piece of advice.
    
    Plant: ${plant.name} (${plant.species})
    Current Stage: ${plant.phenology}
    Today's Weather: ${weather.current.tempC}°C, ${weather.current.condition}
    Forecast High: ${weather.forecast[0].maxTempC}°C
    
    Example: "Your tomatoes are loving this sun! A little seaweed tonic in their water will make them sing."
    
    Your tip:
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    const tip = response.text.trim().replace(/"/g, '');
    setToCache(cacheKey, tip);
    return tip;
  } catch (error) {
    console.error("Error generating gardening tip:", error);
    throw new Error("Could not get a gardening tip right now.");
  }
}

export async function getIndianRecipeInspiration(): Promise<RecipeIdea[]> {
    const cacheKey = 'indian-recipe-inspiration-v3';
    const cached = getFromCache<RecipeIdea[]>(cacheKey);
    if (cached) return cached;

    const ai = getAiInstance();
    const model = 'gemini-2.5-flash';

    const prompt = `
        Provide a list of 12 healthy, inspiring Indian vegetarian recipes suitable for home cooking.
        For each recipe, provide a "dishName" and a "shortDescription" (under 20 words).
        Focus on recipes that use fresh, seasonal vegetables and cover a variety of regional cuisines.

        Respond in JSON format, as an array of objects.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            dishName: { type: Type.STRING },
                            shortDescription: { type: Type.STRING },
                        },
                        required: ['dishName', 'shortDescription'],
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        const rawIdeas = JSON.parse(jsonText);
        const ideasWithIds: RecipeIdea[] = rawIdeas.map((idea: Omit<RecipeIdea, 'id'>) => ({
            ...idea,
            id: `idea-${Math.random().toString(36).substring(2, 9)}`,
        }));
        setToCache(cacheKey, ideasWithIds);
        return ideasWithIds;

    } catch (error) {
        console.error("Error fetching recipe inspiration:", error);
        throw new Error("Failed to get recipe ideas from Gemini.");
    }
}

export async function getRecipeImage(idea: RecipeIdea): Promise<string> {
    const cacheKey = `recipe-image-${idea.dishName}`;
    const cached = getFromCache<string>(cacheKey);
    if (cached) return cached;

    const ai = getAiInstance();
    const model = 'gemini-2.5-flash-image';

    const prompt = `A vibrant, appetizing photo of homemade "${idea.dishName}". The style should be bright and modern, with natural lighting. The dish should be presented beautifully in a rustic bowl or plate, ready to eat. Focus on the texture and fresh ingredients. Food photography.`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [{ text: prompt }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
                setToCache(cacheKey, imageUrl);
                return imageUrl;
            }
        }
        throw new Error("No image data found in the API response.");

    } catch (error) {
        console.error("Error generating recipe image:", error);
        if (error instanceof Error && (error.message.includes("429") || error.message.includes("RESOURCE_EXHAUSTED"))) {
            throw new Error("Image generator is busy. Please try again later.");
        }
        throw new Error("Could not create an image for this recipe.");
    }
}


export async function getRecipesForPlant(plant: Plant): Promise<Recipe[]> {
    const cacheKey = `recipes-for-${plant.id}`;
    const cached = getFromCache<Recipe[]>(cacheKey);
    if (cached) return cached;

    const dbRecipes = findRecipesInDatabase(plant.name);
    if (dbRecipes) {
        setToCache(cacheKey, dbRecipes);
        return dbRecipes;
    }

    const ai = getAiInstance();
    const model = 'gemini-2.5-flash';

    const prompt = `
        Generate a list of 3 simple and delicious South Indian recipe ideas that feature "${plant.name}" as a key ingredient.
        For each recipe, provide a "name" and a short "description".
        Respond in JSON format as an array of objects.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                          name: { type: Type.STRING },
                          description: { type: Type.STRING },
                      },
                      required: ['name', 'description']
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        const recipes: Recipe[] = JSON.parse(jsonText);
        
        setToCache(cacheKey, recipes);
        return recipes;

    } catch (error) {
        console.error("Error generating recipe ideas:", error);
        if (error instanceof Error && (error.message.includes("429") || error.message.includes("RESOURCE_EXHAUSTED"))) {
            throw new Error("Recipe generator is busy. Please try again in a moment.");
        }
        throw new Error("Could not generate a recipe for this plant.");
    }
}