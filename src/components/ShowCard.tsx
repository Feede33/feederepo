import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Show } from '../types';
import { StarIcon } from '../constants';
import { useAppContext } from '../context/AppContext';

interface ShowCardProps {
  show: Show;
  isExploreView?: boolean;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, isExploreView = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addFavorite, removeFavorite, addWatchlist, removeWatchlist, isInFavorites, isInWatchlist, addRecentlyViewed } = useAppContext();
  
  const isFavorite = isInFavorites(show.id);
  const isInWatchList = isInWatchlist(show.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(show.id);
    } else {
      addFavorite(show);
    }
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWatchList) {
      removeWatchlist(show.id);
    } else {
      addWatchlist(show);
    }
  };

  const handleCardClick = () => {
    addRecentlyViewed(show);
  };

  return (
    <Link 
      to={`/show/${show.id}`} 
      className={`${isExploreView ? 'w-full' : 'flex-shrink-0 w-[280px]'} group cursor-pointer block`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500 ${isHovered ? 'animate-pulse-slow' : ''}`}></div>
        
        {/* Card Container */}
        <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-900 card-hover">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton"></div>
          )}
          
          {/* Main Image */}
          <img 
            src={show.imageUrl} 
            alt={show.title} 
            className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.jpg';
              target.alt = `Imagen no disponible para ${show.title}`;
            }}
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 via-transparent to-pink-900/0 group-hover:from-purple-900/20 group-hover:to-pink-900/20 transition-all duration-500"></div>
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <div className="flex flex-wrap gap-2">
              {show.isNew && (
                <span className="badge bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold animate-pulse-slow">
                  NUEVO
                </span>
              )}
              {show.episodes && (
                <span className="badge glass-dark text-white text-xs">
                  {show.episodes} EP
                </span>
              )}
            </div>
            
            {show.language && (
              <span className="badge bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold">
                {show.language}
              </span>
            )}
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="glass-dark px-3 py-1.5 rounded-full flex items-center space-x-1.5 shadow-lg">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-bold text-sm">{show.rating.toFixed(1)}</span>
            </div>
          </div>
          
          {/* Content Overlay - Desktop Only */}
          <div className="absolute inset-x-0 bottom-0 p-6 z-10 hidden md:block">
            {/* Title and Info */}
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white text-xl font-bold mb-2 line-clamp-2 drop-shadow-lg">
                {show.title}
              </h3>
              
              {/* Additional Info - Hidden by default, shown on hover */}
              <div className="space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                {show.genre && (
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {Array.isArray(show.genre) ? show.genre.join(' • ') : show.genre}
                  </p>
                )}
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-2">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addRecentlyViewed(show);
                      window.location.href = `/show/${show.id}`;
                    }}
                    aria-label={`Ver detalles de ${show.title}`}
                    className="flex-1 bg-white text-black font-bold py-2.5 px-4 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      <span>Ver</span>
                    </span>
                  </button>
                  
                  <button 
                    onClick={handleFavoriteClick}
                    aria-label={isFavorite ? `Quitar ${show.title} de favoritos` : `Agregar ${show.title} a favoritos`}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all transform hover:scale-110 ${
                      isFavorite 
                        ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' 
                        : 'glass-dark text-white hover:bg-white/20'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={handleWatchlistClick}
                    aria-label={isInWatchList ? `Quitar ${show.title} de la lista de seguimiento` : `Agregar ${show.title} a la lista de seguimiento`}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all transform hover:scale-110 ${
                      isInWatchList 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                        : 'glass-dark text-white hover:bg-white/20'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Preview on Hover - Desktop Only */}
          <div className={`absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-6 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 pointer-events-none md:pointer-events-auto ${
            isHovered ? 'md:backdrop-blur-sm' : ''
          }`}>
            <div className="text-center space-y-4 transform scale-95 group-hover:scale-100 transition-transform duration-300">
              {/* Título y rating eliminados */}
              
              <div className="flex items-center justify-center space-x-4 text-sm">
                {show.year && (
                  <>
                    <span className="text-gray-300">{show.year}</span>
                  </>
                )}
                {show.episodes && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-300">{show.episodes} episodios</span>
                  </>
                )}
              </div>

              {/* Botón "Ver Ahora" eliminado */}
              
              {show.genre && (
                <div className="flex flex-wrap justify-center gap-2">
                  {(Array.isArray(show.genre) ? show.genre : [show.genre]).slice(0, 3).map((g, i) => (
                    <span key={i} className="badge glass text-white text-xs">
                      {g}
                    </span>
                  ))}
                </div>
              )}
              

            </div>
          </div>
        </div>
        
        {/* Mobile-only bottom info */}
        <div className="md:hidden mt-3 px-1">
          <h3 className="text-white font-semibold text-base line-clamp-1">{show.title}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400 text-sm">{show.rating.toFixed(1)}</span>
            </div>
            {show.year && (
              <span className="text-gray-500 text-sm">• {show.year}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;
