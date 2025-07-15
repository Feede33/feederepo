import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Show } from '../types';
import Footer from '../components/Footer';
import ShowDetailHero from '../components/ShowDetailHero';
import EpisodeList from '../components/EpisodeList';
import RelatedShows from '../components/RelatedShows';

const ShowDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const { 
    addToFavorites, 
    removeFromFavorites, 
    addToWatchlist, 
    removeFromWatchlist, 
    isInFavorites, 
    isInWatchlist, 
    addToRecentlyViewed 
  } = useAppContext();

  const numId = useMemo(() => parseInt(id || '0'), [id]);

  const staticDetails = useMemo(() => {
    return {
      year: 2020 + (numId % 5),
      episodes: 8 + (numId % 9) * 2,
      duration: 20 + (numId % 6) * 5
    };
  }, [numId]);

  const { isFavorite, isInWatchList } = useMemo(() => ({
    isFavorite: show ? isInFavorites(show.id) : false,
    isInWatchList: show ? isInWatchlist(show.id) : false
  }), [show, isInFavorites, isInWatchlist]);

  const addToRecent = useCallback((show: Show) => {
    addToRecentlyViewed(show);
  }, [addToRecentlyViewed]);

  useEffect(() => {
    const fetchShow = async () => {
      setLoading(true);
      try {
        const rating = 7 + ((numId % 30) / 10);
        
        const mockShow: Show = {
          id: numId,
          title: `Show #${id}`,
          imageUrl: `https://picsum.photos/seed/${id}/600/900`,
          rating: parseFloat(rating.toFixed(1)),
          language: numId % 3 === 0 ? 'Español' : numId % 3 === 1 ? 'Inglés' : undefined
        };
        
        setShow(mockShow);
        addToRecent(mockShow);
      } catch (error) {
        console.error('Error fetching show:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchShow();
    }
  }, [id, numId, addToRecent]);

  const handleFavoriteClick = useCallback(() => {
    if (!show) return;
    if (isFavorite) {
      removeFromFavorites(show.id);
    } else {
      addToFavorites(show);
    }
  }, [show, isFavorite, addToFavorites, removeFromFavorites]);

  const handleWatchlistClick = useCallback(() => {
    if (!show) return;
    if (isInWatchList) {
      removeFromWatchlist(show.id);
    } else {
      addToWatchlist(show);
    }
  }, [show, isInWatchList, addToWatchlist, removeFromWatchlist]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#101010]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#101010]">
        <h2 className="text-2xl font-bold mb-4 text-white">Show no encontrado</h2>
        <Link to="/" className="text-pink-500 hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010]">
      <ShowDetailHero 
        show={show}
        isFavorite={isFavorite}
        isInWatchList={isInWatchList}
        staticDetails={staticDetails}
        onFavoriteClick={handleFavoriteClick}
        onWatchlistClick={handleWatchlistClick}
      />
      
      <main>
        <EpisodeList 
          showId={show.id}
          episodes={staticDetails.episodes}
          duration={staticDetails.duration}
        />
        
        <RelatedShows showId={show.id} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ShowDetail; 