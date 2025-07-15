import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { trendingShows } from '@/constants';
import Footer from '@/components/Footer';
import ShowDetailHero from '@/components/ShowDetailHero';
import EpisodeList from '@/components/EpisodeList';
import RelatedShows from '@/components/RelatedShows';
import { Show } from '@/types';

const ShowDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { 
      addToRecentlyViewed 
    } = useAppContext();

    const showId = parseInt(id || '0', 10);
    const show = trendingShows.find((s: Show) => s.id === showId);

    React.useEffect(() => {
        if (show) {
            addToRecentlyViewed(show);
        }
    }, [show, addToRecentlyViewed]);

    if (!show) {
        return <div>Show not found</div>;
    }

    const mockEpisodes = Array.from({ length: 16 }, (_, i) => ({
        id: i + 1,
        number: i + 1,
        title: `Episode ${i + 1}`,
        duration: '45 min',
        thumbnail: `https://picsum.photos/seed/${showId}-ep${i}/300/200`
    }));

    const relatedShows = trendingShows.filter((s: Show) => s.id !== showId).slice(0, 5);

    return (
        <div className="bg-[#101010] text-white">
            <ShowDetailHero show={show} />
            <EpisodeList episodes={mockEpisodes} />
            <RelatedShows shows={relatedShows} />
            <Footer />
        </div>
    );
};

export default ShowDetail; 