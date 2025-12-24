import { apiRequest } from './api';

export interface PDFFile {
  fileName: string;
  filePath: string;
  uploadedAt?: string;
  fileSize?: number;
}

export interface SocialLinks {
  discord?: string | null;
  reddit?: string | null;
}

export interface Dashboard {
  _id?: string;
  language: string;
  pdfFile?: PDFFile | null;
  youtubeUrl?: string | null;
  socialLinks?: SocialLinks;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Get all dashboards
export const getDashboards = async (language?: string) => {
  const params = new URLSearchParams();
  if (language) params.append('language', language);

  const query = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/dashboards${query}`);
};

// Get dashboard by language
export const getDashboardByLanguage = async (language: string) => {
  return apiRequest(`/dashboards/${language}`);
};

// Create or update dashboard with PDF
export const createOrUpdateDashboard = async (
  language: string,
  file?: File,
  youtubeUrl?: string,
  socialLinks?: SocialLinks
) => {
  const formData = new FormData();
  formData.append('language', language);

  if (file) {
    formData.append('pdf', file);
  }

  if (youtubeUrl) {
    formData.append('youtubeUrl', youtubeUrl);
  }

  if (socialLinks) {
    if (socialLinks.discord) {
      formData.append('socialLinks[discord]', socialLinks.discord);
    }
    if (socialLinks.reddit) {
      formData.append('socialLinks[reddit]', socialLinks.reddit);
    }
  }

  return apiRequest('/dashboards', {
    method: 'POST',
    body: formData,
    isFormData: true,
  });
};

// Update dashboard links only (no file)
export const updateDashboardLinks = async (
  language: string,
  updates: Partial<Dashboard>
) => {
  return apiRequest(`/dashboards/${language}`, {
    method: 'PUT',
    body: updates,
  });
};

// Delete dashboard
export const deleteDashboard = async (language: string) => {
  return apiRequest(`/dashboards/${language}`, {
    method: 'DELETE',
  });
};

// Download dashboard PDF
export const downloadDashboardPDF = async (language: string, fileName?: string) => {
  const response = await apiRequest(`/dashboards/${language}/download-pdf`);

  if (response instanceof Response) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || `dashboard-${language}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
};
