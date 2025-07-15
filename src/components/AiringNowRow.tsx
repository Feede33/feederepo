
import React, { useState, useEffect, useMemo } from 'react';
import { Show } from '../types';
import ShowRow from './ShowRow';

interface AiringNowRowProps {
  title: string;
  shows: Show[];
  animate?: boolean;
}

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const AiringNowRow: React.FC<AiringNowRowProps> = ({ title, shows, animate = false }) => {
  const [activeDay, setActiveDay] = useState('Lunes');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animate) {
      setIsVisible(true);
    }
  }, [animate]);

  // In a real app, you'd filter shows based on the day. 
  // Here, we'll just shuffle them based on the selected day to simulate a changing list.
  const filteredShows = useMemo(() => {
    // Simple deterministic shuffle based on day name length
    const sortedShows = [...shows].sort((a, b) => (a.id % activeDay.length) - (b.id % activeDay.length));
    return sortedShows;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDay, shows]);

  return (
    <div className={`space-y-4 transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className={`flex items-center space-x-1 bg-[#222] p-1 rounded-full flex-wrap transition-transform duration-500 ${isVisible ? 'translate-x-0' : 'translate-x-20'}`}>
          {days.map((day, index) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-3 sm:px-4 py-1.5 text-sm rounded-full transition-colors duration-200 ${
                activeDay === day ? 'bg-pink-600 text-white font-semibold' : 'text-gray-400 hover:bg-gray-700/50'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 50}ms` : '0ms' }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <ShowRow shows={filteredShows} hasTitle={false} animate={animate} />
    </div>
  );
};

export default AiringNowRow;
