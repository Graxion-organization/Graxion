/**
 * Graxion API Client
 * Centralized API calls with JWT token management
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Get stored auth token
 */
function getToken() {
  return localStorage.getItem('graxion_admin_token');
}

/**
 * Set auth token
 */
export function setToken(token) {
  localStorage.setItem('graxion_admin_token', token);
}

/**
 * Remove auth token
 */
export function removeToken() {
  localStorage.removeItem('graxion_admin_token');
}

/**
 * Base fetch wrapper with auth headers
 */
async function request(endpoint, options = {}) {
  const token = getToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Don't stringify body if it's FormData
  if (options.body && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
  } else if (options.body instanceof FormData) {
    // Let browser set Content-Type for FormData
    delete config.headers['Content-Type'];
    config.body = options.body;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      message: data.message || 'Something went wrong',
      data,
    };
  }

  return data;
}

// ============================================
// Admin Auth API
// ============================================

export const adminAPI = {
  checkSetup: () => request('/admin/check-setup'),
  
  setup: (credentials) =>
    request('/admin/setup', {
      method: 'POST',
      body: credentials,
    }),

  login: (credentials) =>
    request('/admin/login', {
      method: 'POST',
      body: credentials,
    }),

  getProfile: () => request('/admin/me'),

  changePassword: (data) =>
    request('/admin/change-password', {
      method: 'PUT',
      body: data,
    }),
};

// ============================================
// Internship API
// ============================================

export const internshipAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/internships?${query}`);
  },

  getStats: () => request('/internships/stats'),

  getById: (id) => request(`/internships/${id}`),

  create: (data) =>
    request('/internships', {
      method: 'POST',
      body: data,
    }),

  update: (id, data) =>
    request(`/internships/${id}`, {
      method: 'PUT',
      body: data,
    }),

  delete: (id) =>
    request(`/internships/${id}`, {
      method: 'DELETE',
    }),

  issueCertificate: (id) =>
    request(`/internships/${id}/issue-certificate`, {
      method: 'POST',
    }),

  bulkDelete: (ids) =>
    request('/internships/bulk/delete', {
      method: 'POST',
      body: { ids },
    }),
};

// ============================================
// Verify API (Public)
// ============================================

export const verifyAPI = {
  byCertificateId: (certificateId) => request(`/verify/${certificateId}`),

  byStudentId: (studentId) =>
    request('/verify/by-student-id', {
      method: 'POST',
      body: { studentId },
    }),

  byEmail: (email) =>
    request('/verify/by-email', {
      method: 'POST',
      body: { email },
    }),
};

// Student API
export const studentAPI = {
  sendOtp: (email) =>
    request('/student/send-otp', {
      method: 'POST',
      body: { email },
    }),

  verifyOtp: (email, otp) =>
    request('/student/verify-otp', {
      method: 'POST',
      body: { email, otp },
    }),

  getDashboard: (token) =>
    request('/student/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
