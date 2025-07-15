import React, { useState, useMemo } from 'react';
import Footer from '../components/Footer';
import ShowCard from '../components/ShowCard';
import { airingNowShows } from '../constants';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const Calendar: React.FC = () => {
  const today = days[new Date().getDay() -1];
  const [activeDay, setActiveDay] = useState(today);

  const showsForDay = useMemo(() => {
    // This is a mock shuffle based on day to simulate different shows
    return [...airingNowShows].sort(() => 0.5 - days.indexOf(activeDay) + Math.random()).slice(0, 14);
  }, [activeDay]);

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <div className="container mx-auto px-4 md:px-12 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center">Calendario de Emisiones</h1>
        <p className="text-gray-400 text-center mb-8">Descubre qué dramas se emiten cada día de la semana.</p>

        <div className="flex justify-center mb-8 border-b border-gray-800">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-3 text-sm md:text-base font-semibold border-b-2 transition-all duration-300 ${
                activeDay === day
                  ? 'border-pink-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-6">
            Programación para el <span className="text-pink-400">{activeDay}</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
            {showsForDay.map(show => (
              <ShowCard key={`${activeDay}-${show.id}`} show={show} isExploreView={true} />
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Calendar; 