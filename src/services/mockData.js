// Built-in Dummy & Mock Data Store for EcoStay Connect
// Enables 100% full-stack functionality even when the backend is offline

export const DUMMY_USERS = [
  {
    _id: '64a000000000000000000101',
    id: '64a000000000000000000101',
    name: 'Traveler Eco User',
    email: 'traveler@ecostay.org',
    password: 'password123',
    role: 'customer',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    savedHomestays: []
  },
  {
    _id: '64a000000000000000000102',
    id: '64a000000000000000000102',
    name: 'Admin User',
    email: 'admin@ecostay.com',
    password: 'adminpassword',
    role: 'admin',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    savedHomestays: []
  },
  {
    _id: '64a000000000000000000103',
    id: '64a000000000000000000103',
    name: 'Devi Prasad',
    email: 'devi.prasad@gmail.com',
    password: 'ownerpassword456',
    role: 'owner',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    savedHomestays: []
  }
];

export const DUMMY_HOMESTAYS = [
  {
    _id: '64a000000000000000000001',
    id: '64a000000000000000000001',
    title: 'The Whispering Pines Sanctuary',
    name: 'The Whispering Pines Sanctuary',
    location: 'Manali, Himachal Pradesh',
    ecoFeatures: ['Solar Powered', 'Rainwater Harvesting', 'Zero Single-Use Plastic'],
    sustainabilityTags: ['Solar Powered', 'Rainwater Harvesting', 'Zero Single-Use Plastic'],
    description: 'A serene wooden cabin nestled among towering pine trees, offering panoramic Himalayan views and a fully eco-conscious living experience.',
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80',
    price: 3500,
    rating: 4.9,
    reviewsCount: 48,
    ownerName: 'Devi Prasad',
    availability: true
  },
  {
    _id: '64a000000000000000000002',
    id: '64a000000000000000000002',
    title: 'Emerald Valley Bamboo Retreat',
    name: 'Emerald Valley Bamboo Retreat',
    location: 'Wayanad, Kerala',
    ecoFeatures: ['Local Materials', 'Organic Farming', 'Compost Systems'],
    sustainabilityTags: ['Local Materials', 'Organic Farming', 'Compost Systems'],
    description: 'Stay in an architectural marvel built entirely from locally sourced bamboo. Experience living in harmony with nature in the heart of the Western Ghats.',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    price: 4200,
    rating: 4.8,
    reviewsCount: 36,
    ownerName: 'Joseph Kuriakose',
    availability: true
  },
  {
    _id: '64a000000000000000000003',
    id: '64a000000000000000000003',
    title: 'Cloud-Kissed Mud Haven',
    name: 'Cloud-Kissed Mud Haven',
    location: 'Coorg, Karnataka',
    ecoFeatures: ['Bio Gas', 'Farm-to-Table Dining', 'Energy Efficient'],
    sustainabilityTags: ['Bio Gas', 'Farm-to-Table Dining', 'Energy Efficient'],
    description: 'Hand-built mud cottage surrounded by lush coffee plantations. Offers farm-to-table dining, local bird watching guide, and carbon-neutral stays.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    price: 2800,
    rating: 4.7,
    reviewsCount: 29,
    ownerName: 'Kaveri Gowda',
    availability: true
  },
  {
    _id: '64a000000000000000000004',
    id: '64a000000000000000000004',
    title: 'Himalayan Stone Eco-Cottage',
    name: 'Himalayan Stone Eco-Cottage',
    location: 'Almora, Uttarakhand',
    ecoFeatures: ['Recycled Water', 'Zero Waste Policy', 'Cultural Heritage'],
    sustainabilityTags: ['Recycled Water', 'Zero Waste Policy', 'Cultural Heritage'],
    description: 'Reconstructed vintage stone house utilizing traditional hill architecture. Enjoy stargazing, fresh mountain spring water, and locally guided treks.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
    price: 3100,
    rating: 4.9,
    reviewsCount: 42,
    ownerName: 'Bhuvan Joshi',
    availability: true
  },
  {
    _id: '64a000000000000000000005',
    id: '64a000000000000000000005',
    title: 'Ganges Edge Mud Retreat',
    name: 'Ganges Edge Mud Retreat',
    location: 'Rishikesh, Uttarakhand',
    ecoFeatures: ['Solar Energy', 'Vegan Kitchen', 'Natural Cooling'],
    sustainabilityTags: ['Solar Energy', 'Vegan Kitchen', 'Natural Cooling'],
    description: 'Eco-friendly cottages close to the Ganga riverbank. Focuses on yoga, organic herbal gardens, and absolute low-impact, peaceful living.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    price: 2500,
    rating: 4.6,
    reviewsCount: 18,
    ownerName: 'Swami Sivananda Eco Trust',
    availability: true
  },
  {
    _id: '64a000000000000000000006',
    id: '64a000000000000000000006',
    title: 'Teakwood Forest Bungalow',
    name: 'Teakwood Forest Bungalow',
    location: 'Shimla, Himachal Pradesh',
    ecoFeatures: ['Rain Harvesting', 'LED Smart Lighting', 'Local Support'],
    sustainabilityTags: ['Rain Harvesting', 'LED Smart Lighting', 'Local Support'],
    description: 'Experience old-world charm in a colonial-style bungalow managed with modern sustainability standards in deep cedar woods.',
    image: 'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&w=800&q=80',
    price: 3800,
    rating: 4.8,
    reviewsCount: 31,
    ownerName: 'Sunita Sharma',
    availability: true
  }
];

// Local Storage Keys
const STORAGE_KEYS = {
  USERS: 'ecostay_local_users',
  HOMESTAYS: 'ecostay_local_homestays',
  BOOKINGS: 'ecostay_local_bookings'
};

// Initialize localStorage with dummy data if not present
export const initLocalStorageData = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DUMMY_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.HOMESTAYS)) {
    localStorage.setItem(STORAGE_KEYS.HOMESTAYS, JSON.stringify(DUMMY_HOMESTAYS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    const defaultBooking = [
      {
        _id: 'bk_mock_001',
        id: 'bk_mock_001',
        customerName: 'Traveler Eco User',
        email: 'traveler@ecostay.org',
        homestayId: DUMMY_HOMESTAYS[0],
        checkIn: new Date(Date.now() + 86400000 * 2).toISOString(),
        checkOut: new Date(Date.now() + 86400000 * 5).toISOString(),
        guests: 2,
        bookingStatus: 'Confirmed',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(defaultBooking));
  }
};

// Initialize immediately
initLocalStorageData();

// Mock Auth: Login
export const mockLogin = (email, password) => {
  initLocalStorageData();
  const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
  const users = rawUsers ? JSON.parse(rawUsers) : DUMMY_USERS;

  const qEmail = (email || '').trim().toLowerCase();
  
  // Find in pre-seeded or registered users
  let user = users.find(u => u.email.toLowerCase() === qEmail);

  // If not found, allow instant login by auto-creating a traveler session for any valid email
  if (!user) {
    user = {
      _id: 'usr_' + Date.now().toString(36),
      id: 'usr_' + Date.now().toString(36),
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Eco Traveler',
      email: qEmail,
      role: 'customer',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      savedHomestays: []
    };
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  const token = 'mock_jwt_token_' + Date.now() + '_' + Math.random().toString(36).substring(2);

  console.log('\n==================================================');
  console.log('🌿 [ECOSTAY DUMMY AUTH] USER LOGGED IN (DEMO MODE)');
  console.log('==================================================');
  console.log(`Name:  ${user.name}`);
  console.log(`Email: ${user.email}`);
  console.log(`Role:  ${user.role}`);
  console.log('==================================================\n');

  return {
    success: true,
    message: 'Login successful (Demo Mode)',
    token,
    data: user
  };
};

// Mock Auth: Register
export const mockRegister = (userData) => {
  initLocalStorageData();
  const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
  const users = rawUsers ? JSON.parse(rawUsers) : DUMMY_USERS;

  const qEmail = (userData.email || '').trim().toLowerCase();
  const existing = users.find(u => u.email.toLowerCase() === qEmail);

  if (existing) {
    return mockLogin(qEmail, userData.password);
  }

  const newUser = {
    _id: 'usr_' + Date.now().toString(36),
    id: 'usr_' + Date.now().toString(36),
    name: userData.name || 'Eco Traveler',
    email: qEmail,
    role: userData.role || 'customer',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    savedHomestays: []
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

  const token = 'mock_jwt_token_' + Date.now() + '_' + Math.random().toString(36).substring(2);

  console.log('\n==================================================');
  console.log('🌿 [ECOSTAY DUMMY AUTH] NEW USER REGISTERED (DEMO MODE)');
  console.log('==================================================');
  console.log(`Name:  ${newUser.name}`);
  console.log(`Email: ${newUser.email}`);
  console.log(`Role:  ${newUser.role}`);
  console.log('==================================================\n');

  return {
    success: true,
    message: 'Registration successful (Demo Mode)',
    token,
    data: newUser
  };
};

// Mock Homestays
export const getMockHomestays = (locationFilter) => {
  initLocalStorageData();
  const raw = localStorage.getItem(STORAGE_KEYS.HOMESTAYS);
  const homestays = raw ? JSON.parse(raw) : DUMMY_HOMESTAYS;

  if (locationFilter && locationFilter !== 'All') {
    return homestays.filter(h => h.location.toLowerCase().includes(locationFilter.toLowerCase()));
  }
  return homestays;
};

// Mock Bookings: Get All
export const getMockBookings = (currentUserEmail) => {
  initLocalStorageData();
  const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  const bookings = raw ? JSON.parse(raw) : [];

  if (currentUserEmail) {
    const qEmail = currentUserEmail.toLowerCase();
    return bookings.filter(b => b.email && b.email.toLowerCase() === qEmail);
  }
  return bookings;
};

// Mock Bookings: Create
export const createMockBooking = (bookingData) => {
  initLocalStorageData();
  const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  const bookings = raw ? JSON.parse(raw) : [];

  // Find referenced homestay
  const rawHomestays = localStorage.getItem(STORAGE_KEYS.HOMESTAYS);
  const homestays = rawHomestays ? JSON.parse(rawHomestays) : DUMMY_HOMESTAYS;

  const targetHomestay = homestays.find(
    h => h._id === bookingData.homestayId || h.id === bookingData.homestayId
  ) || DUMMY_HOMESTAYS[0];

  const newBooking = {
    _id: 'bk_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
    id: 'bk_' + Date.now().toString(36),
    customerName: bookingData.customerName || 'Eco Guest',
    email: (bookingData.email || '').toLowerCase(),
    homestayId: targetHomestay,
    checkIn: bookingData.checkIn,
    checkOut: bookingData.checkOut,
    guests: bookingData.guests || 2,
    bookingStatus: bookingData.bookingStatus || 'Confirmed',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

  console.log('\n==================================================');
  console.log('🏡 [ECOSTAY DUMMY BOOKING] RESERVATION CREATED (DEMO MODE)');
  console.log('==================================================');
  console.log(`Booking ID: ${newBooking._id}`);
  console.log(`Guest:      ${newBooking.customerName} (${newBooking.email})`);
  console.log(`Homestay:   ${targetHomestay.title || targetHomestay.name}`);
  console.log(`Check-In:   ${new Date(newBooking.checkIn).toLocaleDateString()}`);
  console.log(`Check-Out:  ${new Date(newBooking.checkOut).toLocaleDateString()}`);
  console.log(`Guests:     ${newBooking.guests}`);
  console.log(`Saved in:   Browser LocalStorage (ecostay_local_bookings)`);
  console.log('==================================================\n');

  return {
    success: true,
    message: 'Booking created successfully (Demo Mode)',
    data: newBooking
  };
};

// Mock Bookings: Delete
export const deleteMockBooking = (bookingId) => {
  initLocalStorageData();
  const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  let bookings = raw ? JSON.parse(raw) : [];

  bookings = bookings.filter(b => b._id !== bookingId && b.id !== bookingId);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

  console.log(`[ECOSTAY DUMMY BOOKING] Cancelled booking: ${bookingId}`);

  return {
    success: true,
    message: 'Booking cancelled successfully (Demo Mode)',
    data: { _id: bookingId }
  };
};
