import React, { useState, useMemo } from 'react';
import Footer from '../components/Footer';
import { trendingShows, movieShows } from '../constants';

type RankCategory = 'Top Histórico' | 'Más Populares del Mes';

const allShows = [...trendingShows, ...movieShows];

const Rankings: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<RankCategory>('Top Histórico');

  const rankedShows = useMemo(() => {
    const sorted = [...allShows].sort((a, b) => b.rating - a.rating);
    if (activeCategory === 'Más Populares del Mes') {
      // Simulate different ranking by shuffling and taking top 20
      return [...sorted].sort(() => Math.random() - 0.5).slice(0, 20);
    }
    return sorted.slice(0, 20); // Top 20 historical
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <div className="container mx-auto px-4 md:px-12 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center">Rankings de Dramas</h1>
        <p className="text-gray-400 text-center mb-8">Los dramas mejor calificados por la comunidad.</p>

        <div className="flex justify-center mb-8">
          {(['Top Histórico', 'Más Populares del Mes'] as RankCategory[]).map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-pink-600 text-white'
                  : 'bg-[#181818] text-gray-300 hover:bg-[#222]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {rankedShows.map((show, index) => (
            <div
              key={`${activeCategory}-${show.id}`}
              className="flex items-center bg-[#181818] p-4 rounded-lg transition-all duration-300 hover:bg-[#222] hover:shadow-lg animate-fade-in"
            >
              <span className="text-3xl font-bold text-gray-500 w-16 text-center">{index + 1}</span>
              <img src={show.imageUrl} alt={show.title} className="w-16 h-24 object-cover rounded-md mx-4" />
              <div className="flex-1">
                <h3 className="text-lg font-bold">{show.title}</h3>
                <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold text-lg">{show.rating.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Rankings; 