// Central export point for all API services
export * from './api';
export * as carouselService from './carouselService';
export * as dashboardService from './dashboardService';
export * as pdfService from './pdfService';

// Export types
export type { Carousel, CarouselImage } from './carouselService';
export type { Dashboard, PDFFile, SocialLinks } from './dashboardService';
export type { PDF, PDFResponse } from './pdfService';
