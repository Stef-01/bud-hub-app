import type { CommunityEvent } from '../types';
import { ALL_EVENTS } from './eventsDatabase';

// This function simulates fetching events from an API.
export const getCommunityEvents = (): Promise<CommunityEvent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sort events by date
      const sortedEvents = [...ALL_EVENTS].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      resolve(sortedEvents);
    }, 500); // Simulate network delay
  });
};
