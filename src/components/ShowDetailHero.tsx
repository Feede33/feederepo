import React from 'react';
import { Show } from '@/types';

interface ShowDetailHeroProps {
  show: Show;
}

const ShowDetailHero: React.FC<ShowDetailHeroProps> = ({ show }) => {
  return (
    <div className="relative w-full">
      <div 
        className="w-full h-[50vh] bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(16,16,16,1)), url(${show.imageUrl})` 
        }}
      />
      <div className="container mx-auto px-4 -mt-32 relative z-10 flex flex-col md:flex-row">
        <div className="w-48 h-72 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
          <img src={show.imageUrl} alt={show.title} className="w-full h-full object-cover" />
        </div>
        <div className="mt-6 md:mt-0 md:ml-8 flex-grow">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{show.title}</h1>
          <div className="flex items-center mt-2 text-sm text-gray-400">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-2">
              {show.rating.toFixed(1)}
            </span>
            <span>2023</span>
            <span className="mx-2">•</span>
            <span>16+</span>
            <span className="mx-2">•</span>
            <span>Drama</span>
            <span className="mx-2">•</span>
            <span>{show.language || 'Coreano'}</span>
          </div>
          <p className="mt-4 text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies 
            tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, nisl 
            eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Ver Ahora
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              Añadir a Mi Lista
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetailHero; 