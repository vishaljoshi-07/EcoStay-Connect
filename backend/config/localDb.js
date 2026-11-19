const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    // Handled
  }
}

// Initial seed homestays
const defaultHomestays = [
  {
    _id: '64a000000000000000000001',
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
    availability: true,
    createdAt: new Date('2026-01-01').toISOString(),
    updatedAt: new Date('2026-01-01').toISOString()
  },
  {
    _id: '64a000000000000000000002',
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
    availability: true,
    createdAt: new Date('2026-01-02').toISOString(),
    updatedAt: new Date('2026-01-02').toISOString()
  },
  {
    _id: '64a000000000000000000003',
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
    availability: true,
    createdAt: new Date('2026-01-03').toISOString(),
    updatedAt: new Date('2026-01-03').toISOString()
  },
  {
    _id: '64a000000000000000000004',
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
    availability: true,
    createdAt: new Date('2026-01-04').toISOString(),
    updatedAt: new Date('2026-01-04').toISOString()
  },
  {
    _id: '64a000000000000000000005',
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
    availability: true,
    createdAt: new Date('2026-01-05').toISOString(),
    updatedAt: new Date('2026-01-05').toISOString()
  },
  {
    _id: '64a000000000000000000006',
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
    availability: true,
    createdAt: new Date('2026-01-06').toISOString(),
    updatedAt: new Date('2026-01-06').toISOString()
  }
];

const generateObjectId = () => {
  return crypto.randomBytes(12).toString('hex');
};

class LocalDatabase {
  constructor() {
    this.data = {
      users: [],
      homestays: [],
      bookings: []
    };
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        if (!this.data.users) this.data.users = [];
        if (!this.data.homestays) this.data.homestays = [];
        if (!this.data.bookings) this.data.bookings = [];
      } else {
        this.seedDefaults();
      }
    } catch (err) {
      this.seedDefaults();
    }

    if (!this.data.homestays || this.data.homestays.length === 0) {
      this.data.homestays = defaultHomestays.map(h => ({ ...h }));
      this.save();
    }

    if (!this.data.users || this.data.users.length === 0) {
      this.seedDefaultUsers();
      this.save();
    }
  }

  seedDefaultUsers() {
    const salt = bcrypt.genSaltSync(10);
    this.data.users = [
      {
        _id: '64a000000000000000000101',
        name: 'Traveler Eco User',
        email: 'traveler@ecostay.org',
        password: bcrypt.hashSync('password123', salt),
        role: 'customer',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
        savedHomestays: [],
        createdAt: new Date('2026-01-01').toISOString(),
        updatedAt: new Date('2026-01-01').toISOString()
      },
      {
        _id: '64a000000000000000000102',
        name: 'Admin User',
        email: 'admin@ecostay.com',
        password: bcrypt.hashSync('adminpassword', salt),
        role: 'admin',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
        savedHomestays: [],
        createdAt: new Date('2026-01-01').toISOString(),
        updatedAt: new Date('2026-01-01').toISOString()
      },
      {
        _id: '64a000000000000000000103',
        name: 'Devi Prasad',
        email: 'devi.prasad@gmail.com',
        password: bcrypt.hashSync('ownerpassword456', salt),
        role: 'owner',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
        savedHomestays: [],
        createdAt: new Date('2026-01-01').toISOString(),
        updatedAt: new Date('2026-01-01').toISOString()
      }
    ];
  }

  seedDefaults() {
    this.seedDefaultUsers();
    this.data.homestays = defaultHomestays.map(h => ({ ...h }));
    this.data.bookings = [];
    this.save();
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      // Kept safely in-memory if disk write is blocked by sandbox
    }
  }

  printUserRegistration(user) {
    console.log('\n==================================================');
    console.log('🌿 [ECOSTAY DATABASE] USER REGISTERED');
    console.log('==================================================');
    console.log(`ID:         ${user._id}`);
    console.log(`Name:       ${user.name}`);
    console.log(`Email:      ${user.email}`);
    console.log(`Role:       ${user.role}`);
    console.log(`Time:       ${new Date().toLocaleString()}`);
    console.log(`Database:   backend/data/db.json`);
    console.log('==================================================\n');
  }

  printBookingConfirmation(booking, homestay) {
    const homestayTitle = homestay ? (homestay.title || homestay.name) : (booking.homestayId?.title || booking.homestayId?.name || booking.homestayId);
    console.log('\n==================================================');
    console.log('🏡 [ECOSTAY DATABASE] NEW BOOKING CONFIRMED');
    console.log('==================================================');
    console.log(`Booking ID: ${booking._id}`);
    console.log(`Guest:      ${booking.customerName} (${booking.email})`);
    console.log(`Homestay:   ${homestayTitle}`);
    console.log(`Check-In:   ${new Date(booking.checkIn).toLocaleDateString()}`);
    console.log(`Check-Out:  ${new Date(booking.checkOut).toLocaleDateString()}`);
    console.log(`Guests:     ${booking.guests}`);
    console.log(`Status:     ${booking.bookingStatus}`);
    console.log(`Time:       ${new Date().toLocaleString()}`);
    console.log(`Database:   backend/data/db.json`);
    console.log('==================================================\n');
  }
}

const localDbInstance = new LocalDatabase();

const wrapDoc = (collectionName, doc) => {
  if (!doc) return null;
  const clone = { ...doc };

  if (collectionName === 'homestays') {
    if (!clone.name) clone.name = clone.title;
    if (!clone.title) clone.title = clone.name;
    if (!clone.sustainabilityTags) clone.sustainabilityTags = clone.ecoFeatures || [];
    if (!clone.ecoFeatures) clone.ecoFeatures = clone.sustainabilityTags || [];
  }

  const wrapped = {
    ...clone,
    _id: clone._id,
    id: clone._id,
    save: async function () {
      const idx = localDbInstance.data[collectionName].findIndex(d => d._id === this._id);
      this.updatedAt = new Date().toISOString();
      const plainObj = { ...this };
      delete plainObj.save;
      delete plainObj.toJSON;
      delete plainObj.toObject;
      delete plainObj.matchPassword;

      if (idx !== -1) {
        localDbInstance.data[collectionName][idx] = plainObj;
      } else {
        localDbInstance.data[collectionName].push(plainObj);
      }
      localDbInstance.save();
      return this;
    },
    toJSON: function () {
      const out = { ...this };
      delete out.password;
      delete out.save;
      delete out.toJSON;
      delete out.toObject;
      delete out.matchPassword;
      return out;
    },
    toObject: function () {
      return this.toJSON();
    }
  };

  if (collectionName === 'users') {
    wrapped.matchPassword = async function (enteredPassword) {
      if (!this.password || !enteredPassword) return false;
      if (typeof this.password === 'string' && this.password.startsWith('$2')) {
        return await bcrypt.compare(enteredPassword, this.password);
      }
      return enteredPassword === this.password;
    };
  }

  return wrapped;
};

class QueryChain {
  constructor(collectionName, promiseOrValue) {
    this.collectionName = collectionName;
    this.promise = Promise.resolve(promiseOrValue);
  }

  sort(sortOptions) {
    this.promise = this.promise.then(items => {
      if (!Array.isArray(items)) return items;
      const sorted = [...items];
      if (sortOptions && sortOptions.createdAt === -1) {
        sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      } else if (sortOptions && sortOptions.createdAt === 1) {
        sorted.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
      }
      return sorted;
    });
    return this;
  }

  populate(field) {
    this.promise = this.promise.then(items => {
      if (Array.isArray(items)) {
        return items.map(item => this._populateDoc(item, field));
      } else if (items) {
        return this._populateDoc(items, field);
      }
      return items;
    });
    return this;
  }

  _populateDoc(doc, field) {
    if (!doc) return doc;
    const cloned = { ...doc };
    if (field === 'homestayId' && cloned.homestayId) {
      const hid = typeof cloned.homestayId === 'object' ? (cloned.homestayId._id || cloned.homestayId.id) : cloned.homestayId;
      const h = localDbInstance.data.homestays.find(item => item._id === hid || item.id === hid);
      cloned.homestayId = h ? wrapDoc('homestays', h) : null;
    }
    if (field === 'savedHomestays' && Array.isArray(cloned.savedHomestays)) {
      cloned.savedHomestays = cloned.savedHomestays.map(hid => {
        const id = typeof hid === 'object' ? (hid._id || hid.id) : hid;
        const h = localDbInstance.data.homestays.find(item => item._id === id || item.id === id);
        return h ? wrapDoc('homestays', h) : hid;
      }).filter(Boolean);
    }
    return wrapDoc(this.collectionName, cloned);
  }

  select(selectFields) {
    this.promise = this.promise.then(itemOrList => {
      const stripField = (doc) => {
        if (!doc) return doc;
        const c = { ...doc };
        if (selectFields && selectFields.includes('-password')) {
          delete c.password;
        }
        return wrapDoc(this.collectionName, c);
      };

      if (Array.isArray(itemOrList)) {
        return itemOrList.map(stripField);
      } else {
        return stripField(itemOrList);
      }
    });
    return this;
  }

  then(resolve, reject) {
    return this.promise.then(resolve, reject);
  }

  catch(reject) {
    return this.promise.catch(reject);
  }
}

const createLocalModel = (collectionName) => {
  return {
    find: (query = {}) => {
      let list = localDbInstance.data[collectionName] || [];

      if (query.email) {
        const qEmail = query.email.toLowerCase();
        list = list.filter(d => d.email && d.email.toLowerCase() === qEmail);
      }

      if (query.location && query.location.$regex) {
        const regex = new RegExp(query.location.$regex, query.location.$options || 'i');
        list = list.filter(d => regex.test(d.location || ''));
      }

      if (query.rating && query.rating.$gte !== undefined) {
        list = list.filter(d => (d.rating || 0) >= query.rating.$gte);
      }

      const wrappedList = list.map(d => wrapDoc(collectionName, d));
      return new QueryChain(collectionName, wrappedList);
    },

    findOne: (query = {}) => {
      let list = localDbInstance.data[collectionName] || [];
      let found = null;

      if (query.$or && Array.isArray(query.$or)) {
        found = list.find(d => {
          return query.$or.some(clause => {
            if (clause.googleId && d.googleId === clause.googleId) return true;
            if (clause.email && d.email && d.email.toLowerCase() === clause.email.toLowerCase()) return true;
            return false;
          });
        });
      } else if (query.email) {
        const qEmail = query.email.toLowerCase();
        found = list.find(d => d.email && d.email.toLowerCase() === qEmail);
      } else if (query._id) {
        found = list.find(d => d._id === query._id.toString());
      } else {
        found = list[0] || null;
      }

      return new QueryChain(collectionName, wrapDoc(collectionName, found));
    },

    findById: (id) => {
      if (!id) return new QueryChain(collectionName, null);
      const strId = id.toString();
      const list = localDbInstance.data[collectionName] || [];
      const found = list.find(d => d._id === strId || d.id === strId);
      return new QueryChain(collectionName, wrapDoc(collectionName, found));
    },

    create: async (data) => {
      const now = new Date().toISOString();
      const doc = {
        ...data,
        _id: data._id || generateObjectId(),
        createdAt: now,
        updatedAt: now
      };

      if (collectionName === 'users') {
        if (!doc.savedHomestays) doc.savedHomestays = [];
        if (doc.email) doc.email = doc.email.toLowerCase();
        if (doc.password && !doc.password.startsWith('$2')) {
          const salt = await bcrypt.genSalt(10);
          doc.password = await bcrypt.hash(doc.password, salt);
        }
      }

      if (collectionName === 'homestays') {
        if (!doc.title && doc.name) doc.title = doc.name;
        if (!doc.ecoFeatures && doc.sustainabilityTags) doc.ecoFeatures = doc.sustainabilityTags;
        if (!doc.name && doc.title) doc.name = doc.title;
        if (!doc.sustainabilityTags && doc.ecoFeatures) doc.sustainabilityTags = doc.ecoFeatures;
      }

      if (collectionName === 'bookings') {
        if (doc.email) doc.email = doc.email.toLowerCase();
        if (!doc.bookingStatus) doc.bookingStatus = 'Confirmed';
      }

      localDbInstance.data[collectionName].push(doc);
      localDbInstance.save();

      const wrapped = wrapDoc(collectionName, doc);

      if (collectionName === 'users') {
        localDbInstance.printUserRegistration(wrapped);
      } else if (collectionName === 'bookings') {
        const homestay = localDbInstance.data.homestays.find(h => h._id === (typeof doc.homestayId === 'object' ? doc.homestayId._id : doc.homestayId));
        localDbInstance.printBookingConfirmation(wrapped, homestay);
      }

      return wrapped;
    },

    findByIdAndUpdate: async (id, update, options = {}) => {
      if (!id) return new QueryChain(collectionName, null);
      const strId = id.toString();
      const list = localDbInstance.data[collectionName] || [];
      const idx = list.findIndex(d => d._id === strId || d.id === strId);
      if (idx === -1) return new QueryChain(collectionName, null);

      const current = list[idx];
      const updated = {
        ...current,
        ...update,
        updatedAt: new Date().toISOString()
      };

      if (collectionName === 'users' && update.password && !update.password.startsWith('$2')) {
        const salt = await bcrypt.genSalt(10);
        updated.password = await bcrypt.hash(update.password, salt);
      }

      list[idx] = updated;
      localDbInstance.save();

      return new QueryChain(collectionName, wrapDoc(collectionName, updated));
    },

    findByIdAndDelete: async (id) => {
      if (!id) return null;
      const strId = id.toString();
      const list = localDbInstance.data[collectionName] || [];
      const idx = list.findIndex(d => d._id === strId || d.id === strId);
      if (idx === -1) return null;

      const [deleted] = list.splice(idx, 1);
      localDbInstance.save();
      console.log(`[ECOSTAY DATABASE] Deleted ${collectionName} record: ${strId}`);
      return wrapDoc(collectionName, deleted);
    }
  };
};

module.exports = {
  localDbInstance,
  createLocalModel,
  generateObjectId
};
