// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Avoid forcing Content-Type on GET to prevent unnecessary CORS preflights
const JSON_HEADERS = { 'Content-Type': 'application/json' } as const;

/**
 * Generic API request handler
 */
export const apiRequest = async (
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    headers?: Record<string, string>;
    isFormData?: boolean;
  } = {}
) => {
  const {
    method = 'GET',
    body,
    headers = {},
    isFormData = false,
  } = options;

  const shouldSendJsonHeader = !isFormData && typeof body !== 'undefined' && method !== 'GET';
  const config: RequestInit = {
    method,
    headers: isFormData
      ? { ...headers } // Don't set Content-Type for FormData
      : shouldSendJsonHeader
        ? { ...JSON_HEADERS, ...headers }
        : { ...headers },
  };

  if (body) {
    if (isFormData) {
      config.body = body; // FormData object
    } else {
      config.body = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Handle response
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP ${response.status}`,
      }));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    // For download requests (PDF files)
    if (endpoint.includes('/download')) {
      return response;
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error);
    throw error;
  }
};

export default apiRequest;
