import React from 'react';
import { motion } from 'framer-motion';
import type { CommunityEvent } from '../types';
import { useCountdown } from './hooks/useCountdown';
import { fadeInUp } from './animations';
import { CalendarIcon, LocationIcon, ExternalLinkIcon } from './icons/Icons';

interface EventCardProps {
  event: CommunityEvent;
}

const CountdownSegment: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl font-bold text-gray-800">{String(value).padStart(2, '0')}</span>
    <span className="text-xs text-gray-500 uppercase">{label}</span>
  </div>
);

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const timeLeft = useCountdown(event.date);
  const eventDate = new Date(event.date);

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row"
    >
      <div className="bg-green-50 p-4 flex sm:flex-col items-center justify-center sm:w-32">
        <span className="text-4xl">{event.icon}</span>
        <div className="ml-4 sm:ml-0 sm:mt-2 text-center">
          <p className="font-bold text-green-800 text-lg">{eventDate.toLocaleDateString('en-US', { day: 'numeric' })}</p>
          <p className="text-green-700 text-sm">{eventDate.toLocaleDateString('en-US', { month: 'short' })}</p>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="font-bold text-xl text-gray-900">{event.title}</h3>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <LocationIcon className="w-4 h-4 mr-1.5" />
          {event.location}
        </div>
        <p className="text-gray-700 mt-2 text-sm">{event.description}</p>
        
        <div className="flex justify-between items-end mt-4">
            <div className="flex gap-4">
                <CountdownSegment value={timeLeft.days} label="Days" />
                <CountdownSegment value={timeLeft.hours} label="Hours" />
                <CountdownSegment value={timeLeft.minutes} label="Mins" />
            </div>
            {event.url && (
                <a 
                    href={event.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-800 bg-green-100 rounded-full hover:bg-green-200 transition"
                >
                    Learn More
                    <ExternalLinkIcon className="w-3 h-3" />
                </a>
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
