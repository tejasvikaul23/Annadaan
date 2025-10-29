const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  event_donor_id: {
    type: String,
    required: true
  },
  ngo_id: {
    type: String,
    default: null
  },
  volunteer_id: {
    type: String,
    default: null
  },

  food_items: [{
    item_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    category: { type: String, required: true },
    dietary_info: [String],
    expiry_date: { type: Date, required: true },
    preparation_date: { type: Date, default: Date.now }
  }],

  total_plates: { type: Number, required: true },
  estimated_value_inr: { type: Number, required: true },
  donation_date: { type: Date, default: Date.now },
  pickup_time: { type: Date, required: true },

  status: {
    type: String,
    default: 'तैयार है',
    enum: ['तैयार है', 'रास्ते में', 'पहुँच गया', 'रद्द', 'completed', 'pending', 'available']
  },

  priority: {
    type: String,
    default: 'medium',
    enum: ['low', 'medium', 'high']
  },

  special_instructions: { type: String, default: '' },
  delivery_method: { type: String, default: 'pickup' },
  tracking_id: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
