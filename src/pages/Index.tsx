import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import CarouselComponent from '@/components/CarouselComponent';
import DashboardComponent from '@/components/DashboardComponent';
import Layout from '@/components/Layout';

export default function Index() {
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section with Top Carousel */}
        <section className="w-full py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Multilingual Book Hub
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Discover knowledge in your language
              </p>
            </div>
            <CarouselComponent language={language} position="top" />
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="w-full bg-muted py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Featured Content</h2>
            <DashboardComponent language={language} />
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="w-full bg-background py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Explore Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="elevated-card p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Educational</h3>
                <p className="text-sm text-muted-foreground">
                  Learn academic subjects and professional skills
                </p>
              </div>
              <div className="elevated-card p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Literary</h3>
                <p className="text-sm text-muted-foreground">
                  Discover novels, poetry, and literary classics
                </p>
              </div>
              <div className="elevated-card p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Technical</h3>
                <p className="text-sm text-muted-foreground">
                  Programming guides and technology resources
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Carousel */}
        <section className="w-full py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Recommended Books</h2>
            <CarouselComponent language={language} position="bottom" />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full bg-primary text-primary-foreground py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Explore?</h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
              Sign up to access exclusive content and personalized recommendations
            </p>
            <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
              <button className="bg-background text-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
                Get Started
              </button>
              <button className="border-2 border-primary-foreground text-primary-foreground px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
