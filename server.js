require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const User = require('./models/User');
const Donation = require('./models/Donation');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// ============= API ROUTES =============

// ===== Authentication Routes =====

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, userType, event_type, vehicle, org_type } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create user object based on type
    const userData = {
      name,
      email,
      password,
      phone,
      userType,
      verified: true,
      status: 'active'
    };

    // Add type-specific fields
    if (userType === 'event_donor') {
      userData.event_type = event_type;
      userData.capacity = '500 guests';
    } else if (userType === 'volunteer') {
      userData.vehicle_type = vehicle;
      userData.capacity = '50 plates';
      userData.rating = 5.0;
      userData.total_deliveries = 0;
    } else if (userType === 'ngo') {
      userData.type = org_type;
      userData.capacity = '300 plates/day';
      userData.services = ['meal_distribution'];
    }

    const user = new User(userData);
    await user.save();

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ===== User Routes =====

// Get users by type
app.get('/api/users/:userType', async (req, res) => {
  try {
    const users = await User.find({ userType: req.params.userType });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
app.get('/api/users/id/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ===== Donation Routes =====

// Get all donations
app.get('/api/donations', async (req, res) => {
  try {
    const { status, event_donor_id, ngo_id, volunteer_id } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (event_donor_id) filter.event_donor_id = event_donor_id;
    if (ngo_id) filter.ngo_id = ngo_id;
    if (volunteer_id) filter.volunteer_id = volunteer_id;

    const donations = await Donation.find(filter).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// Get donation by ID
app.get('/api/donations/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({ error: 'Failed to fetch donation' });
  }
});

// Create new donation
app.post('/api/donations', async (req, res) => {
  try {
    const {
      event_donor_id,
      item_name,
      quantity,
      unit,
      category,
      dietary_info,
      expiry_date,
      pickup_time,
      special_instructions
    } = req.body;

    // Calculate plates based on unit
    let totalPlates;
    if (unit === 'plates') {
      totalPlates = quantity;
    } else if (unit === 'kg') {
      totalPlates = Math.round(quantity * 4);
    } else if (unit === 'liters') {
      totalPlates = Math.round(quantity * 3);
    } else {
      totalPlates = Math.round(quantity / 2);
    }

    // Generate tracking ID
    const trackingId = 'ANN' + Math.random().toString(36).substr(2, 6).toUpperCase();

    const donation = new Donation({
      event_donor_id,
      food_items: [{
        item_name,
        quantity,
        unit,
        category,
        dietary_info: dietary_info || [],
        expiry_date,
        preparation_date: new Date()
      }],
      total_plates: totalPlates,
      estimated_value_inr: totalPlates * 100,
      pickup_time,
      status: 'तैयार है',
      priority: 'medium',
      special_instructions: special_instructions || '',
      tracking_id: trackingId
    });

    await donation.save();
    res.status(201).json({ success: true, donation });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ error: 'Failed to create donation' });
  }
});

// Update donation (request, accept pickup, etc.)
app.patch('/api/donations/:id', async (req, res) => {
  try {
    const { ngo_id, volunteer_id, status } = req.body;

    const updateData = {};
    if (ngo_id !== undefined) updateData.ngo_id = ngo_id;
    if (volunteer_id !== undefined) updateData.volunteer_id = volunteer_id;
    if (status) updateData.status = status;

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json({ success: true, donation });
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({ error: 'Failed to update donation' });
  }
});

// ===== Statistics Routes =====

// Get impact statistics
app.get('/api/stats', async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const donations = await Donation.find();

    const platesServed = donations.reduce((sum, d) => sum + d.total_plates, 0);
    const valueInr = donations.reduce((sum, d) => sum + (d.estimated_value_inr || 0), 0);
    const foodSavedKg = donations.reduce((sum, d) => {
      const firstItem = d.food_items[0];
      if (firstItem.unit === 'kg') return sum + firstItem.quantity;
      if (firstItem.unit === 'plates') return sum + (firstItem.quantity * 0.25);
      return sum + firstItem.quantity;
    }, 0);

    const volunteerCount = await User.countDocuments({ userType: 'volunteer' });

    res.json({
      total_donations: totalDonations,
      plates_served: platesServed,
      value_inr: valueInr,
      food_saved_kg: Math.round(foodSavedKg),
      fuel_saved_liters: 450,
      people_fed: platesServed,
      volunteers_involved: volunteerCount
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
