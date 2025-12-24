import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { carouselService } from '@/services';
import { PageLoader } from './LoadingSpinner';

interface CarouselProps {
  language: string;
  position: 'top' | 'bottom';
}

export default function Carousel({ language, position }: CarouselProps) {
  const [carousel, setCarousel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fetch carousel data
  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        setLoading(true);
        const response = await carouselService.getCarousels(language, position);
        if (response.data && response.data.length > 0) {
          setCarousel(response.data[0]);
          setError(null);
        } else {
          setError(`No carousel found for ${language} - ${position}`);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load carousel');
        console.error('Carousel fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarousel();
  }, [language, position]);

  // Auto-rotate carousel
  useEffect(() => {
    if (!carousel || carousel.images.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carousel.images.length);
    }, carousel.rotationInterval || 60000);

    return () => clearInterval(interval);
  }, [carousel, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, carousel]);

  const goToNext = useCallback(() => {
    if (carousel && carousel.images.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % carousel.images.length);
    }
  }, [carousel]);

  const goToPrevious = useCallback(() => {
    if (carousel && carousel.images.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + carousel.images.length) % carousel.images.length);
    }
  }, [carousel]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setImageError(false);
  };

  // Handle swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  if (loading) return <PageLoader />;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!carousel || !carousel.images || carousel.images.length === 0) {
    return <div className="text-muted-foreground text-center py-8">No images available</div>;
  }

  const currentImage = carousel.images[currentIndex];

  return (
    <div
      className="w-full bg-card rounded-lg overflow-hidden border border-border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Carousel Container */}
      <div className="relative w-full bg-card">
        {/* Image */}
        <a
          href={currentImage.clickUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full cursor-pointer"
        >
          {!imageError ? (
            <img
              src={currentImage.imageUrl}
              alt={currentImage.altText || `Slide ${currentIndex + 1}`}
              className="w-full h-auto object-cover transition-all duration-500"
              style={{ aspectRatio: '16 / 9' }}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="w-full flex items-center justify-center bg-muted text-muted-foreground"
              style={{ aspectRatio: '16 / 9' }}
            >
              <span className="text-sm">Image unavailable</span>
            </div>
          )}
        </a>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {carousel.images.length}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center items-center gap-2 p-4 bg-muted">
        {carousel.images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Info Bar (Optional) */}
      <div className="bg-muted text-foreground px-4 py-3 text-sm">
        <p className="truncate">{currentImage.altText || `Image ${currentIndex + 1}`}</p>
      </div>
    </div>
  );
}
