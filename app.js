// Food Waste Management and Redistribution Platform
// Main Application Logic

// Global state management
let currentUser = null;
let currentView = 'landing';

// Indian Sample Data Storage
const sampleData = {
  eventDonors: [
    {
      _id: "donor_001",
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
      registration_date: "2024-01-15",
      verified: true,
      status: "active",
      userType: "event_donor"
    },
    {
      _id: "donor_002",
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
      registration_date: "2024-02-20",
      verified: true,
      status: "active",
      userType: "event_donor"
    }
  ],
  ngos: [
    {
      _id: "ngo_001",
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
      registration_date: "2023-11-10",
      verified: true,
      status: "active",
      userType: "ngo"
    },
    {
      _id: "ngo_002",
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
      registration_date: "2023-09-05",
      verified: true,
      status: "active",
      userType: "ngo"
    }
  ],
  volunteers: [
    {
      _id: "vol_001",
      name: "Rajesh Kumar",
      email: "rajesh.volunteer@gmail.com",
      password: "demo123",
      phone: "+91-9988776655",
      vehicle_type: "bike",
      capacity: "50 plates",
      area_coverage: ["Indiranagar", "Koramangala", "HSR Layout"],
      rating: 4.7,
      total_deliveries: 89,
      registration_date: "2023-08-15",
      status: "active",
      userType: "volunteer"
    }
  ],
  donations: [
    {
      _id: "don_001",
      event_donor_id: "donor_001",
      ngo_id: "ngo_001",
      food_items: [
        {
          item_name: "Biryani",
          quantity: 35,
          unit: "kg",
          category: "main_course",
          dietary_info: ["non_veg"],
          expiry_date: "2024-12-01T20:00:00Z",
          preparation_date: "2024-12-01T16:00:00Z"
        },
        {
          item_name: "Dal Makhani",
          quantity: 25,
          unit: "kg",
          category: "main_course",
          dietary_info: ["veg"],
          expiry_date: "2024-12-01T20:00:00Z",
          preparation_date: "2024-12-01T16:00:00Z"
        }
      ],
      total_plates: 180,
      estimated_value_inr: 18500,
      donation_date: "2024-12-01T18:30:00Z",
      pickup_time: "2024-12-01T19:30:00Z",
      status: "completed",
      priority: "high",
      special_instructions: "Keep refrigerated until pickup. Wedding food, very good quality.",
      delivery_method: "pickup",
      volunteer_id: "vol_001",
      tracking_id: "TRK001234"
    },
    {
      _id: "don_002",
      event_donor_id: "donor_002",
      ngo_id: "ngo_002",
      food_items: [
        {
          item_name: "Pongal",
          quantity: 40,
          unit: "kg",
          category: "main_course",
          dietary_info: ["veg"],
          expiry_date: "2024-12-02T18:00:00Z",
          preparation_date: "2024-12-02T14:00:00Z"
        },
        {
          item_name: "Kesari Bath",
          quantity: 20,
          unit: "kg",
          category: "sweets",
          dietary_info: ["veg"],
          expiry_date: "2024-12-02T18:00:00Z",
          preparation_date: "2024-12-02T14:00:00Z"
        }
      ],
      total_plates: 200,
      estimated_value_inr: 12000,
      donation_date: "2024-12-02T16:30:00Z",
      pickup_time: "2024-12-02T17:30:00Z",
      status: "तैयार है",
      priority: "medium",
      special_instructions: "Festival prasadam, handle with care",
      delivery_method: "pickup",
      volunteer_id: null,
      tracking_id: "TRK001235"
    }
  ]
};

// Impact statistics with clear Indian context
const impactStats = {
  total_donations: 89,
  plates_served: 14500,
  value_inr: 520000,
  food_saved_kg: 2850,
  fuel_saved_liters: 450, // Clear: Petrol/Diesel saved by preventing waste disposal
  people_fed: 14500,
  volunteers_involved: 142
};

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
});

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

function showDashboard() {
  document.getElementById('landing-section').style.display = 'none';
  document.getElementById('dashboard-section').style.display = 'flex';
  document.getElementById('nav-guest').style.display = 'none';
  document.getElementById('nav-user').style.display = 'flex';
  document.getElementById('nav-username').textContent = currentUser.name;
  currentView = 'dashboard';
  renderDashboard();
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
function handleRegistration(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userType = document.querySelector('.user-type-btn.active').dataset.type;
  
  const userData = {
    _id: generateId(),
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    phone: formData.get('phone'),
    userType: userType,
    registration_date: new Date().toISOString().split('T')[0],
    verified: true,
    status: 'active'
  };
  
  // Add type-specific data
  if (userType === 'event_donor') {
    userData.event_type = formData.get('event_type');
    userData.capacity = '500 guests'; // Default capacity
    sampleData.eventDonors.push(userData);
  } else if (userType === 'volunteer') {
    userData.vehicle_type = formData.get('vehicle');
    userData.capacity = '50 plates';
    userData.rating = 5.0;
    userData.total_deliveries = 0;
    sampleData.volunteers.push(userData);
  } else if (userType === 'ngo') {
    userData.type = formData.get('org_type');
    userData.capacity = '300 plates/day';
    userData.services = ['meal_distribution'];
    sampleData.ngos.push(userData);
  }
  
  // Auto-login after registration
  currentUser = userData;
  hideModal('register-modal');
  showDashboard();
  showNotification(`Registration successful! Welcome to अन्नदान platform. Start your journey of feeding the needy.`, 'success');
}

function handleLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get('email');
  const password = formData.get('password');
  
  // Find user in all data sources
  let user = null;
  const allUsers = [
    ...sampleData.eventDonors,
    ...sampleData.ngos,
    ...sampleData.volunteers
  ];
  
  user = allUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    currentUser = user;
    hideModal('login-modal');
    showDashboard();
    showNotification(`Welcome back, ${user.name}! Continue your अन्नदान seva.`, 'success');
  } else {
    showNotification('Invalid email or password. Please try the demo accounts below to explore अन्नदान platform.', 'error');
  }
}

function loginDemo(userType) {
  let user = null;
  
  if (userType === 'event_donor') {
    user = sampleData.eventDonors[0];
  } else if (userType === 'ngo') {
    user = sampleData.ngos[0];
  } else if (userType === 'volunteer') {
    user = sampleData.volunteers[0];
  }
  
  if (user) {
    currentUser = user;
    hideModal('login-modal');
    showDashboard();
    const typeNames = {
      event_donor: 'Event Organizer',
      ngo: 'NGO',
      volunteer: 'Volunteer'
    };
    showNotification(`Demo login successful as ${typeNames[userType]}! Explore the अन्नदान platform.`, 'success');
  }
}

function logout() {
  currentUser = null;
  showLanding();
  showNotification('Logged out successfully! Thank you for your अन्नदान seva.', 'info');
}

// Dashboard rendering
function renderDashboard() {
  if (!currentUser) return;
  
  const userType = currentUser.userType;
  
  // Update dashboard title
  document.getElementById('dashboard-title').textContent = `${currentUser.name} Dashboard`;
  
  // Render sidebar menu
  renderSidebarMenu(userType);
  
  // Render dashboard actions
  renderDashboardActions(userType);
  
  // Render default content based on user type
  if (userType === 'event_donor') {
    renderEventDonorOverview();
  } else if (userType === 'ngo') {
    renderNgoOverview();
  } else if (userType === 'volunteer') {
    renderVolunteerOverview();
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
function renderEventDonorOverview() {
  const content = document.getElementById('dashboard-content');
  const donorDonations = sampleData.donations.filter(d => d.event_donor_id === currentUser._id);
  
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

function renderEventDonorDonations() {
  const content = document.getElementById('dashboard-content');
  const donorDonations = sampleData.donations.filter(d => d.event_donor_id === currentUser._id);
  
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
function renderNgoOverview() {
  const content = document.getElementById('dashboard-content');
  const receivedDonations = sampleData.donations.filter(d => d.ngo_id === currentUser._id);
  
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
        <div class="stat-value">${sampleData.donations.filter(d => d.status === 'तैयार है').length}</div>
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

function renderAvailableDonations() {
  const content = document.getElementById('dashboard-content');
  const availableDonations = sampleData.donations.filter(d => d.status === 'तैयार है' || d.status === 'available');
  
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>Available अन्नदान</h3>
      </div>
      <div class="card-body">
        ${renderAvailableDonationsTable(availableDonations)}
      </div>
    </div>
  `;
}

function renderReceivedDonations() {
  const content = document.getElementById('dashboard-content');
  const receivedDonations = sampleData.donations.filter(d => d.ngo_id === currentUser._id);
  
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
function renderVolunteerOverview() {
  const content = document.getElementById('dashboard-content');
  const volunteerDeliveries = sampleData.donations.filter(d => d.volunteer_id === currentUser._id);
  
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
        <div class="stat-value">${sampleData.donations.filter(d => !d.volunteer_id && d.status === 'तैयार है').length}</div>
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

function renderAvailablePickups() {
  const content = document.getElementById('dashboard-content');
  const availablePickups = sampleData.donations.filter(d => !d.volunteer_id && d.status === 'तैयार है');
  
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>Seva Opportunities - Food Pickup</h3>
      </div>
      <div class="card-body">
        ${renderAvailablePickupsTable(availablePickups)}
      </div>
    </div>
  `;
}

function renderMyDeliveries() {
  const content = document.getElementById('dashboard-content');
  const myDeliveries = sampleData.donations.filter(d => d.volunteer_id === currentUser._id);
  
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

function renderAvailableDonationsTable(donations) {
  if (donations.length === 0) {
    return '<p class="text-center">No available donations at the moment.</p>';
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
          const eventDonor = sampleData.eventDonors.find(r => r._id === donation.event_donor_id);
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

function renderAvailablePickupsTable(pickups) {
  if (pickups.length === 0) {
    return '<p class="text-center">No available pickups at the moment.</p>';
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
          const eventDonor = sampleData.eventDonors.find(r => r._id === pickup.event_donor_id);
          const ngo = sampleData.ngos.find(f => f._id === pickup.ngo_id);
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

function handleDonationCreation(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const dietaryInfo = [];
  document.querySelectorAll('input[name="dietary"]:checked').forEach(checkbox => {
    dietaryInfo.push(checkbox.value);
  });
  
  const quantity = parseInt(formData.get('quantity'));
  const unit = formData.get('unit');
  
  // Calculate plates based on unit
  let totalPlates;
  if (unit === 'plates') {
    totalPlates = quantity;
  } else if (unit === 'kg') {
    totalPlates = Math.round(quantity * 4); // 1kg ≈ 4 plates
  } else if (unit === 'liters') {
    totalPlates = Math.round(quantity * 3); // 1L ≈ 3 plates
  } else {
    totalPlates = Math.round(quantity / 2); // pieces
  }
  
  const donation = {
    _id: generateId(),
    event_donor_id: currentUser._id,
    ngo_id: null, // Will be assigned when requested
    food_items: [{
      item_name: formData.get('item_name'),
      quantity: quantity,
      unit: unit,
      category: formData.get('category'),
      dietary_info: dietaryInfo,
      expiry_date: formData.get('expiry_date'),
      preparation_date: new Date().toISOString()
    }],
    total_plates: totalPlates,
    estimated_value_inr: totalPlates * 100, // ₹100 per plate estimate
    donation_date: new Date().toISOString(),
    pickup_time: formData.get('pickup_time'),
    status: 'तैयार है', // Ready for pickup
    priority: 'medium',
    special_instructions: formData.get('instructions') || '',
    delivery_method: 'pickup',
    volunteer_id: null,
    tracking_id: 'ANN' + Math.random().toString(36).substr(2, 6).toUpperCase()
  };
  
  sampleData.donations.push(donation);
  hideModal('donation-modal');
  document.getElementById('donation-form').reset();
  showNotification(`अन्नदान created successfully! ${totalPlates} plates worth ₹${totalPlates * 100} can now feed ${totalPlates} people.`, 'success');
  
  // Refresh dashboard if on donations view
  if (currentView === 'dashboard') {
    renderDashboard();
  }
}

function requestDonation(donationId) {
  const donation = sampleData.donations.find(d => d._id === donationId);
  if (donation) {
    donation.ngo_id = currentUser._id;
    donation.status = 'रास्ते में'; // Requested/In transit
    showNotification('अन्नदान requested successfully! Waiting for volunteer pickup.', 'success');
    renderAvailableDonations();
  }
}

function acceptPickup(donationId) {
  const donation = sampleData.donations.find(d => d._id === donationId);
  if (donation) {
    donation.volunteer_id = currentUser._id;
    donation.status = 'रास्ते में'; // In transit
    showNotification('Seva accepted! Food pickup assigned to you. Check your deliveries for details.', 'success');
    renderAvailablePickups();
  }
}

function showMap() {
  showModal('map-modal');
}

// Utility functions
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

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
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}