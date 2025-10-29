# Annadaan - First-Time Setup Guide

Welcome to Annadaan! This guide will walk you through the complete setup process step-by-step.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [MongoDB Atlas Setup](#mongodb-atlas-setup)
4. [Environment Configuration](#environment-configuration)
5. [Database Seeding](#database-seeding)
6. [Running the Application](#running-the-application)
7. [Testing the Application](#testing-the-application)
8. [Troubleshooting](#troubleshooting)
9. [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js (v16 or higher)**
   - Download from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     # Should output: v16.x.x or higher
     ```

2. **npm (comes with Node.js)**
   - Verify installation:
     ```bash
     npm --version
     # Should output: 8.x.x or higher
     ```

3. **Git**
   - Download from: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     # Should output: git version 2.x.x
     ```

4. **A Text Editor or IDE**
   - Recommended: VS Code, Sublime Text, or WebStorm

5. **A Modern Web Browser**
   - Chrome, Firefox, Safari, or Edge (latest version)

---

## Installation Steps

### Step 1: Clone the Repository

Open your terminal/command prompt and run:

```bash
# Clone the repository
git clone https://github.com/yourusername/annadaan.git

# Navigate to the project directory
cd annadaan
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- Express.js (web framework)
- Mongoose (MongoDB ODM)
- CORS (cross-origin resource sharing)
- dotenv (environment variables)
- nodemon (development server)

**Expected output:**
```
added 120 packages, and audited 121 packages in 15s
```

---

## MongoDB Atlas Setup

Annadaan uses MongoDB Atlas (cloud database). Follow these steps to set up your database:

### Option 1: Use Your Own MongoDB Atlas Account (Recommended)

#### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Verify your email address

#### Step 2: Create a New Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"FREE"** tier (M0 Sandbox)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to you
5. Name your cluster (e.g., "Annadaan-Cluster")
6. Click **"Create Cluster"**

**Wait 3-5 minutes for cluster creation to complete.**

#### Step 3: Create Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `annadaan_user`
5. Set password: Create a strong password (e.g., `YourSecurePassword123!`)
6. Set role: **"Read and write to any database"**
7. Click **"Add User"**

#### Step 4: Whitelist Your IP Address

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - **Warning:** For production, restrict this to specific IPs
4. Click **"Confirm"**

#### Step 5: Get Connection String

1. Go back to **"Database"** (click "Database" in left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like this):
   ```
   mongodb+srv://annadaan_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<password>` with your actual password**
6. Add database name after `.net/`: `annadaan`

**Final connection string format:**
```
mongodb+srv://annadaan_user:YourSecurePassword123!@cluster0.xxxxx.mongodb.net/annadaan?retryWrites=true&w=majority
```

### Option 2: Use Local MongoDB (Advanced)

If you prefer to run MongoDB locally:

1. Download and install MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongod
   ```
3. Your connection string will be:
   ```
   mongodb://localhost:27017/annadaan
   ```

---

## Environment Configuration

### Step 1: Create .env File

In the project root directory, create a file named `.env`:

**Windows:**
```bash
type nul > .env
```

**macOS/Linux:**
```bash
touch .env
```

### Step 2: Add Environment Variables

Open the `.env` file in your text editor and add:

```env
MONGODB_URI=your_mongodb_connection_string_here
PORT=3000
```

**Example:**
```env
MONGODB_URI=mongodb+srv://annadaan_user:YourSecurePassword123!@cluster0.xxxxx.mongodb.net/annadaan?retryWrites=true&w=majority
PORT=3000
```

**Important:**
- Replace the connection string with your actual MongoDB connection string
- Do NOT commit this file to git (it's already in .gitignore)
- Keep your password secure

### Step 3: Verify Configuration

Create a test file to verify your connection:

```bash
node -e "require('dotenv').config(); console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Configured ✓' : 'Missing ✗');"
```

**Expected output:**
```
MongoDB URI: Configured ✓
```

---

## Database Seeding

Seed the database with sample data to get started quickly.

### Option 1: Basic Demo Data (Recommended for First-Time Users)

Seeds 5 users and ~10 donations:

```bash
npm run seed
```

**Expected output:**
```
MongoDB connected successfully
✅ Seeding completed!

Demo Accounts Created:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Event Donor:
  Email: contact@maharajapalace.com
  Password: demo123

NGO:
  Email: help@akshayapatra.org
  Password: demo123

Volunteer:
  Email: rajesh.volunteer@gmail.com
  Password: demo123

5 users created
10 donations created
```

### Option 2: Large Dataset (For Testing Features)

Seeds 100+ users and 1000+ donations:

```bash
npm run seed:large
```

**Note:** This takes 30-60 seconds to complete.

### Option 3: Massive Dataset (For Performance Testing)

Seeds 1,000,000 donation records:

```bash
npm run seed:million
```

**Warning:** This takes 10-15 minutes and requires good internet connection.

---

## Running the Application

### Step 1: Start the Development Server

```bash
npm run dev
```

**Expected output:**
```
[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
MongoDB connected successfully
✅ Server running on http://localhost:3000
```

### Step 2: Open in Browser

Open your web browser and navigate to:
```
http://localhost:3000
```

**You should see:**
- Landing page with "Annadaan" branding
- Hero section with statistics
- "Register" and "How It Works" buttons

---

## Testing the Application

### Quick Test: Login with Demo Account

1. Click **"Login"** on the landing page
2. Under "Quick Demo Login", click **"Event Donor Demo"**
3. You should be logged into the Event Donor dashboard

**What you should see:**
- Sidebar navigation with: Overview, My अन्नदान, Create अन्नदान, Impact Analytics
- Overview cards showing your donation statistics
- Table of your donations

### Test User Flows

#### Test 1: Event Donor Creates Donation

1. Login as Event Donor (contact@maharajapalace.com / demo123)
2. Click **"Create अन्नदान"** in the sidebar
3. Fill the form:
   - Food Item: `Vegetable Biryani`
   - Quantity: `50`
   - Unit: `kg`
   - Category: `Main Course`
   - Dietary Info: Check `Vegetarian`
   - Expiry Date: Set to 6 hours from now
   - Pickup Time: Set to 2 hours from now
4. Click **"Create Donation"**
5. You should see a success notification
6. Check "My अन्नदान" to see your new donation

#### Test 2: NGO Requests Food

1. Logout (click "Logout" in sidebar)
2. Login as NGO (help@akshayapatra.org / demo123)
3. Click **"Available अन्नदान"** in sidebar
4. You should see available donations
5. Click **"Request अन्नदान"** on any donation
6. Success notification should appear
7. Check "Received Food" to see requested donations

#### Test 3: Volunteer Accepts Pickup

1. Logout
2. Login as Volunteer (rajesh.volunteer@gmail.com / demo123)
3. Click **"Available Pickups"** in sidebar
4. You should see pickup opportunities
5. Click **"Accept Seva"** on any pickup
6. Check "My Deliveries" to see accepted deliveries

### Test Analytics

1. Login as any user type
2. Click **"Impact Analytics"** in sidebar
3. You should see:
   - Impact metrics (plates served, food saved)
   - Doughnut charts showing distribution
   - Line chart showing trends over time

---

## Troubleshooting

### Problem: MongoDB Connection Error

**Error message:**
```
MongoDB connection error: MongooseServerSelectionError
```

**Solutions:**
1. Verify your MongoDB connection string in `.env`
2. Check if your IP is whitelisted in MongoDB Atlas
3. Ensure your password doesn't contain special characters that need URL encoding
4. Try encoding special characters:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`

### Problem: Port Already in Use

**Error message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Windows:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Or change the port in .env:**
```env
PORT=3001
```

### Problem: Module Not Found

**Error message:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Problem: .env File Not Loaded

**Error message:**
```
Error: MongoDB URI is undefined
```

**Solutions:**
1. Ensure `.env` file is in the root directory (same level as server.js)
2. Check file is named exactly `.env` (not `.env.txt`)
3. Restart the server after creating/modifying `.env`

### Problem: Seeding Fails

**Error message:**
```
E11000 duplicate key error collection
```

**Solution:**
```bash
# This means data already exists. Drop the database and re-seed:
# Connect to MongoDB Atlas → Browse Collections → Drop Database "annadaan"

# Or use MongoDB shell:
mongosh "your_connection_string" --eval "db.dropDatabase()"

# Then re-run seed:
npm run seed
```

### Problem: Charts Not Displaying

**Possible causes:**
1. No data in database (run `npm run seed`)
2. Chart.js not loaded (check browser console for errors)
3. JavaScript errors (check browser developer tools)

**Solution:**
1. Open browser Developer Tools (F12)
2. Check Console tab for errors
3. Ensure you have internet connection (Chart.js loads from CDN)

---

## Next Steps

### For Development

1. **Explore the Codebase**
   - `server.js` - Backend API routes
   - `app.js` - Frontend logic
   - `models/` - Database schemas
   - `style.css` - Styling

2. **Read the Documentation**
   - Check `README.md` for comprehensive documentation
   - Review API documentation section

3. **Start Building**
   - Add new features
   - Improve existing functionality
   - Fix bugs

### For Production Deployment

**Security Hardening (Essential!):**
1. Implement password hashing (bcrypt)
2. Add JWT authentication
3. Set up rate limiting
4. Sanitize user inputs
5. Restrict CORS to specific domain
6. Use HTTPS/TLS

**Deployment Options:**
- **Backend:** Heroku, Railway, Render, AWS, DigitalOcean
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Database:** MongoDB Atlas (already cloud-based)

**Recommended deployment guide:**
1. Create production branch
2. Implement security features
3. Set up CI/CD pipeline
4. Deploy to staging environment
5. Test thoroughly
6. Deploy to production

---

## Additional Resources

### Official Documentation
- **Node.js:** https://nodejs.org/docs/
- **Express.js:** https://expressjs.com/
- **MongoDB:** https://docs.mongodb.com/
- **Mongoose:** https://mongoosejs.com/docs/

### Tutorials
- **REST API Development:** https://developer.mozilla.org/en-US/docs/Learn/Server-side
- **MongoDB Atlas Tutorial:** https://www.mongodb.com/docs/atlas/getting-started/
- **JWT Authentication:** https://jwt.io/introduction

### Community Support
- **GitHub Issues:** Report bugs and request features
- **Stack Overflow:** Tag questions with `express`, `mongodb`, `mongoose`
- **MongoDB Community:** https://www.mongodb.com/community/forums/

---

## Getting Help

If you encounter issues not covered in this guide:

1. **Check the logs**
   - Terminal/console output
   - Browser developer tools (F12)

2. **Search existing issues**
   - GitHub repository issues tab
   - Stack Overflow

3. **Ask for help**
   - Create a new GitHub issue
   - Include error messages and steps to reproduce

---

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Run basic seed
npm run seed

# Start development server
npm run dev

# Start production server
npm start

# Check Node.js version
node --version

# Check npm version
npm --version

# View npm scripts
npm run
```

---

## Security Checklist for .env File

- [ ] `.env` file is listed in `.gitignore`
- [ ] MongoDB password is strong (12+ characters, mixed case, numbers, symbols)
- [ ] Connection string is not committed to git
- [ ] Connection string is not shared publicly
- [ ] IP whitelist is configured in MongoDB Atlas
- [ ] Database user has minimal required permissions

---

**Congratulations! You're all set up and ready to contribute to Annadaan.**

Happy coding! 🎉

For questions or support, please refer to the [README.md](README.md) or open an issue on GitHub.
