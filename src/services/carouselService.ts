import { apiRequest } from './api';

export interface CarouselImage {
  _id?: string;
  imageUrl: string;
  clickUrl: string;
  altText?: string;
  order: number;
}

export interface Carousel {
  _id?: string;
  language: string;
  position: 'top' | 'bottom';
  images: CarouselImage[];
  rotationInterval?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Get all carousels with optional filters
export const getCarousels = async (language?: string, position?: 'top' | 'bottom') => {
  const params = new URLSearchParams();
  if (language) params.append('language', language);
  if (position) params.append('position', position);

  const query = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/carousels${query}`);
};

// Get carousel by ID
export const getCarouselById = async (id: string) => {
  return apiRequest(`/carousels/${id}`);
};

// Create new carousel
export const createCarousel = async (carousel: Carousel) => {
  return apiRequest('/carousels', {
    method: 'POST',
    body: carousel,
  });
};

// Update carousel
export const updateCarousel = async (id: string, updates: Partial<Carousel>) => {
  return apiRequest(`/carousels/${id}`, {
    method: 'PUT',
    body: updates,
  });
};

// Delete carousel
export const deleteCarousel = async (id: string) => {
  return apiRequest(`/carousels/${id}`, {
    method: 'DELETE',
  });
};

// Add image to carousel
export const addCarouselImage = async (id: string, image: CarouselImage) => {
  return apiRequest(`/carousels/${id}/images`, {
    method: 'POST',
    body: image,
  });
};

// Remove image from carousel
export const removeCarouselImage = async (carouselId: string, imageId: string) => {
  return apiRequest(`/carousels/${carouselId}/images/${imageId}`, {
    method: 'DELETE',
  });
};
