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

async function seedMillionRecords() {
  try {
    console.log('Fetching existing data...');
    const existingDonations = await Donation.find().limit(1000).lean();

    if (existingDonations.length === 0) {
      console.error('No existing donations found. Please run seed-large.js first.');
      process.exit(1);
    }

    console.log(`Found ${existingDonations.length} existing donations to duplicate`);

    const currentCount = await Donation.countDocuments();
    console.log(`Current donation count: ${currentCount}`);

    const targetCount = 1000000;
    const needed = targetCount - currentCount;

    if (needed <= 0) {
      console.log(`Already have ${currentCount} donations (target: ${targetCount})`);
      process.exit(0);
    }

    console.log(`Need to add ${needed.toLocaleString()} more donations to reach 1 million`);
    console.log('Starting bulk insert...\n');

    const batchSize = 10000; // Insert 10k at a time
    let totalInserted = 0;
    const startTime = Date.now();
    let trackingCounter = currentCount; // Start from current count to ensure uniqueness

    while (totalInserted < needed) {
      const currentBatch = Math.min(batchSize, needed - totalInserted);
      const duplicates = [];

      for (let i = 0; i < currentBatch; i++) {
        const template = existingDonations[i % existingDonations.length];
        trackingCounter++;

        // Create duplicate with unique tracking ID
        const duplicate = {
          ...template,
          _id: new mongoose.Types.ObjectId(),
          tracking_id: 'ANN' + trackingCounter.toString(36).toUpperCase().padStart(8, '0'),
          donation_date: new Date(template.donation_date.getTime() + (i * 60000)), // Offset by minutes
          pickup_time: new Date(template.pickup_time.getTime() + (i * 60000)),
          food_items: template.food_items.map(item => ({
            ...item,
            _id: new mongoose.Types.ObjectId(),
            expiry_date: new Date(item.expiry_date.getTime() + (i * 60000)),
            preparation_date: new Date(item.preparation_date.getTime() + (i * 60000))
          }))
        };

        duplicates.push(duplicate);
      }

      // Bulk insert
      await Donation.insertMany(duplicates, { ordered: false });
      totalInserted += currentBatch;

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const rate = Math.round(totalInserted / elapsed);
      const remaining = needed - totalInserted;
      const eta = remaining > 0 ? Math.round(remaining / rate) : 0;

      process.stdout.write(`\r✓ Inserted: ${totalInserted.toLocaleString()}/${needed.toLocaleString()} | Rate: ${rate}/s | ETA: ${eta}s      `);
    }

    const finalCount = await Donation.countDocuments();
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('\n\n✓ Database populated successfully!');
    console.log(`\nFinal Statistics:`);
    console.log(`- Total Donations: ${finalCount.toLocaleString()}`);
    console.log(`- Total Inserted: ${totalInserted.toLocaleString()}`);
    console.log(`- Time Taken: ${totalTime}s`);
    console.log(`- Average Rate: ${Math.round(totalInserted / totalTime)}/s`);

    process.exit(0);
  } catch (error) {
    console.error('\nError seeding database:', error);
    process.exit(1);
  }
}

seedMillionRecords();
