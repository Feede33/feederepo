import React, { useState } from 'react';

interface Episode {
  id: number;
  number: number;
  title: string;
  duration: string;
  thumbnail: string;
}

interface EpisodeListProps {
  episodes: Episode[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Episodios</h2>
      
      <div className="space-y-4">
        {episodes.map((episode) => (
          <div 
            key={episode.id}
            className={`bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all ${
              selectedEpisode === episode.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedEpisode(episode.id)}
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-48 h-32">
                <img 
                  src={episode.thumbnail} 
                  alt={`Episodio ${episode.number}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-20 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white opacity-80" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-sm">Episodio {episode.number}</p>
                    <h3 className="text-white font-medium">{episode.title}</h3>
                  </div>
                  <span className="text-gray-400 text-sm">{episode.duration}</span>
                </div>
                
                {selectedEpisode === episode.id && (
                  <p className="mt-3 text-gray-300 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
                    nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList; 