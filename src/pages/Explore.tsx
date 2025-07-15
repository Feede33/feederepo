import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { filterData, exploreShows as allShows } from '../constants';
import ShowCard from '../components/ShowCard';
import Footer from '../components/Footer';

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const ExplorePage: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    'Tipo': 'Dramas',
    'Género': 'Todo',
    'SubGén': 'Todo',
    'País': 'Todo',
    'Año': 'Todo',
    'Idioma': 'Todo',
  });
  const [activeSort, setActiveSort] = useState('Más Popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [showScroll, setShowScroll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFilters = useDebounce(activeFilters, 500);

  const handleFilterClick = (category: string, value: string) => {
    setActiveFilters(prev => ({ ...prev, [category]: value }));
    setCurrentPage(1);
  };
  
  const filteredShows = useMemo(() => {
    // In a real app, you would filter based on the `debouncedFilters`
    // For this mock, we'll just shuffle the shows to simulate filtering
    return [...allShows].sort(() => 0.5 - Math.random());
  }, [debouncedFilters, activeSort]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [filteredShows]);

  const checkScrollTop = useCallback(() => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [checkScrollTop]);
  
  const showsPerPage = 28;
  const paginatedShows = useMemo(() => {
    const startIndex = (currentPage - 1) * showsPerPage;
    return filteredShows.slice(startIndex, startIndex + showsPerPage);
  }, [filteredShows, currentPage]);

  const totalPages = Math.ceil(filteredShows.length / showsPerPage);

  return (
    <div className="relative min-h-screen bg-[#101010]">
      <div className="px-4 md:px-16 py-6">
        <div className="space-y-4 mb-12 bg-[#181818] p-6 md:p-8 rounded-lg">
          {Object.entries(filterData).map(([category, options]) => (
            <div key={category} className="flex flex-col md:flex-row md:items-center md:gap-4">
              <h3 className="w-24 flex-shrink-0 text-sm font-semibold text-gray-400 mb-2 md:mb-0 md:text-right">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {options.map(option => (
                  <button
                    key={option}
                    onClick={() => handleFilterClick(category, option)}
                    className={`px-3 py-1.5 text-xs md:text-sm rounded-md transition-colors duration-200 ${
                      activeFilters[category] === option
                        ? 'bg-pink-600 text-white font-semibold'
                        : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-t border-gray-800 pt-6">
          <p className="text-pink-500 font-bold text-sm mb-4 md:mb-0">{filteredShows.length} resultados</p>
          <div className="flex gap-6 md:gap-8 text-gray-400 font-semibold text-sm">
            {['Actualización', 'Más Popular', 'Calificación'].map(sortOption => (
              <button
                key={sortOption}
                onClick={() => {
                  setActiveSort(sortOption);
                  setCurrentPage(1);
                }}
                className={`relative pb-1 transition-colors ${activeSort === sortOption ? 'text-white' : 'hover:text-white'}`}
              >
                {sortOption}
                {activeSort === sortOption && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 rounded-full" />}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <span>{currentPage} / {totalPages} páginas</span>
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1 hover:text-white disabled:text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1 hover:text-white disabled:text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-4 gap-y-6">
            {paginatedShows.map(show => (
              <ShowCard key={show.id} show={show} isExploreView={true} />
            ))}
          </div>
        )}

        <div className="flex justify-center items-center mt-12 space-x-1 md:space-x-2">
           <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-2 text-sm bg-[#2a2a2a] rounded-md hover:bg-[#3a3a3a] text-gray-300 disabled:opacity-50"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
           {[...Array(totalPages).keys()].map(page => (
               <button key={page + 1} onClick={() => setCurrentPage(page + 1)} className={`px-4 py-2 text-sm font-semibold rounded-md ${currentPage === page + 1 ? 'bg-pink-600 text-white' : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300'}`}>{page + 1}</button>
           ))}
           <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-2 text-sm bg-[#2a2a2a] rounded-md hover:bg-[#3a3a3a] text-gray-300 disabled:opacity-50"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
       {showScroll && (
        <button
          onClick={scrollTop}
          className="fixed bottom-8 right-8 bg-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-700 transition-all z-50 animate-fade-in"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ExplorePage;