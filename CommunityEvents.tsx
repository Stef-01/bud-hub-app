import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { CommunityEvent } from '../types';
import { getCommunityEvents } from '../services/eventService';
import EventCard from './EventCard';
import { fadeInUp } from './animations';
import { CalendarIcon } from './icons/Icons';

const CommunityEvents: React.FC = () => {
    const [events, setEvents] = useState<CommunityEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const fetchedEvents = await getCommunityEvents();
                setEvents(fetchedEvents);
            } catch (error) {
                console.error("Failed to fetch community events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <motion.div variants={fadeInUp} className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <CalendarIcon className="w-7 h-7 mr-2 text-green-600" />
                Upcoming Community Events
            </h2>
            <div className="space-y-4">
                {isLoading ? (
                    <div className="bg-white p-6 rounded-xl shadow-md animate-pulse h-40"></div>
                ) : (
                    events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default CommunityEvents;
