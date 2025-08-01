
import React, { useState } from 'react';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
import { HomeIcon, ExploreIcon, NewsIcon, ActorsIcon, RankingIcon } from '../icons';
import { useAppContext } from '../context/app-context';

const NavLink: React.FC<{ icon: React.ReactNode; text: string; to: string }> = ({ icon, text, to }) => (
  <RouterNavLink 
    to={to} 
    className={({ isActive }) => `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-white bg-opacity-10 text-white' : 'text-gray-400 hover:bg-white hover:bg-opacity-5 hover:text-white'}`}
  >
    {icon}
    <span>{text}</span>
  </RouterNavLink>
);

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logOut } = useAppContext();

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#101010] bg-opacity-80 backdrop-blur-md h-16 z-50 flex items-center justify-between px-4 md:px-12 shadow-md shadow-black/20">
      <div className="flex items-center space-x-8">
        <RouterNavLink to="/" className="text-2xl font-bold text-white tracking-wider">
          <span className="text-pink-500">P</span>andrama
        </RouterNavLink>
        <nav className="hidden lg:flex items-center space-x-2">
          <NavLink icon={<HomeIcon />} text="Inicio" to="/" />
          <NavLink icon={<ExploreIcon />} text="Explorar" to="/explore" />
          <NavLink icon={<NewsIcon />} text="Noticias" to="/news" />
          <NavLink icon={<ActorsIcon />} text="Actores" to="/actors" />
          <NavLink icon={<RankingIcon />} text="Rankings" to="/rankings" />
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 px-3 py-2 text-gray-400 hover:text-white transition-colors"
            >
              <span>Más</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-40 bg-[#181818] rounded-md shadow-lg py-1">

                <RouterNavLink to="/calendar" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Calendario</RouterNavLink>
                <RouterNavLink to="/support" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Soporte</RouterNavLink>
              </div>
            )}
          </div>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input 
            type="text"
            placeholder="Buscar"
            className="bg-[#222] border border-gray-700 rounded-full w-64 h-9 pl-4 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 absolute top-1/2 right-3 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <img src={user.photoURL || 'https://i.pravatar.cc/150'} alt="profile" className="w-8 h-8 rounded-full" />
            </button>
            
            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#181818] rounded-md shadow-lg py-1 z-50">
                <RouterNavLink to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Mi Perfil</RouterNavLink>
                <div className="border-t border-gray-700 my-1"></div>
                <button onClick={logOut} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link to="/login" className="text-gray-300 hover:text-white font-semibold text-sm px-4 py-2 rounded-full transition-colors hover:bg-white/10">
              Iniciar Sesión
            </Link>
            <Link to="/signup" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-4 py-2 rounded-full transition-colors">
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
