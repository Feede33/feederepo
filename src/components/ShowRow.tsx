import React, { useRef, useState, useEffect } from 'react';
import ShowCard from './ShowCard';
import { Show } from '../types';

interface ShowRowProps {
  title: string;
  shows: Show[];
  subtitle?: string;
  icon?: string;
  gradient?: string;
}

const ShowRow: React.FC<ShowRowProps> = ({ 
  title, 
  shows, 
  subtitle,
  icon = '🎬',
  gradient = 'from-purple-600 to-pink-600'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        scrollElement.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [shows]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      const targetScroll = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (shows.length === 0) return null;

  return (
    <section 
      className="relative py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section Header */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Icon with gradient background */}
            <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} p-0.5 shadow-lg`}>
              <div className="w-full h-full bg-black rounded-xl flex items-center justify-center text-2xl">
                {icon}
              </div>
            </div>
            
            {/* Title and subtitle */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center space-x-2">
                <span>{title || ''}</span>
                <span className="text-sm font-normal text-gray-400">({shows.length})</span>
              </h2>
              {subtitle && (
                <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          {/* View All Link */}
          <a 
            href="#" 
            className="hidden md:flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
          >
            <span className="text-sm font-medium">Ver todo</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Shows Container */}
      <div className="relative group">
        {/* Gradient Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        {/* Navigation Buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 glass rounded-full flex items-center justify-center text-white transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            } hover:bg-white/20 hover:scale-110`}
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 glass rounded-full flex items-center justify-center text-white transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            } hover:bg-white/20 hover:scale-110`}
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Shows Scroll Container */}
        <div className="container mx-auto px-4">
          <div 
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {shows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View All Button */}
      <div className="md:hidden container mx-auto px-4 mt-4">
        <button className="w-full glass border border-white/10 py-3 rounded-xl font-medium text-white hover:bg-white/10 transition-all">
          Ver todos los {title?.toLowerCase()}
        </button>
      </div>
    </section>
  );
};

export default ShowRow;
