import React, { useState, useEffect } from 'react';
import { StarIcon } from '../constants';
import { useNavigate } from 'react-router-dom';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  rating: number;
  year: number;
  country: string;
  status: string;
  description: string;
  imageUrl: string;
  trailerUrl: string;
  tags: string[];
  rank?: number;
}

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const slides: HeroSlide[] = [
    {
      id: 1,
      title: "Mi querido némesis",
      subtitle: "My Beloved Enemy",
      rating: 7.4,
      year: 2025,
      country: "Corea del Sur",
      status: "Finalizado",
      description: "Baek Soo Jung, se destaca como una líder de equipo ejemplar en los prestigiosos almacenes Yon gsung. Una historia de rivalidad que se convierte en amor.",
      imageUrl: "https://picsum.photos/seed/hero1/1920/1080",
      trailerUrl: "https://picsum.photos/seed/trailer1/450/253",
      tags: ["Romance", "Drama", "Comedia"],
      rank: 1
    },
    {
      id: 2,
      title: "Flores de Cerezo",
      subtitle: "Cherry Blossoms After Winter",
      rating: 8.2,
      year: 2024,
      country: "Japón",
      status: "En emisión",
      description: "Una conmovedora historia sobre el amor juvenil y la superación personal en el contexto de la vida universitaria japonesa.",
      imageUrl: "https://picsum.photos/seed/hero2/1920/1080",
      trailerUrl: "https://picsum.photos/seed/trailer2/450/253",
      tags: ["Romance", "Juvenil", "BL"],
      rank: 2
    },
    {
      id: 3,
      title: "El Destino del Emperador",
      subtitle: "Emperor's Destiny",
      rating: 9.1,
      year: 2025,
      country: "China",
      status: "En emisión",
      description: "Una épica historia de intrigas palaciegas, amor prohibido y luchas de poder en la antigua China imperial.",
      imageUrl: "https://picsum.photos/seed/hero3/1920/1080",
      trailerUrl: "https://picsum.photos/seed/trailer3/450/253",
      tags: ["Histórico", "Romance", "Acción"],
      rank: 3
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentHero = slides[currentSlide];

  return (
    <div className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Images with Parallax Effect */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Multiple Gradient Overlays for Depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
        </div>
      ))}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-in">
              {/* Rank Badge */}
              {currentHero.rank && (
                <div className="inline-flex items-center space-x-2">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl">
                    <span className="text-2xl font-black text-white">#{currentHero.rank}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">En Tendencia</span>
                </div>
              )}

              {/* Title Section */}
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight display-font">
                  {currentHero.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-light">
                  {currentHero.subtitle}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentHero.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="badge glass text-white text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-yellow-500/20 px-3 py-1 rounded-full">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="font-bold text-white">{currentHero.rating}</span>
                  </div>
                </div>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span>{currentHero.year}</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span>{currentHero.country}</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentHero.status === 'Finalizado' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {currentHero.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                {currentHero.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => navigate(`/show/${currentHero.id}`)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span>VER AHORA</span>
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>

                <button className="group px-8 py-4 glass border border-white/20 rounded-full font-bold text-white hover:bg-white/10 transition-all">
                  <span className="flex items-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Mi Lista</span>
                  </span>
                </button>

                <button className="group px-8 py-4 glass border border-white/20 rounded-full font-bold text-white hover:bg-white/10 transition-all">
                  <span className="flex items-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Más Info</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Content - Trailer Preview */}
            <div className="hidden lg:block">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={currentHero.trailerUrl}
                    alt="Trailer"
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all cursor-pointer"
                       onClick={() => setIsPlaying(true)}>
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="glass px-4 py-2 rounded-lg">
                      <p className="text-white font-medium">Ver Tráiler</p>
                      <p className="text-gray-300 text-sm">2:34</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-12 h-2 bg-gradient-to-r from-purple-600 to-pink-600'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                } rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Side Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all group"
      >
        <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all group"
      >
        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Video Modal (if playing) */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4" onClick={() => setIsPlaying(false)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white">Video Player Placeholder</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
