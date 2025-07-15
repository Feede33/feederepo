import React, { useState, useMemo } from 'react';
import Footer from '../components/Footer';

const actors = [
  { id: 1, name: 'Hyun Bin', imageUrl: 'https://i.pravatar.cc/300?u=a1', country: 'Corea del Sur' },
  { id: 2, name: 'Son Ye-jin', imageUrl: 'https://i.pravatar.cc/300?u=a2', country: 'Corea del Sur' },
  { id: 3, name: 'Park Seo-joon', imageUrl: 'https://i.pravatar.cc/300?u=a3', country: 'Corea del Sur' },
  { id: 4, name: 'Song Hye-kyo', imageUrl: 'https://i.pravatar.cc/300?u=a4', country: 'Corea del Sur' },
  { id: 5, name: 'Dilraba Dilmurat', imageUrl: 'https://i.pravatar.cc/300?u=a5', country: 'China' },
  { id: 6, name: 'Yang Yang', imageUrl: 'https://i.pravatar.cc/300?u=a6', country: 'China' },
  { id: 7, name: 'Yui Aragaki', imageUrl: 'https://i.pravatar.cc/300?u=a7', country: 'Japón' },
  { id: 8, name: 'Kento Yamazaki', imageUrl: 'https://i.pravatar.cc/300?u=a8', country: 'Japón' },
  { id: 9, name: 'Nadech Kugimiya', imageUrl: 'https://i.pravatar.cc/300?u=a9', country: 'Tailandia' },
  { id: 10, name: 'Urassaya Sperbund', imageUrl: 'https://i.pravatar.cc/300?u=a10', country: 'Tailandia' },
];

const Actors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredActors = useMemo(() => {
    return actors
      .filter(actor => actor.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
  }, [searchTerm, sortOrder]);

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <div className="container mx-auto px-4 md:px-12 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Actores Populares</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-[#181818] p-4 rounded-lg">
          <input
            type="text"
            placeholder="Buscar actor..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 bg-[#2a2a2a] text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4 md:mb-0"
          />
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Ordenar por:</span>
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="bg-[#2a2a2a] text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="asc">Nombre (A-Z)</option>
              <option value="desc">Nombre (Z-A)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {filteredActors.map(actor => (
            <div key={actor.id} className="text-center group">
              <div className="relative aspect-square rounded-full overflow-hidden mb-4 transform group-hover:scale-105 transition-transform duration-300">
                <img src={actor.imageUrl} alt={actor.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
              <h3 className="font-bold text-lg group-hover:text-pink-400 transition-colors">{actor.name}</h3>
              <p className="text-sm text-gray-400">{actor.country}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Actors; 