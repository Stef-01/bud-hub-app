export type DayOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
export type TaskType = 'Watering' | 'Fertilizing' | 'Harvesting' | 'Pest Control' | 'Maintenance';

export interface Plant {
  id: string;
  name: string;
  species: string;
  icon: string;
  phenology: string;
  category: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'Critical' | 'Warning' | 'Info';
}

export interface Weather {
  location: {
    name: string;
    region: string;
  };
  current: {
    tempC: number;
    humidity: number;
    precipMM: number;
    condition: string;
    windKPH: number;
  };
  forecast: {
    day: DayOfWeek;
    maxTempC: number;
    minTempC: number;
    chanceOfRain: number;
    condition: string;
  }[];
}

export interface Task {
  id: string;
  plantId: string;
  title: string;
  description: string;
  type: TaskType;
  movementProfile: 'Low' | 'Medium' | 'High';
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
  isAlternative?: boolean;
}

export interface UserProgress {
  level: number;
  xp: number;
  streak: number;
}

export interface RecipeIdea {
  id: string;
  dishName: string;
  shortDescription: string;
  imageUrl?: string;
  isSaved?: boolean;
}

export interface Recipe {
    name: string;
    description: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string; // ISO string
  location: string;
  description: string;
  icon: string;
  url?: string;
}