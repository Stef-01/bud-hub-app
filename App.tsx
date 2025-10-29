import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import type { Plant, Weather, Task, UserProgress, Alert, TaskType } from './types';
import { ALL_PLANTS, HEATWAVE_ALERT } from './constants';
import { getMockWeather } from './services/weatherService';
import { generateTasksForAllPlants } from './services/taskService';

import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import PlantCard from './components/PlantCard';
import TaskCard from './components/TaskCard';
import AlertBanner from './components/AlertBanner';
import GeminiTip from './components/GeminiTip';
import FeedbackModal from './components/FeedbackModal';
import CompletionToast from './components/CompletionToast';
import ParticleBurst from './components/ParticleBurst';
import CookingInspoCorner from './components/CookingInspoCorner';
import RecipeModal from './components/RecipeModal';
import CommunityEvents from './components/CommunityEvents';
import SavedRecipesModal from './components/SavedRecipesModal'; // New Import
import { CookbookIcon } from './components/icons/Icons'; // New Import

import { staggerContainer, fadeInUp } from './components/animations';

// Constants
const XP_PER_TASK = 15;
const XP_PER_LEVEL = 100;

const App: React.FC = () => {
  // State
  const [userProgress, setUserProgress] = useState<UserProgress>({ level: 1, xp: 0, streak: 5 });
  const [weather, setWeather] = useState<Weather | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<string>(ALL_PLANTS[0].id);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  
  // UI State
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [showRecipeModal, setShowRecipeModal] = useState<boolean>(false);
  const [showSavedRecipesModal, setShowSavedRecipesModal] = useState<boolean>(false); // New State
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showBurst, setShowBurst] = useState<string>(''); // taskId for burst effect

  // Derived State
  const selectedPlant = useMemo(() => ALL_PLANTS.find(p => p.id === selectedPlantId) || null, [selectedPlantId]);
  const incompleteTasks = useMemo(() => tasks.filter(t => !t.completed), [tasks]);
  const completedTasks = useMemo(() => tasks.filter(t => t.completed), [tasks]);
  
  // Data fetching on mount
  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await getMockWeather({ city: 'Logan', state: 'QLD' });
      setWeather(weatherData);

      const isHeatwave = weatherData.forecast.some(day => day.maxTempC >= 31);
      setShowAlert(isHeatwave);

      const initialTasks = await generateTasksForAllPlants(ALL_PLANTS, weatherData);
      setTasks(initialTasks);
    };
    fetchData();
  }, []);

  const groupedTasks = useMemo(() => {
    return incompleteTasks.reduce((acc, task) => {
      const key = task.type;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(task);
      return acc;
    }, {} as Record<TaskType, Task[]>);
  }, [incompleteTasks]);

  const taskGroupOrder: TaskType[] = ['Watering', 'Harvesting', 'Fertilizing', 'Maintenance', 'Pest Control'];

  // Handlers
  const handleTaskComplete = (taskId: string) => {
    setTasks(prevTasks => prevTasks.map(t => t.id === taskId ? { ...t, completed: true } : t));
    
    // Animate and show toast
    setShowBurst(taskId);
    setToastMessage(`Task complete! +${XP_PER_TASK} XP`);

    // Update user progress
    setUserProgress(prev => {
      const newXp = prev.xp + XP_PER_TASK;
      if (newXp >= XP_PER_LEVEL) {
        setToastMessage(`Level up! You are now level ${prev.level + 1}!`);
        return { ...prev, level: prev.level + 1, xp: newXp % XP_PER_LEVEL };
      }
      return { ...prev, xp: newXp };
    });
  };
  
   const handlePlantCardClick = (plant: Plant) => {
    setSelectedPlantId(plant.id);
    if (plant.category !== 'Ornamental') {
      setShowRecipeModal(true);
    }
  };

  const handleAddNewTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Header userProgress={userProgress} xpForNextLevel={XP_PER_LEVEL} />

        {showAlert && <AlertBanner alert={HEATWAVE_ALERT} />}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WeatherCard weather={weather} />
            <GeminiTip weather={weather} plant={selectedPlant} />
          </div>

          <div className="space-y-6">
            <motion.div variants={staggerContainer} initial="hidden" animate="show">
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-gray-800 mb-3">Your Garden</motion.h2>
              <div className="flex gap-3 pb-3 overflow-x-auto custom-scrollbar">
                {ALL_PLANTS.map(plant => (
                  <PlantCard
                    key={plant.id}
                    plant={plant}
                    isSelected={selectedPlantId === plant.id}
                    onClick={() => handlePlantCardClick(plant)}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={staggerContainer} initial="hidden" animate="show">
                <motion.div variants={fadeInUp} className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl font-bold text-gray-800">Today's Tasks</h2>
                </motion.div>
                <div className="space-y-4">
                  {taskGroupOrder.map(groupKey => {
                    const tasksInGroup = groupedTasks[groupKey];
                    if (!tasksInGroup || tasksInGroup.length === 0) return null;

                    return (
                      <div key={groupKey}>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">{groupKey}</h3>
                        <div className="flex gap-4 pb-4 overflow-x-auto custom-scrollbar relative">
                          <AnimatePresence>
                            {tasksInGroup.map(task => (
                              <div key={task.id} className="relative">
                                <TaskCard
                                  task={task}
                                  plant={ALL_PLANTS.find(p => p.id === task.plantId)}
                                  onComplete={handleTaskComplete}
                                  onNewTask={handleAddNewTask}
                                />
                                {showBurst === task.id && <ParticleBurst onComplete={() => setShowBurst('')} />}
                              </div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                  
                  {incompleteTasks.length === 0 && (
                      <div className="w-full text-center py-10 bg-white rounded-xl shadow-md">
                          <p className="font-bold text-green-700">All tasks done for today!</p>
                          <p className="text-sm text-gray-500 mt-1">Great job, garden master!</p>
                      </div>
                  )}
                </div>
            </motion.div>

            {completedTasks.length > 0 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="show">
                <motion.h2 variants={fadeInUp} className="text-xl font-bold text-gray-500 mb-3">Completed</motion.h2>
                <div className="flex gap-4 pb-4 overflow-x-auto custom-scrollbar">
                  {completedTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      plant={ALL_PLANTS.find(p => p.id === task.plantId)}
                      onComplete={() => {}}
                      onNewTask={() => {}}
                    />
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </div>

        <div className="mt-6 space-y-6">
          <CookingInspoCorner />
          <CommunityEvents />
        </div>
        
        <footer className="text-center mt-12 mb-6 flex justify-center items-center gap-6">
            <button onClick={() => setShowSavedRecipesModal(true)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition">
                <CookbookIcon className="w-5 h-5" />
                My Cookbook
            </button>
            <button onClick={() => setShowFeedbackModal(true)} className="text-sm text-gray-500 hover:text-gray-700">
                Provide Feedback
            </button>
        </footer>

        <FeedbackModal show={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />
        <RecipeModal plant={selectedPlant} show={showRecipeModal} onClose={() => setShowRecipeModal(false)} />
        <SavedRecipesModal show={showSavedRecipesModal} onClose={() => setShowSavedRecipesModal(false)} />
        <CompletionToast message={toastMessage} show={!!toastMessage} onDismiss={() => setToastMessage('')} />
      </main>
    </div>
  );
};

export default App;