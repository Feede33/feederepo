import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { 
  trendingShows, 
  movieShows, 
  dramaShows, 
  airingNowShows, 
  animeShows, 
  spanishDubbedShows, 
  liveActionShows, 
  koreaShows, 
  chinaShows, 
  thailandShows, 
  japanShows, 
  classicShows 
} from '@/constants';
import Footer from '@/components/Footer';
import ShowDetailHero from '@/components/ShowDetailHero';
import EpisodeList from '@/components/EpisodeList';
import RelatedShows from '@/components/RelatedShows';
import { Show } from '@/types';

const ShowDetail: React.FC = (): React.ReactElement => {
    const { id } = useParams<{ id: string }>();
    const { addRecentlyViewed } = useAppContext();

    const showId = parseInt(id || '0', 10);
    const allShows = [
        ...trendingShows,
        ...movieShows,
        ...dramaShows,
        ...airingNowShows,
        ...animeShows,
        ...spanishDubbedShows,
        ...liveActionShows,
        ...koreaShows,
        ...chinaShows,
        ...thailandShows,
        ...japanShows,
        ...classicShows
    ];
    const show = allShows.find((s: Show) => s.id === showId);

    React.useEffect(() => {
        if (show) {
            addRecentlyViewed(show);
        }
    }, [show, addRecentlyViewed]);

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

    const relatedShows = allShows.filter((s: Show) => s.id !== showId).slice(0, 5);

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