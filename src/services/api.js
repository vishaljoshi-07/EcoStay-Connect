import {
  mockLogin,
  mockRegister,
  getMockHomestays,
  getMockBookings,
  createMockBooking,
  deleteMockBooking,
  generateMockAiResponse,
  DUMMY_HOMESTAYS
} from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper for making API requests with auto Authorization header and graceful mock fallback
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('ecostay_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
  } catch (err) {
    // Only fall back to dummy mock data when the network fails or backend is unreachable
    console.warn(`[API Notice] Backend unreachable (${err.message}). Using local dummy data store for: ${endpoint}`);
    return handleMockFallback(endpoint, options);
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    data = {};
  }

  // If server responded with an error (e.g. 401 Incorrect password, 404 No account, 400 Bad request),
  // DO NOT mask it with mock fallback! Throw the real error so user sees the message.
  if (!response.ok) {
    const errorMsg = data.message || data.error || `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
};

// Mock Fallback Router
const handleMockFallback = (endpoint, options = {}) => {
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};

  // Auth: Login
  if (endpoint === '/users/login' && method === 'POST') {
    return mockLogin(body.email, body.password);
  }

  // Auth: Register
  if (endpoint === '/users/register' && method === 'POST') {
    return mockRegister(body);
  }

  // Auth: Profile
  if (endpoint === '/users/profile') {
    const saved = localStorage.getItem('ecostay_user');
    const user = saved ? JSON.parse(saved) : null;
    return { success: true, data: user };
  }

  // Homestays: Get all / Search / Filter
  if (endpoint.startsWith('/homestays')) {
    if (method === 'GET') {
      const urlParams = new URLSearchParams(endpoint.split('?')[1] || '');
      const location = urlParams.get('location') || 'All';
      const homestays = getMockHomestays(location);
      return { success: true, count: homestays.length, data: homestays };
    }
    if (method === 'POST') {
      const newH = {
        _id: 'hm_' + Date.now().toString(36),
        id: 'hm_' + Date.now().toString(36),
        ...body,
        title: body.title || body.name,
        name: body.title || body.name,
        sustainabilityTags: body.sustainabilityTags || body.ecoFeatures || ['Solar Powered']
      };
      return { success: true, data: newH };
    }
  }

  // Bookings: Get all
  if (endpoint === '/bookings' && method === 'GET') {
    const saved = localStorage.getItem('ecostay_user');
    const user = saved ? JSON.parse(saved) : null;
    const bookings = getMockBookings(user?.email);
    return { success: true, count: bookings.length, data: bookings };
  }

  // Bookings: Create
  if (endpoint === '/bookings' && method === 'POST') {
    return createMockBooking(body);
  }

  // Bookings: Delete
  if (endpoint.startsWith('/bookings/') && method === 'DELETE') {
    const bookingId = endpoint.split('/')[2];
    return deleteMockBooking(bookingId);
  }

  // AI Chat Fallback (Comprehensive dynamic knowledge engine)
  if (endpoint === '/ai/chat' && method === 'POST') {
    const answer = generateMockAiResponse(body.prompt);
    return {
      success: true,
      data: {
        prompt: body.prompt,
        response: answer,
        reply: answer,
        source: 'EcoStay AI Engine (Demo Mode)',
        timestamp: new Date()
      }
    };
  }

  return { success: true, data: [] };
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
  chat: (prompt, customApiKey) => {
    const key = customApiKey || localStorage.getItem('ecostay_gemini_key') || '';
    const headers = key ? { 'x-gemini-api-key': key.trim() } : {};
    return apiFetch('/ai/chat', {
      method: 'POST',
      headers,
      body: JSON.stringify({ prompt }),
    });
  },
};
