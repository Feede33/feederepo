import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { onAuthStateChange, logOut } from '../services/authService';
import { Show, User } from "../types";

interface AppContextType {
  favorites: Show[];
  watchlist: Show[];
  recentlyViewed: Show[];
  logout: () => Promise<void>;
  addFavorite: (show: Show) => void;
  removeFavorite: (showId: number) => void;
  addWatchlist: (show: Show) => void;
  removeWatchlist: (showId: number) => void;
  addRecentlyViewed: (show: Show) => void;
  clearRecentlyViewed: () => void;
  isInFavorites: (id: number) => boolean;
  isInWatchlist: (id: number) => boolean;
  user: User | null;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Show[]>([]);
  const [watchlist, setWatchlist] = useState<Show[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Show[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user: User | null) => {
      setUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  const addFavorite = (show: Show) => {
    setFavorites((prev) => {
      if (prev.some((s) => s.id === show.id)) return prev;
      return [...prev, show];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((show) => show.id !== id));
  };

  const addWatchlist = (show: Show) => {
    setWatchlist((prev) => {
      if (prev.some((s) => s.id === show.id)) return prev;
      return [...prev, show];
    });
  };

  const removeWatchlist = (id: number) => {
    setWatchlist((prev) => prev.filter((show) => show.id !== id));
  };

  const isInFavorites = (id: number) => {
    return favorites.some((show) => show.id === id);
  };

  const isInWatchlist = (id: number) => {
    return watchlist.some((show) => show.id === id);
  };

  const addRecentlyViewed = (show: Show) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((s) => s.id !== show.id);
      return [show, ...filtered].slice(0, 10);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const logout = async () => {
    try {
      await logOut();
      // El estado del usuario se actualizará automáticamente a través del listener onAuthStateChange
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Opcional: manejar el error en la UI
    }
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        watchlist,
        recentlyViewed,
        logout,
        addFavorite,
        removeFavorite,
        addWatchlist,
        removeWatchlist,
        addRecentlyViewed,
        clearRecentlyViewed,
        isInFavorites,
        isInWatchlist,
        user,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};