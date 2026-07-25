const API_BASE_URL = 'http://localhost:5000/api';

// Helper for making API requests with auto Authorization header
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('ecostay_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.message || data.error || 'An error occurred during API request';
    throw new Error(errorMsg);
  }

  return data;
};

// Auth API endpoints
export const authApi = {
  login: (credentials) => apiFetch('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  register: (userData) => apiFetch('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  getProfile: () => apiFetch('/users/profile'),
  updateProfile: (profileData) => apiFetch('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),
  toggleSaveHomestay: (homestayId) => apiFetch(`/users/saved-homestays/${homestayId}`, {
    method: 'POST',
  }),
};

// Homestays API endpoints
export const homestayApi = {
  getAll: () => apiFetch('/homestays'),
  getById: (id) => apiFetch(`/homestays/${id}`),
  search: (location) => apiFetch(`/homestays/search?location=${encodeURIComponent(location)}`),
  filter: (rating) => apiFetch(`/homestays/filter?rating=${rating}`),
  create: (data) => apiFetch('/homestays', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiFetch(`/homestays/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiFetch(`/homestays/${id}`, {
    method: 'DELETE',
  }),
};

// Bookings API endpoints
export const bookingApi = {
  getAll: () => apiFetch('/bookings'),
  getById: (id) => apiFetch(`/bookings/${id}`),
  create: (data) => apiFetch('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiFetch(`/bookings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiFetch(`/bookings/${id}`, {
    method: 'DELETE',
  }),
};

// AI Assistant API endpoints
export const aiApi = {
  chat: (prompt) => apiFetch('/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  }),
};
