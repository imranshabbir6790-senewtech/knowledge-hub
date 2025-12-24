import React, { useState, useEffect } from 'react';
import { Download, Youtube, MessageCircle, MessageSquare } from 'lucide-react';
import { dashboardService } from '@/services';
import { PageLoader } from './LoadingSpinner';

interface DashboardProps {
  language: string;
}

export default function Dashboard({ language }: DashboardProps) {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getDashboardByLanguage(language);
        setDashboard(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [language]);

  const handlePDFDownload = async () => {
    if (dashboard?.pdfFile) {
      try {
        await dashboardService.downloadDashboardPDF(language, dashboard.pdfFile.fileName);
      } catch (err) {
        console.error('Download failed:', err);
      }
    }
  };

  if (loading) return <PageLoader />;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!dashboard) return <div className="text-muted-foreground text-center py-8">No dashboard content available</div>;

  return (
    <div className="w-full bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Content</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* PDF Section */}
          {dashboard.pdfFile && (
            <div className="elevated-card overflow-hidden">
              <div className="bg-primary text-primary-foreground px-6 py-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  📄 PDF Guide
                </h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4 text-sm">
                  {dashboard.pdfFile.fileName}
                </p>
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                  <span>{(dashboard.pdfFile.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                  <span>
                    {new Date(dashboard.pdfFile.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={handlePDFDownload}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={20} />
                  Download PDF
                </button>
              </div>
            </div>
          )}

          {/* YouTube Section */}
          {dashboard.youtubeUrl && (
            <div className="elevated-card overflow-hidden">
              <div className="bg-primary text-primary-foreground px-6 py-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Youtube size={24} /> Watch Video
                </h3>
              </div>
              <div className="p-6">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={dashboard.youtubeUrl.replace(
                      /^.*(?:youtu.be\/|v=)([^&]*)/,
                      'https://www.youtube.com/embed/$1'
                    )}
                    title="Featured Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Links Section */}
          <div className="elevated-card overflow-hidden">
            <div className="bg-primary text-primary-foreground px-6 py-4">
              <h3 className="text-xl font-bold">Community</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboard.socialLinks?.discord ? (
                <a
                  href={dashboard.socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle size={20} />
                  Join Discord
                </a>
              ) : (
                <div className="w-full bg-muted text-muted-foreground font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed opacity-60">
                  <MessageCircle size={20} />
                  Discord Not Available
                </div>
              )}

              {dashboard.socialLinks?.reddit ? (
                <a
                  href={dashboard.socialLinks.reddit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare size={20} />
                  Join Reddit
                </a>
              ) : (
                <div className="w-full bg-muted text-muted-foreground font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed opacity-60">
                  <MessageSquare size={20} />
                  Reddit Not Available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
