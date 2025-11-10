# Feature Map & Use Case Diagram

This comprehensive diagram shows all features of the Annadaan platform organized by user type, along with their relationships and dependencies.

```mermaid
graph TB
    subgraph System["🌐 Annadaan Platform"]
        direction TB

        subgraph CoreFeatures["🔐 Core Features (All Users)"]
            Auth[Authentication System<br/>━━━━━━━<br/>• User registration<br/>• Login/Logout<br/>• User type selection<br/>• Demo accounts]

            Profile[User Profile<br/>━━━━━━━<br/>• View profile info<br/>• Contact details<br/>• User type badge<br/>• Registration date]

            Dashboard[Dashboard Access<br/>━━━━━━━<br/>• Role-based views<br/>• Sidebar navigation<br/>• Responsive design<br/>• Mobile support]

            Analytics[Impact Analytics<br/>━━━━━━━<br/>• Platform statistics<br/>• Chart visualizations<br/>• Personal impact<br/>• Trend analysis]
        end

        subgraph EventDonorFeatures["🏛️ Event Donor Features"]
            CreateDonation[Create अन्नदान<br/>━━━━━━━<br/>• Food item details<br/>• Quantity & unit<br/>• Category selection<br/>• Dietary info tags<br/>• Pickup time<br/>• Expiry date<br/>• Special instructions]

            ManageDonations[Manage Donations<br/>━━━━━━━<br/>• View all donations<br/>• Track status<br/>• See assignments<br/>• Filter by status<br/>• Tracking IDs]

            DonorImpact[Donor Impact Metrics<br/>━━━━━━━<br/>• Total donations<br/>• Plates donated<br/>• Value donated (₹)<br/>• People fed<br/>• Food categories]

            DonorAnalytics[Donor Analytics<br/>━━━━━━━<br/>• Donation history<br/>• Impact charts<br/>• Monthly trends<br/>• Category breakdown]
        end

        subgraph NGOFeatures["🏢 NGO Features"]
            BrowseFood[Browse Available Food<br/>━━━━━━━<br/>• View all ready donations<br/>• Food type & quantity<br/>• Donor information<br/>• Pickup times<br/>• Expiry dates<br/>• Filter & search]

            RequestDonation[Request अन्नदान<br/>━━━━━━━<br/>• One-click request<br/>• Confirm pickup<br/>• Status update<br/>• Volunteer assignment<br/>• Notifications]

            ReceivedFood[Received Food Tracking<br/>━━━━━━━<br/>• History of received food<br/>• Delivery status<br/>• Donor details<br/>• Volunteer info<br/>• Distribution records]

            NGOImpact[NGO Impact Metrics<br/>━━━━━━━<br/>• Total food received<br/>• Plates distributed<br/>• Beneficiaries served<br/>• Food categories<br/>• Active requests]

            NGOAnalytics[NGO Analytics<br/>━━━━━━━<br/>• Received food trends<br/>• Category distribution<br/>• Donor relationships<br/>• Monthly reports]
        end

        subgraph VolunteerFeatures["🏍️ Volunteer Features"]
            BrowsePickups[Browse Pickups (Seva)<br/>━━━━━━━<br/>• View available pickups<br/>• Donor location<br/>• NGO destination<br/>• Route details<br/>• Food quantity<br/>• Pickup time]

            AcceptSeva[Accept Seva Assignment<br/>━━━━━━━<br/>• One-click accept<br/>• Get route info<br/>• Donor contact<br/>• NGO contact<br/>• Pickup instructions]

            ManageDeliveries[Manage Deliveries<br/>━━━━━━━<br/>• Active deliveries<br/>• Completed history<br/>• Mark delivered<br/>• Status updates<br/>• Delivery proof]

            VolRating[Volunteer Rating System<br/>━━━━━━━<br/>• Community rating<br/>• Total deliveries<br/>• Success rate<br/>• Feedback<br/>• Badges/Rewards]

            VolImpact[Volunteer Impact<br/>━━━━━━━<br/>• Deliveries completed<br/>• Plates transported<br/>• People helped<br/>• Distance covered<br/>• Seva hours]

            VolAnalytics[Volunteer Analytics<br/>━━━━━━━<br/>• Personal statistics<br/>• Delivery trends<br/>• Coverage areas<br/>• Impact charts]
        end

        subgraph SharedFeatures["🔄 Shared System Features"]
            StatusTracking[Status Tracking<br/>━━━━━━━<br/>• Real-time updates<br/>• Status: तैयार है<br/>• Status: रास्ते में<br/>• Status: पहुँच गया<br/>• Status: रद्द]

            NotificationSystem[Notification System<br/>━━━━━━━<br/>• Success messages<br/>• Error alerts<br/>• Info notifications<br/>• Auto-dismiss]

            DataVisualization[Data Visualization<br/>━━━━━━━<br/>• Chart.js integration<br/>• Doughnut charts<br/>• Line charts<br/>• Stats cards<br/>• Color-coded data]

            ResponsiveUI[Responsive UI<br/>━━━━━━━<br/>• Mobile-first design<br/>• Tablet support<br/>• Desktop optimized<br/>• Touch-friendly]
        end
    end

    subgraph Actors["👥 User Actors"]
        EventDonor[Event Donor<br/>━━━━━━━<br/>Wedding Halls<br/>Temples<br/>Caterers<br/>Corporate Events]

        NGO[NGO<br/>━━━━━━━<br/>Food Banks<br/>Shelters<br/>Charities<br/>Trusts]

        Volunteer[Volunteer<br/>━━━━━━━<br/>Bike Riders<br/>Car Owners<br/>Van Drivers<br/>Community Members]

        Beneficiaries[Beneficiaries<br/>━━━━━━━<br/>Homeless<br/>Underprivileged<br/>Elderly<br/>Disaster-Affected]
    end

    %% Actor to Feature Connections
    EventDonor --> Auth
    EventDonor --> Profile
    EventDonor --> Dashboard
    EventDonor --> CreateDonation
    EventDonor --> ManageDonations
    EventDonor --> DonorImpact
    EventDonor --> DonorAnalytics
    EventDonor --> Analytics

    NGO --> Auth
    NGO --> Profile
    NGO --> Dashboard
    NGO --> BrowseFood
    NGO --> RequestDonation
    NGO --> ReceivedFood
    NGO --> NGOImpact
    NGO --> NGOAnalytics
    NGO --> Analytics

    Volunteer --> Auth
    Volunteer --> Profile
    Volunteer --> Dashboard
    Volunteer --> BrowsePickups
    Volunteer --> AcceptSeva
    Volunteer --> ManageDeliveries
    Volunteer --> VolRating
    Volunteer --> VolImpact
    Volunteer --> VolAnalytics
    Volunteer --> Analytics

    %% Feature Dependencies
    CreateDonation -.->|Creates| StatusTracking
    CreateDonation -.->|Triggers| NotificationSystem
    CreateDonation -.->|Makes available| BrowseFood

    RequestDonation -.->|Updates| StatusTracking
    RequestDonation -.->|Triggers| NotificationSystem
    RequestDonation -.->|Creates pickup for| BrowsePickups

    AcceptSeva -.->|Updates| StatusTracking
    AcceptSeva -.->|Updates| ManageDeliveries
    AcceptSeva -.->|Triggers| NotificationSystem

    ManageDeliveries -.->|Updates| StatusTracking
    ManageDeliveries -.->|Triggers| NotificationSystem
    ManageDeliveries -.->|Records to| ReceivedFood

    DonorAnalytics -.->|Uses| DataVisualization
    NGOAnalytics -.->|Uses| DataVisualization
    VolAnalytics -.->|Uses| DataVisualization
    Analytics -.->|Uses| DataVisualization

    Dashboard -.->|Implements| ResponsiveUI
    BrowseFood -.->|Implements| ResponsiveUI
    ManageDonations -.->|Implements| ResponsiveUI

    %% End Impact
    ReceivedFood -.->|Food distributed to| Beneficiaries
    NGO -.->|Serves| Beneficiaries

    %% Styling
    style CoreFeatures fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style EventDonorFeatures fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style NGOFeatures fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style VolunteerFeatures fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style SharedFeatures fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style Actors fill:#fff9c4,stroke:#f9a825,stroke-width:2px
```

## Use Case Specifications

### UC-001: User Registration & Authentication

**Actors**: All user types
**Precondition**: User has email address and internet access
**Postcondition**: User account created and logged in

**Basic Flow**:
1. User clicks "Register" button
2. System displays registration modal
3. User selects user type (Event Donor, NGO, or Volunteer)
4. System displays type-specific form fields
5. User fills in:
   - Name
   - Email
   - Password
   - Phone
   - Type-specific fields
6. User submits form
7. System validates input
8. System checks email uniqueness
9. System creates user account
10. System logs user in
11. System displays dashboard

**Alternative Flows**:
- **3a**: User clicks demo login button
  - System auto-fills credentials and logs in
- **8a**: Email already exists
  - System displays error: "User already exists"
  - User returns to step 5

**Code Reference**: `app.js:119-156`, `server.js:28-72`

---

### UC-002: Create Food Donation

**Actor**: Event Donor
**Precondition**: User logged in as Event Donor
**Postcondition**: Donation created and visible to NGOs

**Basic Flow**:
1. Event Donor clicks "Create अन्नदान"
2. System displays donation form modal
3. Event Donor enters:
   - Food item name (e.g., "Vegetable Biryani")
   - Quantity (numeric value)
   - Unit (kg, liters, plates, pieces)
   - Category (main_course, sweets, breakfast, snacks, beverages, fruits)
   - Dietary info checkboxes (veg, non_veg, jain, halal, swaminarayan)
   - Expiry date and time
   - Pickup time
   - Special instructions (optional)
4. Event Donor submits form
5. System validates input
6. System calculates:
   - Total plates (based on quantity and unit)
   - Estimated value (plates × ₹100)
7. System generates unique tracking ID
8. System creates donation with status "तैयार है"
9. System stores in database
10. System displays success notification with plate count and value
11. System refreshes donor dashboard
12. Donation becomes visible to all NGOs

**Calculation Rules**:
```
if unit == 'kg': plates = quantity * 4
if unit == 'liters': plates = quantity * 3
if unit == 'plates': plates = quantity
else: plates = quantity / 2

value_inr = plates * 100
```

**Business Rules**:
- Expiry date must be in the future
- Pickup time must be before expiry date
- Minimum quantity: 1
- Tracking ID format: ANN + 6 random uppercase alphanumeric characters

**Code Reference**: `app.js:937-984`, `server.js:155-210`

---

### UC-003: Browse and Request Food (NGO)

**Actor**: NGO
**Precondition**: User logged in as NGO, donations with status "तैयार है" exist
**Postcondition**: Donation requested and status changed to "रास्ते में"

**Basic Flow**:
1. NGO clicks "Available अन्नदान" in sidebar
2. System fetches all donations with status "तैयार है"
3. System fetches event donor details for each donation
4. System displays table with:
   - Event Donor name
   - Food item name
   - Quantity and plates
   - Pickup time
   - Expiry date
   - "Request अन्नदान" button
5. NGO reviews available donations
6. NGO clicks "Request अन्नदान" on desired donation
7. System confirms action
8. System updates donation:
   - Sets ngo_id to current NGO's ID
   - Changes status to "रास्ते में"
   - Updates timestamp
9. System displays success notification
10. System removes donation from available list
11. Donation becomes visible to volunteers for pickup

**Alternative Flows**:
- **2a**: No available donations
  - System displays "No available donations at the moment"
- **8a**: Donation already claimed by another NGO
  - System displays error message
  - User returns to step 2 with refreshed list

**Code Reference**: `app.js:523-539, 986-1009`, `server.js:122-138, 213-237`

---

### UC-004: Accept Pickup and Deliver (Volunteer)

**Actor**: Volunteer
**Precondition**: User logged in as Volunteer, donations with status "रास्ते में" and no volunteer assigned exist
**Postcondition**: Food delivered, donation status "पहुँच गया", impact metrics updated

**Basic Flow**:
1. Volunteer clicks "Available Pickups" in sidebar
2. System fetches donations where:
   - status = "रास्ते में"
   - volunteer_id = null
3. System fetches event donor and NGO details
4. System displays table with:
   - Event Donor name
   - Food item and quantity
   - Pickup time
   - NGO destination name
   - "Accept Seva" button
5. Volunteer reviews pickup opportunities
6. Volunteer clicks "Accept Seva" on desired pickup
7. System updates donation:
   - Sets volunteer_id to current volunteer's ID
   - Status remains "रास्ते में"
8. System displays success notification
9. System moves pickup to "My Deliveries"
10. Volunteer travels to donor location
11. Volunteer picks up food
12. Volunteer transports to NGO location
13. Volunteer delivers food to NGO
14. Volunteer clicks "Mark Delivered" button
15. System updates donation:
    - Changes status to "पहुँच गया"
16. System increments volunteer.total_deliveries
17. System updates platform impact statistics
18. System displays success notification
19. NGO distributes food to beneficiaries

**Business Rules**:
- Volunteer can only have one active delivery at a time (not enforced in current system)
- Delivery must be marked complete within 24 hours
- Rating system not yet implemented

**Code Reference**: `app.js:595-611, 1011-1034`, `server.js:213-237`

---

### UC-005: View Impact Analytics

**Actor**: All user types
**Precondition**: User logged in
**Postcondition**: Analytics dashboard displayed with charts

**Basic Flow**:
1. User clicks "Impact Analytics" in sidebar
2. System fetches platform statistics from API
3. System calculates:
   - Total donations count
   - Total plates served
   - Total food saved (kg)
   - Total value (INR)
   - Fuel saved (hardcoded constant)
   - People fed (equals plates served)
   - Volunteers involved
4. System displays stats cards grid
5. System prepares chart data:
   - Food category distribution (doughnut chart)
   - Monthly donation trends (line chart)
6. System renders charts using Chart.js
7. User views visualized impact

**Chart Types**:
1. **Category Doughnut Chart**:
   - Main Course: 65%
   - Sweets & Desserts: 20%
   - Breakfast Items: 10%
   - Snacks & Starters: 5%

2. **Trend Line Chart**:
   - X-axis: Months (last 6 months)
   - Y-axis: Count/Number
   - Dataset 1: Donation events
   - Dataset 2: People fed

**Note**: Current implementation uses hardcoded chart data. Should be replaced with real aggregations.

**Code Reference**: `app.js:749-810, 813-930`, `server.js:242-271`

---

## Feature Details by User Type

### Event Donor Features Deep Dive

#### Feature: Donation Creation Form

**Input Fields**:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| item_name | text | Yes | Min 3 chars |
| quantity | number | Yes | > 0 |
| unit | select | Yes | Enum values |
| category | select | Yes | Enum values |
| dietary_info | checkbox | No | Array |
| expiry_date | datetime-local | Yes | Future date |
| pickup_time | datetime-local | Yes | Before expiry |
| special_instructions | textarea | No | Max 500 chars |

**Unit Options**:
- kg (kilograms) → 1 kg = 4 plates
- liters → 1 liter = 3 plates
- plates → 1 plate = 1 plate
- pieces → 2 pieces = 1 plate

**Category Options**:
- main_course (Rice, Dal, Sabzi, Roti, Curry)
- sweets (Ladoo, Barfi, Halwa, Gulab Jamun)
- breakfast (Poha, Upma, Idli, Dosa, Paratha)
- snacks (Samosa, Pakora, Vada, Chaat)
- beverages (Chai, Lassi, Juice)
- fruits (Fresh fruits)

**Dietary Info Tags**:
- ✓ Vegetarian
- ✓ Non-vegetarian
- ✓ Jain (No onion, garlic, root vegetables)
- ✓ Halal (Islamic dietary laws)
- ✓ Swaminarayan (Specific Hindu sect dietary rules)

#### Feature: Donation Dashboard

**Stats Cards Displayed**:
1. Total अन्नदान (count of all donations)
2. Plates Donated (sum of total_plates)
3. Food Value Donated (sum of estimated_value_inr, formatted as ₹XX,XXX)
4. People Fed (same as plates donated)

**Donations Table**:
- Sortable by date (newest first)
- Color-coded status badges
- Click tracking ID to view details (not implemented)
- Filter by status (not implemented)

**Impact Chart**:
- Doughnut visualization
- Shows distribution of impact metrics
- Interactive tooltips

---

### NGO Features Deep Dive

#### Feature: Browse Available Food

**Display Information**:
- Event donor name (fetched via API)
- Food item with category icon
- Quantity with unit
- Calculated plates
- Formatted pickup time
- Formatted expiry date
- Time remaining until expiry (not implemented)

**Sorting & Filtering** (Not Implemented):
- Sort by expiry (urgent first)
- Filter by food category
- Filter by dietary restrictions
- Search by donor name

#### Feature: Request Donation Process

**Steps**:
1. User clicks "Request अन्नदान"
2. Confirmation dialog (should be added)
3. PATCH request sent
4. Server updates ngo_id and status
5. Success notification displayed
6. Table refreshed (removed from available)

**What Happens Behind the Scenes**:
- Donation assigned to NGO
- Status changes to "रास्ते में"
- Becomes visible to volunteers
- NGO can track in "Received Food"

**Potential Enhancements**:
- Allow NGO to specify pickup representative
- Add estimated pickup time from NGO side
- Request cancellation before volunteer assignment
- Priority flagging for urgent needs

---

### Volunteer Features Deep Dive

#### Feature: Browse Pickup Opportunities

**Pickup Information Displayed**:
- Donor name and type
- Donor location (address field exists but not displayed)
- Food item and quantity
- NGO destination name
- NGO location (address field exists but not displayed)
- Estimated distance (not implemented)
- Plates to transport

**Ideal Additional Information**:
- Route map showing donor → NGO
- Estimated travel time
- Vehicle requirement (based on quantity)
- Special handling instructions
- Contact numbers

#### Feature: Delivery Management

**Active Deliveries**:
- Shows assigned pickups
- Donor contact info (should be added)
- NGO contact info (should be added)
- Pickup instructions
- Mark delivered button

**Completed Deliveries**:
- History of all completed deliveries
- Date and time completed
- Plates delivered
- Feedback from NGO (not implemented)

**Rating System** (Planned, Not Implemented):
- NGOs rate volunteers after delivery
- Star rating (1-5)
- Comments
- Displayed on volunteer profile
- Affects volunteer reputation

---

### Shared Features Deep Dive

#### Feature: Status Tracking System

**Status Flow**:
```
Created → तैयार है → रास्ते में → पहुँच गया
                ↓
              रद्द (Cancelled)
```

**Status Meanings**:
- **तैयार है** (Ready): Food created, awaiting NGO request
- **रास्ते में** (In Transit): NGO requested, awaiting/in delivery
- **पहुँच गया** (Delivered): Successfully delivered to NGO
- **रद्द** (Cancelled): Donation cancelled by donor/NGO

**Status Badge Colors**:
- तैयार है: Yellow/Warning (needs attention)
- रास्ते में: Blue/Info (in progress)
- पहुँच गया: Green/Success (completed)
- रद्द: Red/Error (cancelled)

#### Feature: Notification System

**Notification Types**:
1. **Success** (Green):
   - "Registration successful!"
   - "अन्नदान created successfully!"
   - "Request confirmed"
   - "Delivery marked complete"

2. **Error** (Red):
   - "User already exists"
   - "Invalid credentials"
   - "Failed to create donation"

3. **Info** (Blue):
   - "Logged out successfully"
   - "Demo login successful"

4. **Warning** (Yellow):
   - Not currently used

**Notification Behavior**:
- Fixed position: Top-right corner
- Auto-dismiss after 5 seconds
- Manual close button (×)
- Slide-in animation
- Stack multiple notifications

**Code Reference**: `app.js:1063-1108`

---

## Feature Implementation Status

### ✅ Fully Implemented Features

1. User registration and authentication
2. Demo account quick login
3. Donation creation with automatic calculations
4. Browse available donations (NGO)
5. Request donations (NGO)
6. Browse available pickups (Volunteer)
7. Accept pickup assignments (Volunteer)
8. Mark deliveries complete (Volunteer)
9. View donation history (all users)
10. Platform-wide statistics
11. Chart visualizations (Chart.js)
12. Responsive dashboard layouts
13. Status tracking system
14. Notification system

### ⚠️ Partially Implemented Features

1. **Analytics Charts**: Uses hardcoded data instead of real aggregations
2. **User Profile**: Basic info displayed, no edit functionality
3. **Address Fields**: Exist in schema but not captured in forms
4. **Rating System**: Schema field exists, not used
5. **Area Coverage**: Volunteer field exists, not used

### ❌ Not Implemented (Future Enhancements)

1. Real-time notifications (email/SMS)
2. Google Maps integration
3. Route optimization
4. Volunteer rating and reviews
5. Photo upload for food items
6. QR code tracking
7. Search and filter functionality
8. Pagination for large datasets
9. Export data to CSV/PDF
10. Multi-language support (regional languages)
11. Direct messaging between users
12. Mobile app (React Native)
13. Push notifications
14. Calendar view for scheduled pickups
15. Recurring donation schedules
16. Food safety compliance tracking
17. Refrigeration/storage tracking
18. Carbon footprint calculator
19. Blockchain-based verification
20. AI-based food quantity estimation
21. Integration with food safety standards
22. Reward/gamification system for volunteers
23. Social media sharing
24. Corporate donation matching
25. Tax receipt generation

---

## Feature Priority Matrix

### High Priority (MVP Complete)
✅ User authentication
✅ Donation CRUD operations
✅ Status workflow
✅ Basic dashboard views
✅ Impact statistics

### Medium Priority (Next Release)
⚠️ Real-time notifications
⚠️ Google Maps integration
⚠️ Search and filtering
⚠️ Volunteer rating system
⚠️ Photo upload

### Low Priority (Future)
❌ Mobile app
❌ Blockchain verification
❌ AI estimations
❌ Multi-language
❌ Gamification

---

## Success Metrics (KPIs)

### Platform Metrics
- Total donations created
- Donation completion rate (delivered / created)
- Average time from creation to delivery
- Food waste prevented (kg)
- Monetary value saved (INR)
- People fed

### User Engagement
- Active donors (monthly)
- Active NGOs (monthly)
- Active volunteers (monthly)
- Average donations per donor
- Average requests per NGO
- Average deliveries per volunteer

### Operational Metrics
- Average pickup time
- Average delivery time
- Cancellation rate
- System uptime
- API response time
- Error rate

### Social Impact
- Beneficiaries served
- Food categories distributed
- Geographic coverage
- Partner organizations
- Environmental impact (CO2 saved)

**Code Reference**: Platform stats calculation in `server.js:242-271`
