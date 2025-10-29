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

// Indian cities and areas
const cities = [
  { city: 'Bengaluru', state: 'Karnataka', areas: ['Indiranagar', 'Koramangala', 'Whitefield', 'Jayanagar', 'Malleshwaram', 'HSR Layout', 'BTM Layout', 'Electronic City', 'Marathahalli', 'Rajajinagar'] },
  { city: 'Mumbai', state: 'Maharashtra', areas: ['Andheri', 'Bandra', 'Juhu', 'Powai', 'Malad', 'Dadar', 'Worli', 'Colaba', 'Borivali', 'Thane'] },
  { city: 'Delhi', state: 'Delhi', areas: ['Connaught Place', 'Karol Bagh', 'Dwarka', 'Rohini', 'Lajpat Nagar', 'Saket', 'Vasant Kunj', 'Pitampura', 'Janakpuri', 'Nehru Place'] },
  { city: 'Chennai', state: 'Tamil Nadu', areas: ['T Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'Mylapore', 'Nungambakkam', 'Porur', 'Tambaram', 'Egmore', 'Guindy'] },
  { city: 'Hyderabad', state: 'Telangana', areas: ['Banjara Hills', 'Jubilee Hills', 'Hitech City', 'Gachibowli', 'Kukatpally', 'Madhapur', 'Secunderabad', 'Dilsukhnagar', 'Ameerpet', 'Kondapur'] },
  { city: 'Pune', state: 'Maharashtra', areas: ['Koregaon Park', 'Hinjewadi', 'Viman Nagar', 'Wakad', 'Kothrud', 'Pimpri', 'Deccan', 'Hadapsar', 'Baner', 'Aundh'] },
  { city: 'Kolkata', state: 'West Bengal', areas: ['Salt Lake', 'Park Street', 'Ballygunge', 'Howrah', 'Rajarhat', 'Alipore', 'New Town', 'Dum Dum', 'Behala', 'Jadavpur'] },
  { city: 'Ahmedabad', state: 'Gujarat', areas: ['Satellite', 'Vastrapur', 'Prahlad Nagar', 'Navrangpura', 'Bodakdev', 'Maninagar', 'Ashram Road', 'SG Highway', 'Chandkheda', 'Gota'] }
];

// Event donor names
const eventDonorPrefixes = ['Maharaja', 'Royal', 'Grand', 'Imperial', 'Lotus', 'Heritage', 'Crystal', 'Golden', 'Silver', 'Diamond', 'Pearl', 'Sapphire', 'Emerald', 'Paradise', 'Majestic'];
const eventDonorTypes = ['Palace', 'Garden', 'Terrace', 'Manor', 'Court', 'Hall', 'Resort'];
const eventDonorSuffixes = ['Banquet Hall', 'Convention Center', 'Events', 'Wedding Lawns', 'Celebrations'];

const templeNames = ['Annapurna', 'Lakshmi', 'Venkateswara', 'Balaji', 'Shiva', 'Krishna', 'Rama', 'Hanuman', 'Durga', 'Ganesh'];
const cateringNames = ['Royal Caterers', 'Spice Garden Catering', 'Food Express', 'Tasty Bites', 'Delicious Delights', 'Gourmet Kitchen', 'Chef\'s Special', 'Feast Masters'];

// NGO names
const ngoNames = ['Akshaya Patra', 'Seva Sahayog', 'Annamrita Foundation', 'Food for All', 'Hunger Free', 'Serve the Needy', 'Hope Foundation', 'Care Trust', 'Compassion India', 'Helping Hands'];
const ngoTypes = ['Foundation', 'Trust', 'Charitable Society', 'Welfare Organization', 'Service Society', 'Aid Foundation'];

// Indian food items
const foodItems = [
  { name: 'Biryani', category: 'main_course', dietary: ['non_veg'] },
  { name: 'Veg Biryani', category: 'main_course', dietary: ['veg'] },
  { name: 'Dal Makhani', category: 'main_course', dietary: ['veg'] },
  { name: 'Paneer Butter Masala', category: 'main_course', dietary: ['veg'] },
  { name: 'Roti', category: 'main_course', dietary: ['veg'] },
  { name: 'Naan', category: 'main_course', dietary: ['veg'] },
  { name: 'Rice', category: 'main_course', dietary: ['veg'] },
  { name: 'Sambar', category: 'main_course', dietary: ['veg'] },
  { name: 'Rasam', category: 'main_course', dietary: ['veg'] },
  { name: 'Chole Bhature', category: 'main_course', dietary: ['veg'] },
  { name: 'Pongal', category: 'main_course', dietary: ['veg'] },
  { name: 'Idli', category: 'breakfast', dietary: ['veg'] },
  { name: 'Dosa', category: 'breakfast', dietary: ['veg'] },
  { name: 'Upma', category: 'breakfast', dietary: ['veg'] },
  { name: 'Poha', category: 'breakfast', dietary: ['veg'] },
  { name: 'Gulab Jamun', category: 'sweets', dietary: ['veg'] },
  { name: 'Rasgulla', category: 'sweets', dietary: ['veg'] },
  { name: 'Ladoo', category: 'sweets', dietary: ['veg'] },
  { name: 'Jalebi', category: 'sweets', dietary: ['veg'] },
  { name: 'Kheer', category: 'sweets', dietary: ['veg'] },
  { name: 'Halwa', category: 'sweets', dietary: ['veg'] },
  { name: 'Kesari Bath', category: 'sweets', dietary: ['veg'] },
  { name: 'Samosa', category: 'snacks', dietary: ['veg'] },
  { name: 'Pakora', category: 'snacks', dietary: ['veg'] },
  { name: 'Vada', category: 'snacks', dietary: ['veg'] },
  { name: 'Chicken Curry', category: 'main_course', dietary: ['non_veg'] },
  { name: 'Mutton Curry', category: 'main_course', dietary: ['non_veg'] },
  { name: 'Fish Curry', category: 'main_course', dietary: ['non_veg'] }
];

const firstNames = ['Rajesh', 'Priya', 'Amit', 'Sneha', 'Rahul', 'Anjali', 'Vijay', 'Deepika', 'Arjun', 'Kavya', 'Suresh', 'Meera', 'Anil', 'Pooja', 'Ravi', 'Sita', 'Kiran', 'Lakshmi', 'Manoj', 'Divya'];
const lastNames = ['Kumar', 'Singh', 'Sharma', 'Patel', 'Reddy', 'Nair', 'Iyer', 'Rao', 'Gupta', 'Chopra', 'Mehta', 'Joshi', 'Desai', 'Agarwal', 'Malhotra'];

const vehicleTypes = ['bike', 'car', 'auto_rickshaw', 'tempo', 'van'];
const statuses = ['तैयार है', 'रास्ते में', 'पहुँच गया', 'completed'];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhone() {
  return `+91-${randomNumber(7000000000, 9999999999)}`;
}

function generateEmail(name) {
  return name.toLowerCase().replace(/\s+/g, '') + randomNumber(1, 999) + '@gmail.com';
}

async function generateUsers() {
  console.log('Generating 100+ users...');
  const users = [];

  // Generate 40 Event Donors
  for (let i = 0; i < 40; i++) {
    const cityData = randomElement(cities);
    const area = randomElement(cityData.areas);

    let name;
    const type = randomNumber(1, 3);
    if (type === 1) {
      name = `${randomElement(eventDonorPrefixes)} ${randomElement(eventDonorTypes)} ${randomElement(eventDonorSuffixes)}`;
    } else if (type === 2) {
      name = `${randomElement(templeNames)} Temple Kitchen`;
    } else {
      name = randomElement(cateringNames);
    }

    const eventType = type === 2 ? 'temple_kitchen' : (type === 3 ? 'catering_service' : 'wedding_hall');

    users.push({
      name,
      email: generateEmail(name),
      password: 'demo123',
      phone: generatePhone(),
      userType: 'event_donor',
      event_type: eventType,
      capacity: `${randomNumber(100, 1000)} guests`,
      address: {
        street: `${randomNumber(1, 500)} Main Road`,
        area,
        city: cityData.city,
        state: cityData.state,
        pincode: `${randomNumber(100000, 999999)}`,
        coordinates: [randomNumber(72, 88) + Math.random(), randomNumber(8, 35) + Math.random()]
      },
      verified: true,
      status: 'active'
    });
  }

  // Generate 40 NGOs
  for (let i = 0; i < 40; i++) {
    const cityData = randomElement(cities);
    const area = randomElement(cityData.areas);
    const name = `${randomElement(ngoNames)} ${randomElement(ngoTypes)}`;

    users.push({
      name,
      email: generateEmail(name),
      password: 'demo123',
      phone: generatePhone(),
      userType: 'ngo',
      type: randomElement(['ngo', 'charitable_trust', 'seva_organization', 'orphanage', 'old_age_home']),
      capacity: `${randomNumber(200, 2000)} plates/day`,
      services: ['meal_distribution', 'community_kitchen', 'disaster_relief'].slice(0, randomNumber(1, 3)),
      address: {
        street: `${randomNumber(1, 500)} NGO Street`,
        area,
        city: cityData.city,
        state: cityData.state,
        pincode: `${randomNumber(100000, 999999)}`,
        coordinates: [randomNumber(72, 88) + Math.random(), randomNumber(8, 35) + Math.random()]
      },
      verified: true,
      status: 'active'
    });
  }

  // Generate 20 Volunteers
  for (let i = 0; i < 20; i++) {
    const cityData = randomElement(cities);
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const name = `${firstName} ${lastName}`;

    users.push({
      name,
      email: generateEmail(name),
      password: 'demo123',
      phone: generatePhone(),
      userType: 'volunteer',
      vehicle_type: randomElement(vehicleTypes),
      capacity: `${randomNumber(20, 100)} plates`,
      area_coverage: [randomElement(cityData.areas), randomElement(cityData.areas), randomElement(cityData.areas)],
      rating: (randomNumber(35, 50) / 10),
      total_deliveries: randomNumber(0, 200),
      address: {
        city: cityData.city,
        state: cityData.state
      },
      verified: true,
      status: 'active'
    });
  }

  return users;
}

async function generateDonations(users) {
  console.log('Generating 5000+ donations...');
  const donations = [];

  const eventDonors = users.filter(u => u.userType === 'event_donor');
  const ngos = users.filter(u => u.userType === 'ngo');
  const volunteers = users.filter(u => u.userType === 'volunteer');

  for (let i = 0; i < 5000; i++) {
    const eventDonor = randomElement(eventDonors);
    const ngo = Math.random() > 0.2 ? randomElement(ngos) : null; // 80% have NGO assigned
    const volunteer = ngo && Math.random() > 0.3 ? randomElement(volunteers) : null; // 70% of assigned have volunteer

    const foodItem = randomElement(foodItems);
    const quantity = randomNumber(10, 100);
    const unit = randomElement(['kg', 'plates', 'liters']);

    let totalPlates;
    if (unit === 'plates') {
      totalPlates = quantity;
    } else if (unit === 'kg') {
      totalPlates = Math.round(quantity * 4);
    } else {
      totalPlates = Math.round(quantity * 3);
    }

    // Random date within last 90 days
    const daysAgo = randomNumber(0, 90);
    const donationDate = new Date();
    donationDate.setDate(donationDate.getDate() - daysAgo);

    const pickupDate = new Date(donationDate);
    pickupDate.setHours(pickupDate.getHours() + randomNumber(1, 6));

    const expiryDate = new Date(pickupDate);
    expiryDate.setHours(expiryDate.getHours() + randomNumber(2, 8));

    let status;
    if (!ngo) {
      status = 'तैयार है';
    } else if (!volunteer) {
      status = Math.random() > 0.5 ? 'तैयार है' : 'रास्ते में';
    } else {
      status = randomElement(statuses);
    }

    donations.push({
      event_donor_id: eventDonor._id.toString(),
      ngo_id: ngo ? ngo._id.toString() : null,
      volunteer_id: volunteer ? volunteer._id.toString() : null,
      food_items: [{
        item_name: foodItem.name,
        quantity,
        unit,
        category: foodItem.category,
        dietary_info: foodItem.dietary,
        expiry_date: expiryDate,
        preparation_date: donationDate
      }],
      total_plates: totalPlates,
      estimated_value_inr: totalPlates * randomNumber(80, 150),
      donation_date: donationDate,
      pickup_time: pickupDate,
      status,
      priority: randomElement(['low', 'medium', 'high']),
      special_instructions: Math.random() > 0.7 ? 'Keep refrigerated' : '',
      delivery_method: 'pickup',
      tracking_id: 'ANN' + Math.random().toString(36).substr(2, 6).toUpperCase()
    });

    if ((i + 1) % 500 === 0) {
      console.log(`Generated ${i + 1} donations...`);
    }
  }

  return donations;
}

async function seedLargeDatabase() {
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Donation.deleteMany({});

    // Generate and insert users
    const users = await generateUsers();
    console.log(`Inserting ${users.length} users...`);
    const insertedUsers = await User.insertMany(users);
    console.log(`✓ Inserted ${insertedUsers.length} users`);

    // Generate and insert donations
    const donations = await generateDonations(insertedUsers);
    console.log(`Inserting ${donations.length} donations in batches...`);

    // Insert in batches to avoid timeout
    const batchSize = 500;
    for (let i = 0; i < donations.length; i += batchSize) {
      const batch = donations.slice(i, i + batchSize);
      await Donation.insertMany(batch);
      console.log(`✓ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(donations.length / batchSize)}`);
    }

    console.log('\n✓ Database seeded successfully!');
    console.log(`\nTotal Users: ${insertedUsers.length}`);
    console.log(`- Event Donors: ${insertedUsers.filter(u => u.userType === 'event_donor').length}`);
    console.log(`- NGOs: ${insertedUsers.filter(u => u.userType === 'ngo').length}`);
    console.log(`- Volunteers: ${insertedUsers.filter(u => u.userType === 'volunteer').length}`);
    console.log(`\nTotal Donations: ${donations.length}`);

    console.log('\nDemo Accounts (same as before):');
    console.log('Any user email with password: demo123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedLargeDatabase();
