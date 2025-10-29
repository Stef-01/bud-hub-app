// FIX: Correct the import path for types.
import type { Task, Plant, Weather, TaskType } from '../types';

type TaskGenerator = (plant: Plant, weather: Weather) => Omit<Task, 'id' | 'completed' | 'isAlternative'> | null;

const taskRules: TaskGenerator[] = [
    // Rule 1: Heatwave watering
    (plant, weather) => {
        const isHeatwaveComing = weather.forecast.some(day => day.maxTempC >= 31);
        if (isHeatwaveComing) {
            return {
                plantId: plant.id,
                title: `Deep Water ${plant.name}`,
                type: 'Watering',
                description: `With temperatures forecast to be over 30°C, a deep watering now will build soil moisture and prevent heat stress.`,
                movementProfile: 'Medium',
                priority: 'High',
            };
        }
        return null;
    },
    // Rule 2: Side-dress fruiting vegetables
    (plant, weather) => {
        if (plant.category === 'Vegetable' && plant.phenology === 'Fruiting') {
            return {
                plantId: plant.id,
                title: `Fertilize ${plant.name}`,
                type: 'Fertilizing',
                description: `Your ${plant.name} is fruiting, which uses a lot of energy. Side-dress with a balanced fertilizer to support healthy development.`,
                movementProfile: 'Low',
                priority: 'Medium',
            };
        }
        return null;
    },
    // Rule 3: Check for ripe fruit
    (plant, weather) => {
        if (plant.phenology === 'Fruiting' && (plant.category === 'Fruit' || plant.category === 'Vegetable')) {
             return {
                plantId: plant.id,
                title: `Harvest from ${plant.name}`,
                type: 'Harvesting',
                description: `Your ${plant.name} is in its fruiting stage. Check for ripe produce to harvest for the best flavor and to encourage more production.`,
                movementProfile: 'Low',
                priority: 'Medium',
            };
        }
        return null;
    },
    // Rule 4: Pest scouting for all plants
    (plant, weather) => {
        // Add this task less frequently, e.g. based on day of week, to avoid clutter.
        if (new Date().getDay() === 1) { // Only on Mondays
            return {
                plantId: plant.id,
                title: `Pest Scout ${plant.name}`,
                type: 'Pest Control',
                description: `Take a close look under the leaves of your ${plant.name} for common pests like aphids or spider mites. Early detection is key!`,
                movementProfile: 'Low',
                priority: 'Low',
            };
        }
        return null;
    },
    // Rule 5: Support for vining plants
    (plant, weather) => {
         if (plant.name === 'Tomato' || plant.name === 'Zucchini' || plant.name === 'Snake Beans') {
              return {
                plantId: plant.id,
                title: `Check Supports for ${plant.name}`,
                type: 'Maintenance',
                description: `As your ${plant.name} grows, ensure its stakes or trellis are secure and that ties are not too tight, which can damage the stems.`,
                movementProfile: 'Medium',
                priority: 'Medium',
            };
         }
         return null;
    }
];


// This function simulates generating tasks based on plants and weather
export const generateTasksForAllPlants = (plants: Plant[], weather: Weather | null): Promise<Task[]> => {
    return new Promise((resolve) => {
        if (!weather) {
            resolve([]);
            return;
        }

        setTimeout(() => {
            const allTasks: Task[] = [];
            const addedTasks = new Set<string>(); // To prevent duplicate task types for the same plant

            plants.forEach(plant => {
                taskRules.forEach(rule => {
                    const taskTemplate = rule(plant, weather);
                    if (taskTemplate) {
                        const taskKey = `${plant.id}-${taskTemplate.title}`;
                        if (!addedTasks.has(taskKey)) {
                            allTasks.push({
                                ...taskTemplate,
                                id: `task-${plant.id}-${Math.random()}`,
                                completed: false,
                            });
                            addedTasks.add(taskKey);
                        }
                    }
                });
            });
            
            resolve(allTasks);
        }, 800); // Simulate network delay
    });
};