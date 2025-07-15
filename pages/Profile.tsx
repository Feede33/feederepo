import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Footer from '../components/Footer';
import ShowCard from '../components/ShowCard';

const Profile: React.FC = () => {
  const { favorites, watchlist, recentlyViewed, clearRecentlyViewed } = useAppContext();
  const [activeTab, setActiveTab] = useState<'favorites' | 'watchlist' | 'history'>('favorites');

  const renderEmptyState = (message: string) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <p className="text-gray-400 text-lg mb-4">{message}</p>
      <Link to="/explore" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full text-sm transition-colors">
        Explorar dramas
      </Link>
    </div>
  );

  const handleClearHistory = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar tu historial de visualización? Esta acción no se puede deshacer.')) {
      clearRecentlyViewed();
    }
  };

  const TabContent: React.FC<{
    title: string;
    shows: typeof favorites;
    emptyMessage: string;
    onClear?: () => void;
  }> = ({ title, shows, emptyMessage, onClear }) => (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {onClear && shows.length > 0 && (
          <button 
            onClick={onClear}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Limpiar historial
          </button>
        )}
      </div>
      {shows.length === 0 ? (
        renderEmptyState(emptyMessage)
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {shows.map(show => (
            <ShowCard key={show.id} show={show} isExploreView={true} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#101010]">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-pink-500 to-fuchsia-500 py-12 text-white">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src="https://i.pravatar.cc/200" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Mi Perfil</h1>
              <p className="text-white/80">Gestiona tus favoritos, lista de seguimiento y más</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 md:px-12">
          <nav className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-300 ${
                activeTab === 'favorites' 
                  ? 'border-pink-500 text-white' 
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              Favoritos ({favorites.length})
            </button>
            <button 
              onClick={() => setActiveTab('watchlist')}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-300 ${
                activeTab === 'watchlist' 
                  ? 'border-pink-500 text-white' 
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              Seguimiento ({watchlist.length})
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-300 ${
                activeTab === 'history' 
                  ? 'border-pink-500 text-white' 
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              Historial ({recentlyViewed.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-12 py-8">
        {activeTab === 'favorites' && (
          <TabContent
            title="Mis Favoritos"
            shows={favorites}
            emptyMessage="Aún no has añadido ningún drama a tus favoritos"
          />
        )}

        {activeTab === 'watchlist' && (
          <TabContent
            title="Mi Lista de Seguimiento"
            shows={watchlist}
            emptyMessage="Aún no has añadido ningún drama a tu lista de seguimiento"
          />
        )}

        {activeTab === 'history' && (
          <TabContent
            title="Historial de Visualización"
            shows={recentlyViewed}
            emptyMessage="Aún no has visto ningún drama"
            onClear={handleClearHistory}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Profile; 