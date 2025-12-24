import React, { useState, useEffect } from 'react';
import { Download, Calendar, HardDrive, Share2, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { pdfService } from '@/services';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [pdf, setPdf] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allPdfs, setAllPdfs] = useState<any[]>([]);

  // Fetch PDF by ID
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await pdfService.getPDFById(id);
          setPdf(response.data);
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load PDF');
        console.error('PDF fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [id]);

  // Fetch all PDFs for related section
  useEffect(() => {
    const fetchAllPdfs = async () => {
      try {
        const response = await pdfService.getPDFs(undefined, 1, 5);
        setAllPdfs(response.data || []);
      } catch (err) {
        console.error('Failed to fetch PDFs:', err);
      }
    };

    fetchAllPdfs();
  }, []);

  const handleDownload = async () => {
    if (pdf && id) {
      try {
        await pdfService.downloadPDF(id, pdf.fileName);
      } catch (err) {
        console.error('Download failed:', err);
      }
    }
  };

  const relatedPdfs = allPdfs.filter((p) => p._id !== id).slice(0, 3);

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-red-500 text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!pdf) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-gray-500 text-center">
          <h1 className="text-2xl font-bold mb-4">PDF Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 font-semibold mb-6"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PDF Viewer Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* PDF Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-6">
                <h1 className="text-3xl font-bold mb-2">{pdf.title}</h1>
                <p className="text-blue-100">{pdf.language.toUpperCase()}</p>
              </div>

              {/* PDF Viewer Placeholder */}
              <div className="bg-gray-100 flex items-center justify-center" style={{ minHeight: '600px' }}>
                <div className="text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-gray-600 font-semibold mb-2">PDF Viewer</p>
                  <p className="text-gray-500 text-sm mb-6">File: {pdf.fileName}</p>
                  <p className="text-gray-500 text-sm">
                    For full PDF viewing experience, download the file
                  </p>
                </div>
              </div>

              {/* PDF Description */}
              {pdf.description && (
                <div className="px-8 py-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold mb-3 text-gray-800">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{pdf.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4">
                <h2 className="text-xl font-bold">Download</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <HardDrive size={16} />
                    <span className="text-sm">{(pdf.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span className="text-sm">
                      {new Date(pdf.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Download size={16} />
                    <span className="text-sm">{pdf.downloadCount || 0} downloads</span>
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={20} />
                  Download PDF
                </button>

                <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>

            {/* PDF Info Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Language</p>
                  <p className="font-semibold text-gray-800">{pdf.language.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Uploaded By</p>
                  <p className="font-semibold text-gray-800">{pdf.uploadedBy || 'Admin'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">File Type</p>
                  <p className="font-semibold text-gray-800">PDF Document</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Upload Date</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(pdf.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related PDFs */}
        {relatedPdfs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Related Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPdfs.map((relPdf) => (
                <div
                  key={relPdf._id}
                  onClick={() => navigate(`/details/${relPdf._id}`)}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-8 flex items-center justify-center">
                    <div className="text-5xl">📄</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors line-clamp-2">
                      {relPdf.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{relPdf.language.toUpperCase()}</p>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-sm transition-colors">
                      View Document
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
