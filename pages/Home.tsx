import React, { useState, useEffect, useCallback, useRef } from 'react';
import Hero from '../components/Hero';
import ShowRow from '../components/ShowRow';
import AiringNowRow from '../components/AiringNowRow';
import Footer from '../components/Footer';
import { trendingShows, movieShows, dramaShows, airingNowShows, animeShows, spanishDubbedShows, liveActionShows, koreaShows, chinaShows, thailandShows, japanShows, classicShows } from '../constants';

const sections = [
  { id: 'trending', title: 'En Tendencia', shows: trendingShows, type: 'default' },
  { id: 'movies', title: 'Película', shows: movieShows, type: 'default' },
  { id: 'dramas', title: 'Dramas', shows: dramaShows, type: 'default' },
  { id: 'airing', title: 'Ahora al aire', shows: airingNowShows, type: 'airing' },
  { id: 'anime', title: 'Anime', shows: animeShows, type: 'default' },
  { id: 'spanish', title: 'Doblado al Español', shows: spanishDubbedShows, type: 'default' },
  { id: 'liveaction', title: 'Del Dibujo al LiveAction', shows: liveActionShows, type: 'default' },
  { id: 'korea', title: 'De Corea', shows: koreaShows, type: 'default' },
  { id: 'china', title: 'De China', shows: chinaShows, type: 'default' },
  { id: 'thailand', title: 'De Tailandia', shows: thailandShows, type: 'default' },
  { id: 'japan', title: 'De Japón', shows: japanShows, type: 'default' },
  { id: 'classics', title: 'Algunos clásicos', shows: classicShows, type: 'default' },
];

const Home: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    'trending': true, // Make the first section visible by default
  });
  const [isLoading, setIsLoading] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
        observer.current?.unobserve(entry.target);
      }
    });
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(observerCallback, {
      rootMargin: '0px',
      threshold: 0.1,
    });
    return () => observer.current?.disconnect();
  }, [observerCallback]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#101010]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#101010] transition-opacity duration-500 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}>
      <Hero />
      <div className="container mx-auto px-4 md:px-12 py-8">
        {sections.map(section => (
          <section
            key={section.id}
            id={section.id}
            ref={el => el && observer.current?.observe(el)}
            className="min-h-[200px]" // Placeholder height to ensure it can be observed
          >
            {section.type === 'airing' ? (
              <AiringNowRow 
                title={section.title} 
                shows={section.shows} 
                animate={!!visibleSections[section.id]}
              />
            ) : (
              <ShowRow 
                title={section.title} 
                shows={section.shows} 
                animate={!!visibleSections[section.id]}
              />
            )}
          </section>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home; 