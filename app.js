// Food Waste Management and Redistribution Platform
// Main Application Logic

// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Global state management
let currentUser = null;
let currentView = 'landing';

// Data caches
let cachedUsers = {
  event_donor: [],
  ngo: [],
  volunteer: []
};
let cachedDonations = [];
let impactStats = {};

// DOM Ready - initialization handled at the bottom of the file

// Initialize application
function initializeApp() {
  // Check if user is logged in (simulate session)
  showLanding();
}

// Event listeners
function setupEventListeners() {
  // Registration form
  document.getElementById('register-form').addEventListener('submit', handleRegistration);
  
  // Login form
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  
  // Donation form
  document.getElementById('donation-form').addEventListener('submit', handleDonationCreation);
  
  // User type selector
  document.querySelectorAll('.user-type-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.user-type-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      toggleFormFields(this.dataset.type);
    });
  });
  
  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      hideModal(modal.id);
    });
  });
  
  // Click outside modal to close
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        hideModal(this.id);
      }
    });
  });
}

// Show/Hide functions
function showLanding() {
  document.getElementById('landing-section').style.display = 'block';
  document.getElementById('dashboard-section').style.display = 'none';
  document.getElementById('nav-guest').style.display = 'flex';
  document.getElementById('nav-user').style.display = 'none';
  currentView = 'landing';
}

async function showDashboard() {
  document.getElementById('landing-section').style.display = 'none';
  document.getElementById('dashboard-section').style.display = 'flex';
  document.getElementById('nav-guest').style.display = 'none';
  document.getElementById('nav-user').style.display = 'flex';
  document.getElementById('nav-username').textContent = currentUser.name;
  currentView = 'dashboard';
  await renderDashboard();
}

function showRegister() {
  showModal('register-modal');
}

function showLogin() {
  showModal('login-modal');
}

function showModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function hideModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// Toggle form fields based on user type
function toggleFormFields(userType) {
  document.querySelectorAll('.event-donor-fields, .volunteer-fields, .ngo-fields')
    .forEach(field => field.style.display = 'none');
  
  if (userType === 'event_donor') {
    document.querySelectorAll('.event-donor-fields')
      .forEach(field => field.style.display = 'block');
  } else if (userType === 'volunteer') {
    document.querySelectorAll('.volunteer-fields')
      .forEach(field => field.style.display = 'block');
  } else if (userType === 'ngo') {
    document.querySelectorAll('.ngo-fields')
      .forEach(field => field.style.display = 'block');
  }
}

// Authentication functions
async function handleRegistration(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userType = document.querySelector('.user-type-btn.active').dataset.type;

  const userData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    phone: formData.get('phone'),
    userType: userType,
    event_type: formData.get('event_type'),
    vehicle: formData.get('vehicle'),
    org_type: formData.get('org_type')
  };

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const result = await response.json();

    if (response.ok) {
      currentUser = result.user;
      hideModal('register-modal');
      showDashboard();
      showNotification(`Registration successful! Welcome to अन्नदान platform. Start your journey of feeding the needy.`, 'success');
    } else {
      showNotification(result.error || 'Registration failed', 'error');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showNotification('Registration failed. Please try again.', 'error');
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
      currentUser = result.user;
      hideModal('login-modal');
      await showDashboard();
      showNotification(`Welcome back, ${result.user.name}! Continue your अन्नदान seva.`, 'success');
    } else {
      showNotification('Invalid email or password. Please try the demo accounts below to explore अन्नदान platform.', 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
    showNotification('Login failed. Please try again.', 'error');
  }
}

async function loginDemo(userType) {
  const demoCredentials = {
    event_donor: { email: 'contact@maharajapalace.com', password: 'demo123' },
    ngo: { email: 'help@akshayapatra.org', password: 'demo123' },
    volunteer: { email: 'rajesh.volunteer@gmail.com', password: 'demo123' }
  };

  const credentials = demoCredentials[userType];
  if (!credentials) return;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const result = await response.json();

    if (response.ok) {
      currentUser = result.user;
      hideModal('login-modal');
      await showDashboard();
      const typeNames = {
        event_donor: 'Event Organizer',
        ngo: 'NGO',
        volunteer: 'Volunteer'
      };
      showNotification(`Demo login successful as ${typeNames[userType]}! Explore the अन्नदान platform.`, 'success');
    }
  } catch (error) {
    console.error('Demo login error:', error);
    showNotification('Demo login failed. Please try again.', 'error');
  }
}

function logout() {
  currentUser = null;
  showLanding();
  showNotification('Logged out successfully! Thank you for your अन्नदान seva.', 'info');
}

// API Helper Functions
async function fetchUsers(userType) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userType}`);
    const users = await response.json();
    cachedUsers[userType] = users;
    return users;
  } catch (error) {
    console.error(`Error fetching ${userType}s:`, error);
    return [];
  }
}

async function fetchDonations(filters = {}) {
  try {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/donations?${params}`);
    const donations = await response.json();
    cachedDonations = donations;
    return donations;
  } catch (error) {
    console.error('Error fetching donations:', error);
    return [];
  }
}

async function fetchStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    const stats = await response.json();
    impactStats = stats;
    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {};
  }
}

// Dashboard rendering
async function renderDashboard() {
  if (!currentUser) return;

  const userType = currentUser.userType;
  
  // Update dashboard title
  document.getElementById('dashboard-title').textContent = `${currentUser.name} Dashboard`;
  
  // Render sidebar menu
  renderSidebarMenu(userType);
  
  // Render dashboard actions
  renderDashboardActions(userType);

  // Fetch necessary data and render default content based on user type
  await fetchStats();
  if (userType === 'event_donor') {
    await renderEventDonorOverview();
  } else if (userType === 'ngo') {
    await renderNgoOverview();
  } else if (userType === 'volunteer') {
    await renderVolunteerOverview();
  }
}

function renderSidebarMenu(userType) {
  const sidebarMenu = document.getElementById('sidebar-menu');
  let menuItems = [];
  
  if (userType === 'event_donor') {
    menuItems = [
      { id: 'overview', icon: 'fa-chart-line', label: 'Overview', active: true },
      { id: 'donations', icon: 'fa-hands', label: 'My अन्नदान' },
      { id: 'create-donation', icon: 'fa-plus', label: 'Create अन्नदान' },
      { id: 'analytics', icon: 'fa-chart-bar', label: 'Impact Analytics' }
    ];
  } else if (userType === 'ngo') {
    menuItems = [
      { id: 'overview', icon: 'fa-chart-line', label: 'Overview', active: true },
      { id: 'available-donations', icon: 'fa-list', label: 'Available अन्नदान' },
      { id: 'received-donations', icon: 'fa-box', label: 'Received Food' },
      { id: 'analytics', icon: 'fa-chart-bar', label: 'Impact Analytics' }
    ];
  } else if (userType === 'volunteer') {
    menuItems = [
      { id: 'overview', icon: 'fa-chart-line', label: 'Overview', active: true },
      { id: 'available-pickups', icon: 'fa-motorcycle', label: 'Available Pickups' },
      { id: 'my-deliveries', icon: 'fa-route', label: 'My Deliveries' },
      { id: 'analytics', icon: 'fa-chart-bar', label: 'My Impact' }
    ];
  }
  
  sidebarMenu.innerHTML = menuItems.map(item => `
    <div class="sidebar-item">
      <a href="#" class="sidebar-link ${item.active ? 'active' : ''}" onclick="switchDashboardView('${item.id}')">
        <i class="fas ${item.icon}"></i>
        <span>${item.label}</span>
      </a>
    </div>
  `).join('');
}

function renderDashboardActions(userType) {
  const actionsContainer = document.getElementById('dashboard-actions');
  let actions = [];
  
  if (userType === 'event_donor') {
    actions = [
      { label: 'Create अन्नदान', onclick: 'showCreateDonation()', class: 'btn--primary' },
      { label: 'View City Map', onclick: 'showMap()', class: 'btn--outline' }
    ];
  } else if (userType === 'ngo') {
    actions = [
      { label: 'Browse अन्नदान', onclick: 'switchDashboardView("available-donations")', class: 'btn--primary' },
      { label: 'View City Map', onclick: 'showMap()', class: 'btn--outline' }
    ];
  } else if (userType === 'volunteer') {
    actions = [
      { label: 'Find Seva Opportunities', onclick: 'switchDashboardView("available-pickups")', class: 'btn--primary' },
      { label: 'View City Map', onclick: 'showMap()', class: 'btn--outline' }
    ];
  }
  
  actionsContainer.innerHTML = actions.map(action => 
    `<button class="btn ${action.class}" onclick="${action.onclick}">${action.label}</button>`
  ).join('');
}

// Dashboard view switching
function switchDashboardView(viewId) {
  // Update active sidebar link
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  });
  
  event.target.closest('.sidebar-link').classList.add('active');
  
  // Render content based on view
  const userType = currentUser.userType;
  
  if (userType === 'event_donor') {
    switch (viewId) {
      case 'overview':
        renderEventDonorOverview();
        break;
      case 'donations':
        renderEventDonorDonations();
        break;
      case 'create-donation':
        showCreateDonation();
        break;
      case 'analytics':
        renderAnalytics();
        break;
    }
  } else if (userType === 'ngo') {
    switch (viewId) {
      case 'overview':
        renderNgoOverview();
        break;
      case 'available-donations':
        renderAvailableDonations();
        break;
      case 'received-donations':
        renderReceivedDonations();
        break;
      case 'analytics':
        renderAnalytics();
        break;
    }
  } else if (userType === 'volunteer') {
    switch (viewId) {
      case 'overview':
        renderVolunteerOverview();
        break;
      case 'available-pickups':
        renderAvailablePickups();
        break;
      case 'my-deliveries':
        renderMyDeliveries();
        break;
      case 'analytics':
        renderAnalytics();
        break;
    }
  }
}

// Event Donor dashboard views
async function renderEventDonorOverview() {
  const content = document.getElementById('dashboard-content');
  const donations = await fetchDonations({ event_donor_id: currentUser._id });
  const donorDonations = donations;
  
  content.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${donorDonations.length}</div>
        <div class="stat-label">Total अन्नदान</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${donorDonations.reduce((sum, d) => sum + d.total_plates, 0)}</div>
        <div class="stat-label">Plates Donated</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">₹${donorDonations.reduce((sum, d) => sum + (d.estimated_value_inr || 0), 0).toLocaleString('en-IN')}</div>
        <div class="stat-label">Food Value Donated</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${donorDonations.reduce((sum, d) => sum + d.total_plates, 0)}</div>
        <div class="stat-label">People Fed (Est.)</div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h3>Recent अन्नदान</h3>
      </div>
      <div class="card-body">
        ${renderDonationsTable(donorDonations.slice(0, 5))}
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h3>Your अन्नदान Impact</h3>
        <p style="font-size: 12px; color: var(--color-text-secondary); margin: 4px 0 0 0;">Visual representation of your contribution to feeding the needy</p>
      </div>
      <div class="card-body">
        <div class="chart-container">
          <canvas id="impactChart"></canvas>
        </div>
      </div>
    </div>
  `;
  
  // Render impact chart
  setTimeout(() => renderImpactChart(), 100);
}

async function renderEventDonorDonations() {
  const content = document.getElementById('dashboard-content');
  const donations = await fetchDonations({ event_donor_id: currentUser._id });
  const donorDonations = donations;
  
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>All My अन्नदान</h3>
        <button class="btn btn--primary" onclick="showCreateDonation()">Create New अन्नदान</button>
      </div>
      <div class="card-body">
        ${renderDonationsTable(donorDonations)}
      </div>
    </div>
  `;
}

// NGO dashboard views
async function renderNgoOverview() {
  const content = document.getElementById('dashboard-content');
  const allDonations = await fetchDonations();
  const receivedDonations = allDonations.filter(d => d.ngo_id === currentUser._id);
  
  content.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${receivedDonations.length}</div>
        <div class="stat-label">अन्नदान Received</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${receivedDonations.reduce((sum, d) => sum + d.total_plates, 0)}</div>
        <div class="stat-label">Plates Received</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${allDonations.filter(d => d.status === 'तैयार है').length}</div>
        <div class="stat-label">Available अन्नदान</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${receivedDonations.reduce((sum, d) => sum + d.total_plates, 0)}</div>
        <div class="stat-label">Beneficiaries Fed</div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h3>Recent अन्नदान Received</h3>
      </div>
      <div class="card-body">
        ${renderDonationsTable(receivedDonations.slice(0, 5))}
      </div>
    </div>
  `;
}

async function renderAvailableDonations() {
  const content = document.getElementById('dashboard-content');
  const allDonations = await fetchDonations();
  const availableDonations = allDonations.filter(d => d.status === 'तैयार है' || d.status === 'available');
  const tableHTML = await renderAvailableDonationsTable(availableDonations);

  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>Available अन्नदान</h3>
      </div>
      <div class="card-body">
        ${tableHTML}
      </div>
    </div>
  `;
}

async function renderReceivedDonations() {
  const content = document.getElementById('dashboard-content');
  const donations = await fetchDonations({ ngo_id: currentUser._id });
  const receivedDonations = donations;
  
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>Received अन्नदान</h3>
      </div>
      <div class="card-body">
        ${renderDonationsTable(receivedDonations)}
      </div>
    </div>
  `;
}

// Volunteer dashboard views
async function renderVolunteerOverview() {
  const content = document.getElementById('dashboard-content');
  const allDonations = await fetchDonations();
  const volunteerDeliveries = allDonations.filter(d => d.volunteer_id === currentUser._id);
  
  content.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${currentUser.total_deliveries}</div>
        <div class="stat-label">Total Seva Deliveries</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${currentUser.rating}/5</div>
        <div class="stat-label">Community Rating</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${allDonations.filter(d => !d.volunteer_id && d.status === 'तैयार है').length}</div>
        <div class="stat-label">Seva Opportunities</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${volunteerDeliveries.reduce((sum, d) => sum + d.total_plates, 0)}</div>
        <div class="stat-label">Plates Delivered</div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h3>My Recent Seva Deliveries</h3>
      </div>
      <div class="card-body">
        ${renderDonationsTable(volunteerDeliveries.slice(0, 5))}
      </div>
    </div>
  `;
}

async function renderAvailablePickups() {
  const content = document.getElementById('dashboard-content');
  const allDonations = await fetchDonations();
  const availablePickups = allDonations.filter(d => !d.volunteer_id && d.status === 'तैयार है');
  const tableHTML = await renderAvailablePickupsTable(availablePickups);

  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>Seva Opportunities - Food Pickup</h3>
      </div>
      <div class="card-body">
        ${tableHTML}
      </div>
    </div>
  `;
}

async function renderMyDeliveries() {
  const content = document.getElementById('dashboard-content');
  const donations = await fetchDonations({ volunteer_id: currentUser._id });
  const myDeliveries = donations;
  
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>My Seva Deliveries</h3>
      </div>
      <div class="card-body">
        ${renderDonationsTable(myDeliveries)}
      </div>
    </div>
  `;
}

// Table rendering functions
function renderDonationsTable(donations) {
  if (donations.length === 0) {
    return '<p class="text-center">No donations found.</p>';
  }
  
  return `
    <table class="table">
      <thead>
        <tr>
          <th>Food Item</th>
          <th>Quantity & Plates</th>
          <th>Pickup Time</th>
          <th>Status</th>
          <th>Tracking ID</th>
        </tr>
      </thead>
      <tbody>
        ${donations.map(donation => `
          <tr>
            <td>${donation.food_items[0].item_name}</td>
            <td>${donation.total_plates} plates (${donation.food_items[0].quantity}${donation.food_items[0].unit})</td>
            <td>${formatDateTime(donation.pickup_time)}</td>
            <td><span class="status status--${getStatusClass(donation.status)}">${donation.status}</span></td>
            <td>${donation.tracking_id}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

async function renderAvailableDonationsTable(donations) {
  if (donations.length === 0) {
    return '<p class="text-center">No available donations at the moment.</p>';
  }

  // Fetch event donors if not cached
  if (cachedUsers.event_donor.length === 0) {
    await fetchUsers('event_donor');
  }

  return `
    <table class="table">
      <thead>
        <tr>
          <th>Event Donor</th>
          <th>Food Item</th>
          <th>Quantity</th>
          <th>Pickup Time</th>
          <th>Expiry</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${donations.map(donation => {
          const eventDonor = cachedUsers.event_donor.find(r => r._id === donation.event_donor_id);
          return `
            <tr>
              <td>${eventDonor ? eventDonor.name : 'Unknown Donor'}</td>
              <td>${donation.food_items[0].item_name}</td>
              <td>${donation.total_plates} plates (${donation.food_items[0].quantity}${donation.food_items[0].unit})</td>
              <td>${formatDateTime(donation.pickup_time)}</td>
              <td>${formatDateTime(donation.food_items[0].expiry_date)}</td>
              <td><button class="btn btn--primary btn--sm" onclick="requestDonation('${donation._id}')">Request अन्नदान</button></td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

async function renderAvailablePickupsTable(pickups) {
  if (pickups.length === 0) {
    return '<p class="text-center">No available pickups at the moment.</p>';
  }

  // Fetch users if not cached
  if (cachedUsers.event_donor.length === 0) {
    await fetchUsers('event_donor');
  }
  if (cachedUsers.ngo.length === 0) {
    await fetchUsers('ngo');
  }

  return `
    <table class="table">
      <thead>
        <tr>
          <th>Event Donor</th>
          <th>Food Item</th>
          <th>Quantity</th>
          <th>Pickup Time</th>
          <th>NGO Destination</th>
          <th>Seva Action</th>
        </tr>
      </thead>
      <tbody>
        ${pickups.map(pickup => {
          const eventDonor = cachedUsers.event_donor.find(r => r._id === pickup.event_donor_id);
          const ngo = cachedUsers.ngo.find(f => f._id === pickup.ngo_id);
          return `
            <tr>
              <td>${eventDonor ? eventDonor.name : 'Unknown Donor'}</td>
              <td>${pickup.food_items[0].item_name}</td>
              <td>${pickup.total_plates} plates</td>
              <td>${formatDateTime(pickup.pickup_time)}</td>
              <td>${ngo ? ngo.name : 'Assignment Pending'}</td>
              <td><button class="btn btn--primary btn--sm" onclick="acceptPickup('${pickup._id}')">Accept Seva</button></td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

// Analytics rendering with clear Indian context
function renderAnalytics() {
  const content = document.getElementById('dashboard-content');
  
  content.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${impactStats.total_donations}</div>
        <div class="stat-label">Total अन्नदान</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${impactStats.plates_served.toLocaleString('en-IN')}</div>
        <div class="stat-label">Plates Served to Needy</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${impactStats.food_saved_kg.toLocaleString('en-IN')}kg</div>
        <div class="stat-label">Food Saved</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">₹${impactStats.value_inr.toLocaleString('en-IN')}</div>
        <div class="stat-label">Food Value Saved</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${impactStats.fuel_saved_liters}L</div>
        <div class="stat-label">Fuel & Energy Saved</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${impactStats.people_fed.toLocaleString('en-IN')}</div>
        <div class="stat-label">People Fed</div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h3>Food Categories Distributed</h3>
        <p style="font-size: 12px; color: var(--color-text-secondary); margin: 4px 0 0 0;">Breakdown of different food types donated</p>
      </div>
      <div class="card-body">
        <div class="chart-container">
          <canvas id="categoryChart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h3>Monthly अन्नदान Impact</h3>
        <p style="font-size: 12px; color: var(--color-text-secondary); margin: 4px 0 0 0;">Number of plates served and people fed over time</p>
      </div>
      <div class="card-body">
        <div class="chart-container">
          <canvas id="trendChart"></canvas>
        </div>
      </div>
    </div>
  `;
  
  // Render charts
  setTimeout(() => {
    renderCategoryChart();
    renderTrendChart();
  }, 100);
}

// Chart rendering functions
function renderImpactChart() {
  const ctx = document.getElementById('impactChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Plates Served to Needy', 'Food Saved (kg)', 'Fuel & Energy Saved (L)'],
      datasets: [{
        data: [impactStats.plates_served/100, impactStats.food_saved_kg, impactStats.fuel_saved_liters],
        backgroundColor: ['#FF6B35', '#138808', '#FFD700']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label;
              let value = context.parsed;
              if (label.includes('Plates')) {
                value = (value * 100).toLocaleString('en-IN');
                return label + ': ' + value;
              } else if (label.includes('Food')) {
                return label + ': ' + value.toLocaleString('en-IN') + ' kg';
              } else {
                return label + ': ' + value + ' liters';
              }
            }
          }
        }
      }
    }
  });
}

function renderCategoryChart() {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Main Course (Rice, Dal, Sabzi)', 'Sweets & Desserts', 'Breakfast Items', 'Snacks & Starters'],
      datasets: [{
        data: [65, 20, 10, 5],
        backgroundColor: ['#FF6B35', '#FF9933', '#138808', '#FFD700']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }
    }
  });
}

function renderTrendChart() {
  const ctx = document.getElementById('trendChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      datasets: [{
        label: 'अन्नदान Events',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        tension: 0.4
      }, {
        label: 'People Fed',
        data: [1200, 1900, 1500, 2500, 2200, 3000],
        borderColor: '#138808',
        backgroundColor: 'rgba(19, 136, 8, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              if (context.datasetIndex === 1) {
                return context.dataset.label + ': ' + context.parsed.y.toLocaleString('en-IN') + ' people';
              }
              return context.dataset.label + ': ' + context.parsed.y;
            }
          }
        }
      }
    }
  });
}

// Action functions
function showCreateDonation() {
  showModal('donation-modal');
}

async function handleDonationCreation(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const dietaryInfo = [];
  document.querySelectorAll('input[name="dietary"]:checked').forEach(checkbox => {
    dietaryInfo.push(checkbox.value);
  });

  const donationData = {
    event_donor_id: currentUser._id,
    item_name: formData.get('item_name'),
    quantity: parseInt(formData.get('quantity')),
    unit: formData.get('unit'),
    category: formData.get('category'),
    dietary_info: dietaryInfo,
    expiry_date: formData.get('expiry_date'),
    pickup_time: formData.get('pickup_time'),
    special_instructions: formData.get('instructions') || ''
  };

  try {
    const response = await fetch(`${API_BASE_URL}/donations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donationData)
    });

    const result = await response.json();

    if (response.ok) {
      hideModal('donation-modal');
      document.getElementById('donation-form').reset();
      const totalPlates = result.donation.total_plates;
      showNotification(`अन्नदान created successfully! ${totalPlates} plates worth ₹${totalPlates * 100} can now feed ${totalPlates} people.`, 'success');

      // Refresh dashboard if on donations view
      if (currentView === 'dashboard') {
        await renderDashboard();
      }
    } else {
      showNotification(result.error || 'Failed to create donation', 'error');
    }
  } catch (error) {
    console.error('Error creating donation:', error);
    showNotification('Failed to create donation. Please try again.', 'error');
  }
}

async function requestDonation(donationId) {
  try {
    const response = await fetch(`${API_BASE_URL}/donations/${donationId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ngo_id: currentUser._id,
        status: 'रास्ते में'
      })
    });

    const result = await response.json();

    if (response.ok) {
      showNotification('अन्नदान requested successfully! Waiting for volunteer pickup.', 'success');
      await renderAvailableDonations();
    } else {
      showNotification(result.error || 'Failed to request donation', 'error');
    }
  } catch (error) {
    console.error('Error requesting donation:', error);
    showNotification('Failed to request donation. Please try again.', 'error');
  }
}

async function acceptPickup(donationId) {
  try {
    const response = await fetch(`${API_BASE_URL}/donations/${donationId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        volunteer_id: currentUser._id,
        status: 'रास्ते में'
      })
    });

    const result = await response.json();

    if (response.ok) {
      showNotification('Seva accepted! Food pickup assigned to you. Check your deliveries for details.', 'success');
      await renderAvailablePickups();
    } else {
      showNotification(result.error || 'Failed to accept pickup', 'error');
    }
  } catch (error) {
    console.error('Error accepting pickup:', error);
    showNotification('Failed to accept pickup. Please try again.', 'error');
  }
}

function showMap() {
  showModal('map-modal');
}

// Utility functions
function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

function getStatusClass(status) {
  const statusMap = {
    'तैयार है': 'warning', // Ready
    'रास्ते में': 'info', // In transit
    'पहुँच गया': 'success', // Delivered
    'रद्द': 'error', // Cancelled
    'completed': 'success',
    'pending': 'warning',
    'available': 'success'
  };
  return statusMap[status] || 'info';
}

function scrollToFeatures() {
  document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' });
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    box-shadow: var(--shadow-lg);
    z-index: 1100;
    max-width: 300px;
    animation: slideIn 0.3s ease;
  `;
  
  // Set color based on type
  if (type === 'success') {
    notification.style.borderColor = 'var(--color-success)';
    notification.style.color = 'var(--color-success)';
  } else if (type === 'error') {
    notification.style.borderColor = 'var(--color-error)';
    notification.style.color = 'var(--color-error)';
  } else if (type === 'warning') {
    notification.style.borderColor = 'var(--color-warning)';
    notification.style.color = 'var(--color-warning)';
  }
  
  notification.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: 12px;">&times;</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Initialize app on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
  });
} else {
  initializeApp();
  setupEventListeners();
}