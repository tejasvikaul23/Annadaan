require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Donation = require('./models/Donation');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample Data
const sampleUsers = [
  // Event Donors
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Maharaja Palace Banquet Hall",
    email: "contact@maharajapalace.com",
    password: "demo123",
    address: {
      street: "MG Road",
      area: "Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      coordinates: [77.6412, 12.9716]
    },
    phone: "+91-9876543210",
    event_type: "wedding_hall",
    capacity: "500 guests",
    verified: true,
    status: "active",
    userType: "event_donor"
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Annapurna Temple Kitchen",
    email: "seva@annapurnatemple.org",
    password: "demo123",
    address: {
      street: "Temple Street",
      area: "Malleshwaram",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560003",
      coordinates: [77.5707, 13.0067]
    },
    phone: "+91-9876543211",
    event_type: "temple_kitchen",
    capacity: "1000 devotees/day",
    verified: true,
    status: "active",
    userType: "event_donor"
  },
  // NGOs
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Akshaya Patra Charitable Trust",
    email: "help@akshayapatra.org",
    password: "demo123",
    type: "ngo",
    address: {
      street: "Hare Krishna Hill",
      area: "Rajajinagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560010",
      coordinates: [77.5568, 12.9899]
    },
    phone: "+91-9876540001",
    capacity: "1500 plates/day",
    services: ["school_meal_program", "community_kitchen", "disaster_relief"],
    verified: true,
    status: "active",
    userType: "ngo"
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Seva Sahayog Foundation",
    email: "contact@sevasahayog.org",
    password: "demo123",
    type: "charitable_trust",
    address: {
      street: "Old Airport Road",
      area: "Marathahalli",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560037",
      coordinates: [77.6977, 12.9591]
    },
    phone: "+91-9876540002",
    capacity: "800 plates/day",
    services: ["orphanage_support", "old_age_home", "street_feeding"],
    verified: true,
    status: "active",
    userType: "ngo"
  },
  // Volunteers
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Rajesh Kumar",
    email: "rajesh.volunteer@gmail.com",
    password: "demo123",
    phone: "+91-9988776655",
    vehicle_type: "bike",
    capacity: "50 plates",
    area_coverage: ["Indiranagar", "Koramangala", "HSR Layout"],
    rating: 4.7,
    total_deliveries: 89,
    status: "active",
    userType: "volunteer"
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Donation.deleteMany({});

    // Insert users
    console.log('Inserting sample users...');
    const insertedUsers = await User.insertMany(sampleUsers);
    console.log(`Inserted ${insertedUsers.length} users`);

    // Get user IDs
    const eventDonor1 = insertedUsers[0]._id.toString();
    const eventDonor2 = insertedUsers[1]._id.toString();
    const ngo1 = insertedUsers[2]._id.toString();
    const ngo2 = insertedUsers[3]._id.toString();
    const volunteer1 = insertedUsers[4]._id.toString();

    // Sample Donations
    const sampleDonations = [
      {
        event_donor_id: eventDonor1,
        ngo_id: ngo1,
        food_items: [
          {
            item_name: "Biryani",
            quantity: 35,
            unit: "kg",
            category: "main_course",
            dietary_info: ["non_veg"],
            expiry_date: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
            preparation_date: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
          },
          {
            item_name: "Dal Makhani",
            quantity: 25,
            unit: "kg",
            category: "main_course",
            dietary_info: ["veg"],
            expiry_date: new Date(Date.now() + 2 * 60 * 60 * 1000),
            preparation_date: new Date(Date.now() - 2 * 60 * 60 * 1000)
          }
        ],
        total_plates: 180,
        estimated_value_inr: 18500,
        donation_date: new Date(Date.now() - 30 * 60 * 1000),
        pickup_time: new Date(Date.now() - 30 * 60 * 1000),
        status: "completed",
        priority: "high",
        special_instructions: "Keep refrigerated until pickup. Wedding food, very good quality.",
        delivery_method: "pickup",
        volunteer_id: volunteer1,
        tracking_id: "TRK001234"
      },
      {
        event_donor_id: eventDonor2,
        ngo_id: ngo2,
        food_items: [
          {
            item_name: "Pongal",
            quantity: 40,
            unit: "kg",
            category: "main_course",
            dietary_info: ["veg"],
            expiry_date: new Date(Date.now() + 4 * 60 * 60 * 1000),
            preparation_date: new Date()
          },
          {
            item_name: "Kesari Bath",
            quantity: 20,
            unit: "kg",
            category: "sweets",
            dietary_info: ["veg"],
            expiry_date: new Date(Date.now() + 4 * 60 * 60 * 1000),
            preparation_date: new Date()
          }
        ],
        total_plates: 200,
        estimated_value_inr: 12000,
        donation_date: new Date(),
        pickup_time: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
        status: "तैयार है",
        priority: "medium",
        special_instructions: "Festival prasadam, handle with care",
        delivery_method: "pickup",
        volunteer_id: null,
        tracking_id: "TRK001235"
      }
    ];

    console.log('Inserting sample donations...');
    const insertedDonations = await Donation.insertMany(sampleDonations);
    console.log(`Inserted ${insertedDonations.length} donations`);

    console.log('\n✓ Database seeded successfully!');
    console.log('\nDemo Accounts:');
    console.log('Event Donor: contact@maharajapalace.com / demo123');
    console.log('NGO: help@akshayapatra.org / demo123');
    console.log('Volunteer: rajesh.volunteer@gmail.com / demo123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
