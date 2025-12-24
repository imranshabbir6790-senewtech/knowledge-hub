import { apiRequest } from './api';

export interface PDF {
  _id?: string;
  language: string;
  title: string;
  description?: string;
  fileName: string;
  filePath: string;
  fileSize?: number;
  uploadedBy?: string;
  downloadCount?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PDFResponse {
  success: boolean;
  data: PDF[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// Get all PDFs with pagination
export const getPDFs = async (language?: string, page = 1, limit = 10) => {
  const params = new URLSearchParams();
  if (language) params.append('language', language);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  return apiRequest(`/pdfs?${params.toString()}`);
};

// Get PDF by ID
export const getPDFById = async (id: string) => {
  return apiRequest(`/pdfs/${id}`);
};

// Upload new PDF
export const uploadPDF = async (
  file: File,
  language: string,
  title: string,
  description?: string
) => {
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('language', language);
  formData.append('title', title);

  if (description) {
    formData.append('description', description);
  }

  return apiRequest('/pdfs', {
    method: 'POST',
    body: formData,
    isFormData: true,
  });
};

// Update PDF
export const updatePDF = async (
  id: string,
  file?: File,
  title?: string,
  description?: string
) => {
  const formData = new FormData();

  if (file) {
    formData.append('pdf', file);
  }

  if (title) {
    formData.append('title', title);
  }

  if (description) {
    formData.append('description', description);
  }

  return apiRequest(`/pdfs/${id}`, {
    method: 'PUT',
    body: formData,
    isFormData: true,
  });
};

// Delete PDF
export const deletePDF = async (id: string) => {
  return apiRequest(`/pdfs/${id}`, {
    method: 'DELETE',
  });
};

// Download PDF (increments counter)
export const downloadPDF = async (id: string, fileName?: string) => {
  const response = await apiRequest(`/pdfs/${id}/download`);

  if (response instanceof Response) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
};
