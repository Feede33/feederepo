
import React from 'react';
import { Show } from './types';

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
);

export const ExploreIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M8 16a6 6 0 006-6H2a6 6 0 006 6zM8 2a6 6 0 00-6 6h12a6 6 0 00-6-6z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12 10a4 4 0 11-8 0 4 4 0 018 0zm-4 2a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

export const NewsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm2 2v10h12V5H4zm2 2h8v2H6V7zm0 4h8v2H6v-2z" />
    </svg>
);

export const ActorsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-3 4c-3.33 0-5 2.67-5 4v1h10v-1c0-1.33-1.67-4-5-4zm8-4a3 3 0 11-6 0 3 3 0 016 0zm-3 4c-3.33 0-5 2.67-5 4v1h10v-1c0-1.33-1.67-4-5-4z" />
    </svg>
);

export const RankingIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 011-1h6a1 1 0 110 2H8a1 1 0 01-1-1zm-1 4a1 1 0 100 2h6a1 1 0 100-2H6zm1 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

export const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const generateShows = (count: number, seedPrefix: string, languages: (Show['language'])[] = []): Show[] => {
    const titles = ["Head Over Heels", "Good Boy", "My Dear Nemesis", "The First Night with the Duke", "Beauty Knows", "Las Guerreras K-Pop", "Cells at Work", "S Line", "ABO Desire", "Pit Babe S2", "I Promise I Will Come Back", "Revenged Love", "Tastefully Yours", "The Divorce Insurance", "The Apothecary Diaries", "Hana Yori Dango", "True Beauty (Anime)", "Marmalade Boy"];
    return Array.from({ length: count }, (_, i) => ({
        id: parseInt(`${seedPrefix}${i}`),
        title: titles[i % titles.length],
        imageUrl: `https://picsum.photos/seed/${seedPrefix}${i}/220/330`,
        rating: parseFloat((Math.random() * (10 - 7) + 7).toFixed(1)),
        language: languages.length > 0 ? languages[i % languages.length] : undefined
    }));
};

export const trendingShows: Show[] = generateShows(8, '1');
export const movieShows: Show[] = generateShows(8, '2', ['Inglés', 'Español']);
export const dramaShows: Show[] = generateShows(10, '3');
export const airingNowShows: Show[] = generateShows(10, '4', ['Español']);
export const animeShows: Show[] = generateShows(8, '5', ['Español']);
export const spanishDubbedShows: Show[] = generateShows(10, '6', ['Español']);
export const liveActionShows: Show[] = generateShows(8, '7', ['Español', 'Español', 'Español']);
export const koreaShows: Show[] = generateShows(8, '8');
export const chinaShows: Show[] = generateShows(8, '9');
export const thailandShows: Show[] = generateShows(8, '10');
export const japanShows: Show[] = generateShows(8, '11');
export const classicShows: Show[] = generateShows(8, '12', ['Español']);

// Datos para la página de exploración
export const filterData: Record<string, string[]> = {
  'Tipo': ['Dramas', 'Películas', 'Anime', 'Variedad', 'Todo'],
  'Género': ['Romance', 'Comedia', 'Acción', 'Fantasía', 'Histórico', 'Misterio', 'Terror', 'Todo'],
  'SubGén': ['Escolar', 'Médico', 'Oficina', 'Familiar', 'Militar', 'Legal', 'Todo'],
  'País': ['Corea', 'China', 'Japón', 'Tailandia', 'Filipinas', 'Todo'],
  'Año': ['2024', '2023', '2022', '2021', '2020', 'Todo'],
  'Idioma': ['Español', 'Inglés', 'Coreano', 'Chino', 'Japonés', 'Todo']
};

// Generar más shows para la página de exploración
export const exploreShows: Show[] = generateShows(24, 'explore');
