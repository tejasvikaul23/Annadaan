const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  userType: {
    type: String,
    required: true,
    enum: ['event_donor', 'ngo', 'volunteer']
  },

  // Event Donor specific fields
  event_type: String,
  capacity: String,

  // Volunteer specific fields
  vehicle_type: String,
  rating: { type: Number, default: 5.0 },
  total_deliveries: { type: Number, default: 0 },
  area_coverage: [String],

  // NGO specific fields
  type: String, // ngo, charitable_trust, etc.
  services: [String],

  // Common fields
  address: {
    street: String,
    area: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: [Number]
  },

  registration_date: { type: Date, default: Date.now },
  verified: { type: Boolean, default: true },
  status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
