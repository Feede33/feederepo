import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { onAuthStateChange, logOut as firebaseLogout } from "../services/authService";
import { Show, User } from "../types";

interface AppContextType {
  favorites: Show[];
  watchlist: Show[];
  recentlyViewed: Show[];
  addToFavorites: (show: Show) => void;
  removeFromFavorites: (id: number) => void;
  addToWatchlist: (show: Show) => void;
  removeFromWatchlist: (id: number) => void;
  addToRecentlyViewed: (show: Show) => void;
  clearRecentlyViewed: () => void;
  isInFavorites: (id: number) => boolean;
  isInWatchlist: (id: number) => boolean;
  user: User | null;
  loading: boolean;
  logOut: () => Promise<void>;
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

  const addToFavorites = (show: Show) => {
    setFavorites((prev) => {
      if (prev.some((s) => s.id === show.id)) return prev;
      return [...prev, show];
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((show) => show.id !== id));
  };

  const addToWatchlist = (show: Show) => {
    setWatchlist((prev) => {
      if (prev.some((s) => s.id === show.id)) return prev;
      return [...prev, show];
    });
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist((prev) => prev.filter((show) => show.id !== id));
  };

  const isInFavorites = (id: number) => {
    return favorites.some((show) => show.id === id);
  };

  const isInWatchlist = (id: number) => {
    return watchlist.some((show) => show.id === id);
  };

  const addToRecentlyViewed = (show: Show) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((s) => s.id !== show.id);
      return [show, ...filtered].slice(0, 10);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const logOut = async () => {
    try {
      await firebaseLogout();
      // You could clear user-specific data here if needed
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        watchlist,
        recentlyViewed,
        addToFavorites,
        removeFromFavorites,
        addToWatchlist,
        removeFromWatchlist,
        addToRecentlyViewed,
        clearRecentlyViewed,
        isInFavorites,
        isInWatchlist,
        user,
        loading,
        logOut
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