import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Edit2, Trash2, Plus, Save, X } from 'lucide-react';
import { carouselService, dashboardService, pdfService } from '@/services';
import { PageLoader } from './LoadingSpinner';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'carousel' | 'dashboard' | 'pdf'>('carousel');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Carousel State
  const [carousels, setCarousels] = useState<any[]>([]);
  const [carouselForm, setCarouselForm] = useState<{ position: 'top' | 'bottom'; images: any[]; rotationInterval: number; isActive: boolean }>({ position: 'top', images: [], rotationInterval: 60000, isActive: true });
  const [showCreateCarousel, setShowCreateCarousel] = useState(false);
  const [editingCarouselId, setEditingCarouselId] = useState<string | null>(null);

  // Dashboard State
  const [dashboard, setDashboard] = useState<any>(null);
  const [dashboardForm, setDashboardForm] = useState({
    youtubeUrl: '',
    discord: '',
    reddit: '',
    pdfFile: null as File | null,
  });

  // PDF State
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [pdfForm, setPdfForm] = useState({
    title: '',
    description: '',
    file: null as File | null,
  });

  // Fetch data on tab/language change
  useEffect(() => {
    if (activeTab === 'carousel') fetchCarousels();
    if (activeTab === 'dashboard') fetchDashboard();
    if (activeTab === 'pdf') fetchPdfs();
  }, [activeTab, language]);

  // ===== CAROUSEL FUNCTIONS =====
  const fetchCarousels = async () => {
    try {
      setLoading(true);
      const response = await carouselService.getCarousels(language);
      setCarousels(response.data || []);
    } catch (err: any) {
      showMessage('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEditCarousel = (carousel: any) => {
    setShowCreateCarousel(true);
    setEditingCarouselId(carousel._id);
    setCarouselForm({
      position: carousel.position,
      images: carousel.images || [],
      rotationInterval: carousel.rotationInterval || 60000,
      isActive: carousel.isActive ?? true,
    });
  };

  const handleDeleteCarousel = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await carouselService.deleteCarousel(id);
      showMessage('success', 'Carousel deleted');
      fetchCarousels();
    } catch (err: any) {
      showMessage('error', err.message);
    }
  };

  // ===== DASHBOARD FUNCTIONS =====
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getDashboardByLanguage(language);
      setDashboard(response.data);
      setDashboardForm({
        youtubeUrl: response.data.youtubeUrl || '',
        discord: response.data.socialLinks?.discord || '',
        reddit: response.data.socialLinks?.reddit || '',
        pdfFile: null,
      });
    } catch (err: any) {
      setDashboard(null);
      setDashboardForm({ youtubeUrl: '', discord: '', reddit: '', pdfFile: null });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDashboard = async () => {
    try {
      setLoading(true);
      await dashboardService.createOrUpdateDashboard(
        language,
        dashboardForm.pdfFile || undefined,
        dashboardForm.youtubeUrl,
        {
          discord: dashboardForm.discord || null,
          reddit: dashboardForm.reddit || null,
        }
      );
      showMessage('success', 'Dashboard saved');
      fetchDashboard();
    } catch (err: any) {
      showMessage('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  // ===== PDF FUNCTIONS =====
  const fetchPdfs = async () => {
    try {
      setLoading(true);
      const response = await pdfService.getPDFs(language, 1, 10);
      setPdfs(response.data || []);
    } catch (err: any) {
      showMessage('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPDF = async () => {
    if (!pdfForm.file || !pdfForm.title) {
      showMessage('error', 'Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      await pdfService.uploadPDF(pdfForm.file, language, pdfForm.title, pdfForm.description);
      showMessage('success', 'PDF uploaded');
      setPdfForm({ title: '', description: '', file: null });
      fetchPdfs();
    } catch (err: any) {
      showMessage('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePDF = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await pdfService.deletePDF(id);
      showMessage('success', 'PDF deleted');
      fetchPdfs();
    } catch (err: any) {
      showMessage('error', err.message);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const resetCarouselForm = () => {
    setCarouselForm({ position: 'top', images: [], rotationInterval: 60000, isActive: true });
    setShowCreateCarousel(false);
    setEditingCarouselId(null);
  };

  const handleSaveCarousel = async () => {
    if (carouselForm.images.length === 0) {
      showMessage('error', 'Add at least one image');
      return;
    }

    // Normalize orders
    const images = carouselForm.images.map((img, idx) => ({
      ...img,
      order: img.order || idx + 1,
    }));

    try {
      setLoading(true);
      if (editingCarouselId) {
        await carouselService.updateCarousel(editingCarouselId, {
          images,
          rotationInterval: carouselForm.rotationInterval,
          isActive: carouselForm.isActive,
        });
        showMessage('success', 'Carousel updated');
      } else {
        await carouselService.createCarousel({
          language,
          position: carouselForm.position,
          images,
          rotationInterval: carouselForm.rotationInterval,
        } as any);
        showMessage('success', 'Carousel created');
      }
      resetCarouselForm();
      fetchCarousels();
    } catch (e: any) {
      showMessage('error', e.message || 'Failed to save carousel');
    } finally {
      setLoading(false);
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'Arabic' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'hi', name: 'Hindi' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-4xl font-bold text-foreground">Admin Panel</h1>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border bg-muted text-foreground hover:bg-muted/80 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success'
                ? 'bg-muted text-foreground border-border'
                : 'bg-destructive/10 text-destructive border-destructive/30'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Language Selector */}
        <div className="mb-6 flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-4 py-2 rounded font-semibold transition-colors ${
                language === lang.code
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {(['carousel', 'dashboard', 'pdf'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {loading && <PageLoader />}

        {/* Carousel Tab */}
        {activeTab === 'carousel' && !loading && (
          <div className="elevated-card p-8">
            <h2 className="text-2xl font-bold mb-6">Carousel Management</h2>
            <div className="space-y-4">
              {carousels.map((carousel) => (
                <div key={carousel._id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Position: {carousel.position.toUpperCase()}</h3>
                    <p className="text-sm text-muted-foreground">
                      {carousel.images.length} images • {carousel.rotationInterval / 1000}s rotation
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditCarousel(carousel)}
                      className="bg-secondary text-secondary-foreground p-2 rounded hover:opacity-90"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteCarousel(carousel._id)}
                      className="bg-destructive text-destructive-foreground p-2 rounded hover:opacity-90"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {!showCreateCarousel ? (
                <button
                  onClick={() => setShowCreateCarousel(true)}
                  className="w-full border-2 border-dashed border-primary text-primary py-4 rounded-lg font-semibold hover:bg-primary/10 flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add New Carousel
                </button>
              ) : (
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-semibold">Position:</label>
                      <select
                        value={carouselForm.position}
                        onChange={(e) => setCarouselForm({ ...carouselForm, position: e.target.value as 'top' | 'bottom' })}
                        className="border border-border rounded-lg px-3 py-2 bg-background"
                        disabled={Boolean(editingCarouselId)}
                      >
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-semibold">Rotation (sec):</label>
                      <input
                        type="number"
                        min={5}
                        value={Math.round(carouselForm.rotationInterval / 1000)}
                        onChange={(e) => setCarouselForm({ ...carouselForm, rotationInterval: Number(e.target.value) * 1000 })}
                        className="w-24 border border-border rounded-lg px-3 py-2 bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {carouselForm.images.map((img, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3">
                        <input
                          className="md:col-span-5 border border-border rounded-lg px-3 py-2 bg-background"
                          placeholder="Image URL (https://...)"
                          value={img.imageUrl}
                          onChange={(e) => {
                            const images = [...carouselForm.images];
                            images[idx].imageUrl = e.target.value;
                            setCarouselForm({ ...carouselForm, images });
                          }}
                        />
                        <input
                          className="md:col-span-4 border border-border rounded-lg px-3 py-2 bg-background"
                          placeholder="Click URL"
                          value={img.clickUrl}
                          onChange={(e) => {
                            const images = [...carouselForm.images];
                            images[idx].clickUrl = e.target.value;
                            setCarouselForm({ ...carouselForm, images });
                          }}
                        />
                        <input
                          className="md:col-span-2 border border-border rounded-lg px-3 py-2 bg-background"
                          placeholder="Alt text"
                          value={img.altText || ''}
                          onChange={(e) => {
                            const images = [...carouselForm.images];
                            images[idx].altText = e.target.value;
                            setCarouselForm({ ...carouselForm, images });
                          }}
                        />
                        <div className="md:col-span-1 flex items-center gap-2">
                          <input
                            type="number"
                            className="w-20 border border-border rounded-lg px-3 py-2 bg-background"
                            placeholder="Order"
                            value={img.order}
                            onChange={(e) => {
                              const images = [...carouselForm.images];
                              images[idx].order = Number(e.target.value);
                              setCarouselForm({ ...carouselForm, images });
                            }}
                          />
                          <button
                            className="bg-destructive text-destructive-foreground px-3 py-2 rounded-lg"
                            onClick={() => {
                              const images = carouselForm.images.filter((_, i) => i !== idx);
                              setCarouselForm({ ...carouselForm, images });
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className="border-2 border-dashed border-border px-3 py-2 rounded-lg text-sm hover:bg-muted"
                      onClick={() => setCarouselForm({ ...carouselForm, images: [...carouselForm.images, { imageUrl: '', clickUrl: '', altText: '', order: carouselForm.images.length + 1 }] })}
                    >
                      + Add Image
                    </button>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button
                      className="bg-muted text-foreground px-4 py-2 rounded-lg"
                        onClick={resetCarouselForm}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
                        onClick={handleSaveCarousel}
                    >
                        {editingCarouselId ? 'Save Changes' : 'Save Carousel'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && !loading && (
          <div className="elevated-card p-8">
            <h2 className="text-2xl font-bold mb-6">Dashboard Content</h2>
            <div className="space-y-6">
              {/* PDF Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2">PDF File</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      setDashboardForm({
                        ...dashboardForm,
                        pdfFile: e.target.files?.[0] || null,
                      })
                    }
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
                    <p className="text-sm text-muted-foreground">
                      {dashboardForm.pdfFile
                        ? dashboardForm.pdfFile.name
                        : 'Click to upload or drag and drop'}
                    </p>
                  </label>
                </div>
              </div>

              {/* YouTube URL */}
              <div>
                <label className="block text-sm font-semibold mb-2">YouTube URL</label>
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={dashboardForm.youtubeUrl}
                  onChange={(e) =>
                    setDashboardForm({ ...dashboardForm, youtubeUrl: e.target.value })
                  }
                  className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground"
                />
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Discord URL</label>
                  <input
                    type="url"
                    placeholder="https://discord.gg/..."
                    value={dashboardForm.discord}
                    onChange={(e) =>
                      setDashboardForm({ ...dashboardForm, discord: e.target.value })
                    }
                    className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Reddit URL</label>
                  <input
                    type="url"
                    placeholder="https://reddit.com/r/..."
                    value={dashboardForm.reddit}
                    onChange={(e) =>
                      setDashboardForm({ ...dashboardForm, reddit: e.target.value })
                    }
                    className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveDashboard}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save Dashboard
              </button>
            </div>
          </div>
        )}

        {/* PDF Tab */}
        {activeTab === 'pdf' && !loading && (
          <div className="elevated-card p-8">
            <h2 className="text-2xl font-bold mb-6">PDF Management</h2>

            {/* Upload Form */}
            <div className="mb-8 p-6 bg-muted rounded-lg space-y-4">
              <h3 className="font-bold text-lg">Upload New PDF</h3>

              <div>
                <label className="block text-sm font-semibold mb-2">Title *</label>
                <input
                  type="text"
                  value={pdfForm.title}
                  onChange={(e) => setPdfForm({ ...pdfForm, title: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground"
                  placeholder="PDF Title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={pdfForm.description}
                  onChange={(e) =>
                    setPdfForm({ ...pdfForm, description: e.target.value })
                  }
                  className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground"
                  placeholder="PDF Description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">PDF File *</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setPdfForm({ ...pdfForm, file: e.target.files?.[0] || null })
                  }
                  className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground"
                />
              </div>

              <button
                onClick={handleUploadPDF}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Upload size={20} />
                Upload PDF
              </button>
            </div>

            {/* PDFs List */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Uploaded PDFs ({pdfs.length})</h3>
              {pdfs.length === 0 ? (
                <p className="text-muted-foreground">No PDFs uploaded yet</p>
              ) : (
                pdfs.map((pdf) => (
                  <div
                    key={pdf._id}
                    className="border rounded-lg p-4 flex justify-between items-center hover:bg-muted/70"
                  >
                    <div>
                      <h3 className="font-bold">{pdf.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {pdf.fileName} • {(pdf.fileSize / 1024 / 1024).toFixed(2)} MB •{' '}
                        {pdf.downloadCount} downloads
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-secondary text-secondary-foreground p-2 rounded hover:opacity-90">
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeletePDF(pdf._id)}
                        className="bg-destructive text-destructive-foreground p-2 rounded hover:opacity-90"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
