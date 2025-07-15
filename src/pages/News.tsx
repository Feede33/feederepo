import React from 'react';
import Footer from '../components/Footer';

const featuredArticle = {
  id: 1,
  title: 'El elenco de "Hospital Playlist" se reunirá para un nuevo programa de variedades',
  imageUrl: 'https://picsum.photos/seed/news-featured/1200/600',
  excerpt: 'Los fans están emocionados de ver al querido elenco de "Hospital Playlist" reunirse en la pantalla para un nuevo y divertido programa de variedades que se emitirá el próximo mes.',
  category: 'Celebridades',
  timestamp: 'hace 3 horas',
};

const articles = [
  { id: 2, title: '"Vincenzo" confirmado para una película especial', imageUrl: 'https://picsum.photos/seed/news2/600/400', category: 'Dramas', timestamp: 'hace 5 horas' },
  { id: 3, title: 'Park Min-young habla sobre su química con Song Kang', imageUrl: 'https://picsum.photos/seed/news3/600/400', category: 'Entrevistas', timestamp: 'hace 8 horas' },
  { id: 4, title: 'Los 10 K-Dramas más esperados de la segunda mitad de 2024', imageUrl: 'https://picsum.photos/seed/news4/600/400', category: 'Listas', timestamp: 'hace 1 día' },
  { id: 5, title: 'El director de "Kingdom" revela planes para una tercera temporada', imageUrl: 'https://picsum.photos/seed/news5/600/400', category: 'Dramas', timestamp: 'hace 2 días' },
];

const News: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <div className="container mx-auto px-4 md:px-12 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Últimas Noticias</h1>

        {/* Featured Article */}
        <div className="mb-12 group cursor-pointer">
          <div className="relative rounded-lg overflow-hidden">
            <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2 inline-block">{featuredArticle.category}</span>
              <h2 className="text-3xl font-bold text-white mb-2">{featuredArticle.title}</h2>
              <p className="text-gray-300 max-w-2xl">{featuredArticle.excerpt}</p>
              <p className="text-xs text-gray-400 mt-2">{featuredArticle.timestamp}</p>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map(article => (
            <div key={article.id} className="group cursor-pointer">
              <div className="rounded-lg overflow-hidden mb-4">
                <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-pink-400 text-xs font-semibold">{article.category}</span>
              <h3 className="text-lg font-bold my-1 group-hover:text-pink-400 transition-colors">{article.title}</h3>
              <p className="text-xs text-gray-500">{article.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News; 