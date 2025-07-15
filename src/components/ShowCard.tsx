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
              e.currentTarget.src = '/placeholder.svg';
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
          
          {/* Unified Content Overlay - Desktop Only */}
          <div 
            className={`absolute inset-0 bg-black/80 flex-col justify-center items-center p-5 text-center transition-all duration-300 ease-in-out hidden md:flex md:opacity-0 md:group-hover:opacity-100 pointer-events-none md:pointer-events-auto ${isHovered ? 'md:backdrop-blur-md' : ''
            }`}>
            <div className="space-y-3 transform scale-90 group-hover:scale-100 transition-transform duration-300 ease-in-out delay-100 w-full">
              <h3 className="text-white text-2xl font-bold line-clamp-2 drop-shadow-lg">{show.title}</h3>
              
              <div className="flex items-center justify-center space-x-3 text-sm">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-semibold">{show.rating.toFixed(1)}</span>
                </div>
                {show.year && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-300">{show.year}</span>
                  </>
                )}
              </div>
              
              {show.genre && (
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
                  {(Array.isArray(show.genre) ? show.genre : [show.genre]).slice(0, 3).map((g) => (
                    <span key={g} className="text-gray-300 text-xs">
                      {g}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-3 w-full max-w-[90%] mx-auto">
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/show/${show.id}`}
                    className="flex-1 btn-primary py-2.5 font-semibold text-white rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <span>Ver Ahora</span>
                  </Link>

                  <button 
                    onClick={handleFavoriteClick}
                    className={`w-11 h-11 flex-shrink-0 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 ${isFavorite 
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
                    className={`w-11 h-11 flex-shrink-0 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 ${isInWatchList 
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
