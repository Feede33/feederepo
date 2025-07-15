import React from 'react';
import { Show } from '@/types';
import { Link } from 'react-router-dom';

interface RelatedShowsProps {
  shows: Show[];
}

const RelatedShows: React.FC<RelatedShowsProps> = ({ shows }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Contenido Relacionado</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {shows.map((show) => (
          <Link 
            key={show.id} 
            to={`/show/${show.id}`}
            className="group"
          >
            <div className="relative rounded-lg overflow-hidden aspect-[2/3]">
              <img 
                src={show.imageUrl} 
                alt={show.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-3">
                  <h3 className="text-white font-medium text-sm">{show.title}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-blue-400 text-xs font-bold">{show.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedShows; 