import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Footer from '../components/Footer';
import ShowCard from '../components/ShowCard';
import ProfileEdit from '../components/ProfileEdit';
import { getUserProfileData, UserProfile } from '../services/userService';

const Profile: React.FC = () => {
  const { favorites, watchlist, recentlyViewed, clearRecentlyViewed, user, logout } = useAppContext();
  const [activeTab, setActiveTab] = useState<'favorites' | 'watchlist' | 'history' | 'stats' | 'achievements'>('favorites');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const data = await getUserProfileData();
        setProfileData(data);
      } catch (error) {
        console.error('Error al cargar datos del perfil:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      loadProfileData();
    }
  }, [user]);

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-6">
          {shows.map(show => (
            <ShowCard key={show.id} show={show} isExploreView={true} />
          ))}
        </div>
      )}
    </div>
  );

  // Estadísticas del usuario
  const renderStats = () => {
    if (!profileData?.stats) {
      return (
        <div className="bg-gray-900 rounded-xl p-6 text-center">
          <p className="text-gray-400">No hay estadísticas disponibles</p>
        </div>
      );
    }
    
    const stats = profileData.stats;
    const memberSince = stats.memberSince ? new Date(stats.memberSince.toString()).toLocaleDateString() : 'N/A';
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center">
          <div className="text-pink-500 text-4xl font-bold mb-2">{stats.showsWatched || 0}</div>
          <div className="text-gray-400 text-sm">Dramas vistos</div>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center">
          <div className="text-pink-500 text-4xl font-bold mb-2">
            {stats.totalWatchTime ? Math.round(stats.totalWatchTime / 60) : 0}
          </div>
          <div className="text-gray-400 text-sm">Horas vistas</div>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center">
          <div className="text-pink-500 text-4xl font-bold mb-2">{stats.favoriteGenre || 'N/A'}</div>
          <div className="text-gray-400 text-sm">Género favorito</div>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center">
          <div className="text-pink-500 text-lg font-bold mb-2">{memberSince}</div>
          <div className="text-gray-400 text-sm">Miembro desde</div>
        </div>
      </div>
    );
  };
  
  // Logros del usuario
  const renderAchievements = () => {
    if (!profileData?.achievements || profileData.achievements.length === 0) {
      return (
        <div className="bg-gray-900 rounded-xl p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <p className="text-gray-400 text-lg mb-4">Aún no has desbloqueado ningún logro</p>
          <p className="text-gray-500">Sigue viendo dramas para desbloquear logros</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {profileData.achievements.map((achievement) => (
          <div key={achievement.id} className="bg-gray-900 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-pink-600/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl" role="img" aria-label="achievement">{achievement.icon}</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">{achievement.name}</h3>
              <p className="text-gray-400 text-sm">{achievement.description}</p>
              <p className="text-gray-500 text-xs mt-1">
                Desbloqueado: {new Date(achievement.unlockedAt.toString()).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#101010]">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-pink-500 to-fuchsia-500 py-12 text-white">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={user?.photoURL || "https://i.pravatar.cc/200"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={() => setIsEditProfileOpen(true)}
                className="absolute bottom-0 right-0 bg-pink-600 text-white p-1 rounded-full shadow-lg hover:bg-pink-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold">{user?.displayName || 'Mi Perfil'}</h1>
              <p className="text-white/80 max-w-xl mx-auto sm:mx-0">{profileData?.bio || 'Gestiona tus favoritos, lista de seguimiento y más'}</p>
              {profileData?.location && (
                <div className="flex items-center justify-center sm:justify-start mt-2 text-sm text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {profileData.location}
                </div>
              )}
            </div>
            <div className="w-full sm:w-auto flex-shrink-0 mt-4 sm:mt-0 flex items-center justify-center sm:justify-end space-x-3">
              <button 
                onClick={() => setIsEditProfileOpen(true)}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors"
              >
                Editar Perfil
              </button>
              <button
                onClick={logout}
                className="p-2 bg-gray-800 hover:bg-red-600/50 rounded-full text-gray-400 hover:text-white transition-colors"
                title="Cerrar Sesión"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Social Links */}
          {profileData?.socialLinks && Object.values(profileData.socialLinks).some(link => link) && (
            <div className="flex justify-center sm:justify-start gap-4 mt-4">
              {profileData.socialLinks.twitter && (
                <a href={`https://twitter.com/${profileData.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              )}
              {profileData.socialLinks.instagram && (
                <a href={`https://instagram.com/${profileData.socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {profileData.socialLinks.facebook && (
                <a href={profileData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800 sticky top-0 bg-[#101010] z-10">
        <div className="container mx-auto px-4 md:px-12">
          <div className="overflow-x-auto">
            <nav className="flex space-x-2 min-w-max py-1">
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
              <button 
                onClick={() => setActiveTab('stats')}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-300 ${
                  activeTab === 'stats' 
                    ? 'border-pink-500 text-white' 
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                Estadísticas
              </button>
              <button 
                onClick={() => setActiveTab('achievements')}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-300 ${
                  activeTab === 'achievements' 
                    ? 'border-pink-500 text-white' 
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                Logros
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-12 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <>
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
            
            {activeTab === 'stats' && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Mis Estadísticas</h2>
                {renderStats()}
              </div>
            )}
            
            {activeTab === 'achievements' && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Mis Logros</h2>
                {renderAchievements()}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <ProfileEdit 
          onClose={() => setIsEditProfileOpen(false)} 
          onSave={() => {
            setIsEditProfileOpen(false);
            // Recargar los datos del perfil
            if (user) {
              getUserProfileData().then(data => setProfileData(data));
            }
          }} 
        />
      )}

      <Footer />
    </div>
  );
};

export default Profile;