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
  let user = users.find(u => u.email && u.email.toLowerCase() === qEmail);

  // If user is not registered, warn them to create an account first
  if (!user) {
    console.warn(`[ECOSTAY AUTH WARNING] Login failed: No account found for '${qEmail}'. Registration required.`);
    throw new Error('No account found with this email. Please register and create an account first.');
  }

  // Strictly verify password!
  if (!password) {
    throw new Error('Please enter your password.');
  }

  if (user.password && user.password !== password) {
    console.warn(`[ECOSTAY AUTH WARNING] Login failed: Incorrect password for '${qEmail}'.`);
    throw new Error('Incorrect password. Please verify your password and try again.');
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
    data: {
      _id: user._id || user.id,
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      savedHomestays: user.savedHomestays || []
    }
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
    throw new Error('A user with this email address already exists. Please log in instead.');
  }

  const newUser = {
    _id: 'usr_' + Date.now().toString(36),
    id: 'usr_' + Date.now().toString(36),
    name: userData.name || 'Eco Traveler',
    email: qEmail,
    password: userData.password,
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
    data: {
      _id: newUser._id,
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      profileImage: newUser.profileImage,
      savedHomestays: []
    }
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

// Mock AI Response Generator
export const generateMockAiResponse = (userPrompt) => {
  const p = (userPrompt || '').toLowerCase();

  // Greetings / Identity
  if (p === 'hi' || p === 'hello' || p === 'hey' || p.includes('who are you') || p.includes('what can you do')) {
    return `### 🌿 Hello from EcoStay Connect AI!

I am your personal **Sustainable Travel Assistant**. I am here to help you plan responsible, low-impact, and enriching travel experiences across India and beyond.

Here are a few things you can ask me:
* **Custom Itineraries:** *"Plan a 3-day eco-friendly trip to Coorg or Manali"*
* **Homestay Recommendations:** *"Suggest top eco homestays with solar power & organic food"*
* **Zero-Waste Travel:** *"What should I pack for a plastic-free mountain trek?"*
* **Carbon Footprint:** *"How can I travel sustainably across Himachal Pradesh?"*
* **Destination Guides:** *"What are the best sustainable activities in Wayanad or Rishikesh?"*

What journey can I help you design today?`;
  }

  // Coorg
  if (p.includes('coorg')) {
    return `### ☕ Eco-Travel Guide: Coorg (Kodagu, Karnataka)

Known as the *Scotland of India*, Coorg is famous for misty coffee plantations, rolling hills, and rich Kodava biodiversity.

#### 🏡 Recommended Stay:
* **Cloud-Kissed Mud Haven** (Madikeri, Coorg)
  * **Eco Features:** Vernacular mud construction, biogas energy, solar water heating, organic farm-to-table dining.
  * **Starting Price:** ₹2,800/night | **Sustainability Rating:** 4.7 ★

#### 🌿 3-Day Green Itinerary:
* **Day 1:** Arrive via public EV bus from Mysore. Check into your mud cottage. Afternoon plantation walk learning about shade-grown organic coffee and honey harvesting.
* **Day 2:** Early morning birdwatching at Nagarhole boundary. Visit Abbey Falls with a reusable canteen (avoid plastic water bottles). Evening traditional Kodava dinner.
* **Day 3:** Trek to Mandalpatti peak on designated trails to preserve native soil. Support local women cooperatives selling organic spices before heading home.

💡 *Eco Tip: Choose shade-grown coffee brands — they preserve the rainforest canopy and support bird nesting habitats.*`;
  }

  // Manali / Himachal
  if (p.includes('manali') || p.includes('himachal')) {
    return `### 🏔️ Sustainable Travel Guide: Manali & Himachal Pradesh

The Himalayan alpine ecosystem is delicate and needs mindful, conscious travelers.

#### 🏡 Recommended Stay:
* **The Whispering Pines Sanctuary** (Manali, HP)
  * **Eco Features:** 100% Solar-powered, on-site organic apple orchard, rainwater harvesting, zero single-use plastics.
  * **Starting Price:** ₹3,500/night | **Sustainability Rating:** 4.9 ★

#### 🌲 Eco Highlights & Green Tips:
1. **Low-Carbon Transport:** Take the Vande Bharat or overnight electric Volvo bus from Delhi/Chandigarh to minimize road emissions.
2. **Alpine Etiquette:** Stay strictly on marked trails in Solang and Rohtang to prevent soil erosion.
3. **Carry a Water Purifier Bottle:** Refill from natural mountain spring taps instead of buying disposable bottles.
4. **Local Support:** Buy hand-knitted woolen shawls directly from artisan weavers in Kullu.`;
  }

  // Wayanad / Kerala
  if (p.includes('wayanad') || p.includes('kerala')) {
    return `### 🌴 Green Travel Guide: Wayanad & Kerala

Wayanad is part of the Nilgiri Biosphere Reserve, renowned for bamboo architecture, spice forests, and tranquil backwaters.

#### 🏡 Recommended Stay:
* **Emerald Valley Bamboo Retreat** (Wayanad, Kerala)
  * **Eco Features:** Built entirely from renewable local bamboo, zero concrete footprint, natural stream filtration, traditional Ayurveda herb garden.
  * **Starting Price:** ₹4,200/night | **Sustainability Rating:** 4.8 ★

#### 🌿 Must-Experience Activities:
* **Edakkal Caves Exploration:** Trek to the Neolithic petroglyphs with a licensed local guide.
* **Bamboo Craft Workshop:** Learn weaving techniques from indigenous Uravu artisans.
* **Kuruva Island Nature Walk:** A river delta protected by dense evergreen canopy.`;
  }

  // Almora / Uttarakhand
  if (p.includes('almora') || p.includes('uttarakhand') || p.includes('nainital')) {
    return `### ⛰️ Eco Travel Guide: Almora & Kumaon Hills

Experience traditional hill architecture, quiet pine ridges, and spectacular panoramic vistas of Nanda Devi.

#### 🏡 Recommended Stay:
* **Himalayan Stone Eco-Cottage** (Almora, Uttarakhand)
  * **Eco Features:** Restored vintage Kumaoni stone architecture, passive solar warmth, recycled greywater for herb beds, zero waste policy.
  * **Starting Price:** ₹3,100/night | **Sustainability Rating:** 4.9 ★

#### 🌿 Green Recommendations:
* **Binsar Wildlife Sanctuary:** Ideal for peaceful walks through oak and rhododendron forests without motor vehicle noise.
* **Support Local Cooperatives:** Purchase natural wild apricot oil and rhododendron squash from Kumaon village societies.`;
  }

  // Rishikesh
  if (p.includes('rishikesh')) {
    return `### 🌊 Mindful Travel Guide: Rishikesh

The spiritual capital situated on the banks of the sacred Ganges river.

#### 🏡 Recommended Stay:
* **Ganges Edge Mud Retreat** (Rishikesh, Uttarakhand)
  * **Eco Features:** Solar energy, vegan zero-oil Ayurvedic kitchen, natural lime & mud cooling, riverside cleanup initiatives.
  * **Starting Price:** ₹2,500/night | **Sustainability Rating:** 4.6 ★

#### 🧘 Conscious Highlights:
* Sunrise yoga sessions using natural jute mats by the river.
* Participation in community clean-up drives along the holy riverbank.
* Organic farm dining along the Tapovan hills.`;
  }

  // Itinerary
  if (p.includes('itinerary') || p.includes('trip') || p.includes('plan') || p.includes('days')) {
    const daysMatch = p.match(/(\d+)\s*day/);
    const numDays = daysMatch ? parseInt(daysMatch[1]) : 3;

    return `### 🌿 Custom ${numDays}-Day Eco-Friendly Travel Itinerary

Here is your tailored blueprint for an environmentally conscious journey:

**Day 1: Arrival, Settling In & Local Immersion**
* **Morning:** Check into your certified eco-homestay. Relax with a welcome herbal infusion sourced from the property garden.
* **Afternoon:** Tour the sustainable infrastructure — observe solar setups, rainwater systems, and composting methods.
* **Evening:** Farm-to-table dinner featuring seasonal local specialties prepared by the host family.

**Day 2: Low-Impact Exploration & Nature Connection**
* **Morning:** Sunrise nature walk or birdwatching led by an indigenous village guide.
* **Afternoon:** Zero-waste picnic using cloth totes, steel lunch containers, and filtered spring water.
* **Evening:** Traditional handicraft demonstration or stargazing under clear, unpolluted mountain skies.

${numDays >= 3 ? `**Day 3: Cultural Exchange & Community Impact**
* **Morning:** Visit local organic farmers or village artisan cooperatives.
* **Afternoon:** Participate in a tree-planting session or local conservation activity.
* **Evening:** Farewell community meal and carbon-offset calculation review for your journey home.` : ''}

---
💡 **Sustainable Checklist:**
1. Carry a reusable water bottle & cloth shopping bag.
2. Decline single-use hotel toiletries; use natural soap bars.
3. Travel by train or shared EV wherever feasible.`;
  }

  // Homestays
  if (p.includes('homestay') || p.includes('recommend') || p.includes('hotel') || p.includes('stay') || p.includes('book')) {
    return `### 🏡 EcoStay Connect: Featured Sustainable Homestays

All properties listed on EcoStay Connect undergo rigorous verification across 5 key ecological pillars: renewable energy, waste management, water conservation, local community employment, and cultural preservation.

1. **The Whispering Pines Sanctuary** — *Manali, HP* (₹3,500/night)
   * 100% Solar-powered, on-site organic orchard, mountain spring water.
2. **Emerald Valley Bamboo Retreat** — *Wayanad, Kerala* (₹4,200/night)
   * Biophilic bamboo design, zero concrete, native Ayurveda herbal gardens.
3. **Cloud-Kissed Mud Haven** — *Coorg, Karnataka* (₹2,800/night)
   * Hand-built mud cottage, biogas cooking fuel, farm-to-table dining.
4. **Himalayan Stone Eco-Cottage** — *Almora, Uttarakhand* (₹3,100/night)
   * Restored vintage stone architecture, passive solar design, zero waste policy.
5. **Ganges Edge Mud Retreat** — *Rishikesh, Uttarakhand* (₹2,500/night)
   * Solar water heating, vegan kitchen, zero single-use plastic.

*To reserve any homestay, simply click "Book Now" on the homestay card, select your dates and guests, and confirm your booking instantly.*`;
  }

  // Packing
  if (p.includes('pack') || p.includes('waste') || p.includes('plastic') || p.includes('zero')) {
    return `### 🎒 The Ultimate Zero-Waste Travel Packing Checklist

Minimizing non-biodegradable waste is one of the highest impact choices an eco-traveler can make.

#### 🧰 The Essential Eco-Kit:
* **Hydration:** Insulated stainless-steel water bottle + portable UV water purifier or LifeStraw.
* **Dining on the Go:** Compact bamboo cutlery set, collapsible silicone lunchbox, and cloth napkins.
* **Toiletries:** Solid shampoo and conditioner bars, bamboo toothbrush, natural toothpaste tablets, and biodegradable sunscreen.
* **Shopping & Laundry:** 2 compact cotton tote bags and a washable mesh laundry bag.
* **Electronics:** High-capacity solar power bank to recharge your devices sustainably.

#### ⚠️ Single-Use Items to Refuse:
* Plastic straw drinks
* Hotel sample-size shampoo bottles
* Plastic carrier bags
* Disposable plastic cutlery on flights/trains`;
  }

  // Carbon
  if (p.includes('carbon') || p.includes('transport') || p.includes('footprint') || p.includes('emission')) {
    return `### 🚗 How to Minimize Your Travel Carbon Footprint

Transport accounts for approximately **70% of global tourism emissions**. Here is how to lower your impact:

1. **Prioritize Trains over Flights:** Traveling by train emits up to **80% less carbon** per passenger-kilometer compared to short-haul flights.
2. **Embrace Electric Transport:** Look for electric bus services and shared EV cabs.
3. **Slow Travel:** Spend more days in one destination rather than hopping across multiple towns. You immerse deeper and travel fewer miles.
4. **Eat Seasonally and Locally:** Plant-forward, locally sourced meals drastically reduce the food miles associated with your holiday.
5. **Stay in Passive-Energy Homestays:** EcoStay properties utilize natural ventilation, thermal mass (mud/stone), and solar arrays to cut energy demand.`;
  }

  return `### 🌱 Sustainable Travel Guide & Recommendations

Thank you for consulting **EcoStay Connect AI**! Here are the core values guiding sustainable travel:

* **Support Local Economies:** When you book an authentic family-run homestay, your money goes directly to local residents rather than multinational hotel chains.
* **Conserve Fragile Ecosystems:** Avoid single-use plastics, stick to designated hiking trails, and respect wildlife buffer zones.
* **Preserve Cultural Heritage:** Learn a few words in the regional language and honor local dress codes and customs.
* **Lower Your Impact:** Choose accommodations certified for renewable energy, composting, and water harvesting.

*Feel free to ask for specific destination advice (e.g., Coorg, Manali, Wayanad), packing checklists, custom itineraries, or homestay recommendations!*`;
};
