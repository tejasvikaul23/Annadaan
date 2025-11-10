# Annadaan Project Diagrams

This directory contains comprehensive Mermaid diagrams documenting the complete Annadaan food donation platform architecture, workflows, and features.

## 📋 Diagram Index

### 1. System Architecture
**File**: `01-system-architecture.md`

Shows the complete technology stack including:
- Frontend layer (HTML, CSS, JavaScript, Chart.js)
- Backend layer (Node.js, Express.js, middleware)
- Data access layer (Mongoose ODM)
- Database (MongoDB Atlas)
- Communication flow between layers

**Best for**: Understanding the overall system structure and technology choices

---

### 2. Entity Relationship Diagram (ERD)
**File**: `02-entity-relationship-diagram.md`

Detailed database schema showing:
- User entity with all fields and types
- Donation entity with food items array
- Relationships between entities
- Data types and constraints
- Calculation logic for plates and value

**Best for**: Understanding the data model and database structure

---

### 3. User Flow Sequence Diagram
**File**: `03-user-flow-sequence.md`

Complete donation lifecycle from creation to delivery:
- Registration and authentication flow
- Donation creation process
- NGO food request workflow
- Volunteer pickup assignment
- Delivery completion
- Analytics tracking

**Best for**: Understanding how the entire system works end-to-end

---

### 4. Donation State Machine
**File**: `04-donation-state-machine.md`

All possible states and transitions:
- Ready (तैयार है)
- In Transit (रास्ते में)
- Delivered (पहुँच गया)
- Cancelled (रद्द)
- State transition rules
- Business logic for each state

**Best for**: Understanding donation status workflow and state management

---

### 5. API Architecture Map
**File**: `05-api-architecture.md`

Complete REST API documentation:
- Authentication endpoints
- User management endpoints
- Donation CRUD operations
- Statistics endpoints
- Request/response formats
- Error handling

**Best for**: API integration and backend development

---

### 6. User Type Interaction Diagram
**File**: `06-user-type-interaction.md`

How three user types interact:
- Event Donors create donations
- NGOs request food
- Volunteers deliver
- Information flow between actors
- Role-based access control
- Multi-party coordination

**Best for**: Understanding user roles and their interactions

---

### 7. Frontend Navigation Flowchart
**File**: `07-frontend-navigation.md`

Complete UI navigation structure:
- Landing page flow
- Registration and login modals
- Dashboard layouts per user type
- Menu navigation
- View switching logic
- Modal interactions

**Best for**: Understanding the user interface and navigation

---

### 8. Data Flow Diagram
**File**: `08-data-flow-diagram.md`

How data flows through the system:
- User input to database storage
- Data transformations
- API processing
- Chart rendering
- Cache management
- Validation layers

**Best for**: Understanding data processing and transformations

---

### 9. Deployment Architecture
**File**: `09-deployment-architecture.md`

Production deployment strategy:
- Frontend hosting options (Vercel, Netlify, AWS S3)
- Backend hosting options (Railway, Heroku, AWS EC2)
- MongoDB Atlas configuration
- Security layers (WAF, SSL, rate limiting)
- Monitoring and logging
- CI/CD pipeline
- Cost estimates

**Best for**: DevOps, deployment, and production setup

---

### 10. Feature Map & Use Cases
**File**: `10-feature-map-use-cases.md`

Complete feature documentation:
- All features by user type
- Detailed use case specifications
- Feature implementation status
- Priority matrix
- Success metrics (KPIs)
- Future enhancements

**Best for**: Product planning and feature understanding

---

## 🎯 Quick Reference Guide

### For Developers
Start with:
1. **System Architecture** - Understand the tech stack
2. **ERD** - Learn the data model
3. **API Architecture** - Study the endpoints
4. **Data Flow** - Understand processing logic

### For Product Managers
Start with:
1. **Feature Map** - See all features
2. **User Type Interaction** - Understand user roles
3. **User Flow Sequence** - See the complete workflow
4. **Deployment Architecture** - Understand costs and scaling

### For Designers
Start with:
1. **Frontend Navigation** - UI structure
2. **User Flow Sequence** - User journeys
3. **User Type Interaction** - Role-based views

### For DevOps Engineers
Start with:
1. **Deployment Architecture** - Infrastructure setup
2. **System Architecture** - Component overview
3. **API Architecture** - Backend structure

### For New Team Members
Recommended reading order:
1. System Architecture (overview)
2. Feature Map (what it does)
3. User Flow Sequence (how it works)
4. ERD (data structure)
5. Others as needed

---

## 📊 Diagram Types Used

### Mermaid Graph TB (Top-to-Bottom)
- System Architecture
- API Architecture
- User Type Interaction
- Frontend Navigation
- Data Flow
- Deployment Architecture
- Feature Map

### Mermaid Sequence Diagram
- User Flow Sequence
- Data Flow (partial)

### Mermaid State Diagram
- Donation State Machine

### Mermaid ER Diagram
- Entity Relationship Diagram

---

## 🔍 How to View Diagrams

### Option 1: GitHub (Recommended)
GitHub natively renders Mermaid diagrams. Just open any `.md` file.

### Option 2: VS Code
Install the "Markdown Preview Mermaid Support" extension:
```
ext install bierner.markdown-mermaid
```

### Option 3: Mermaid Live Editor
1. Go to https://mermaid.live/
2. Copy diagram code from any file
3. Paste and visualize

### Option 4: Documentation Sites
If deployed to:
- GitBook
- Docusaurus
- VuePress
- MkDocs

All support Mermaid rendering out of the box.

---

## 📝 Diagram Conventions

### Color Coding
- **Blue** (#e3f2fd): Client/Frontend layers
- **Orange** (#fff3e0): Server/Backend layers
- **Green** (#e8f5e9): Database layers
- **Purple** (#f3e5f5): Data access/ORM layers
- **Pink** (#fce4ec): Configuration/Security layers
- **Yellow** (#fff9c4): Event Donors
- **Light Green** (#c8e6c9): NGOs
- **Light Blue** (#bbdefb): Volunteers

### Icons Used
- 🌐 Frontend/Web
- ⚙️ Backend/API
- 🗄️ Database
- 👥 Users
- 🏛️ Event Donors
- 🏢 NGOs
- 🏍️ Volunteers
- 🔐 Authentication
- 📊 Analytics
- 🔒 Security
- 💾 Backup
- 🔄 CI/CD

### Line Types
- **Solid arrows** (→): Data flow, direct connections
- **Dashed arrows** (-.->): Optional connections, configurations
- **Thick lines**: Strong relationships
- **Thin lines**: Weak relationships

---

## 🔄 Keeping Diagrams Updated

When code changes, update corresponding diagrams:

| Code File Changed | Diagrams to Update |
|-------------------|-------------------|
| `server.js` | API Architecture, System Architecture, User Flow Sequence |
| `models/*.js` | ERD, System Architecture |
| `app.js` | Frontend Navigation, User Flow Sequence, Data Flow |
| Deployment config | Deployment Architecture |
| New features added | Feature Map, Use Cases |

---

## 📚 Additional Resources

### Project Files
- `../README.md` - Main project documentation
- `../SETUP.md` - Setup instructions
- `../package.json` - Dependencies

### External Links
- [Mermaid Documentation](https://mermaid.js.org/)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Chart.js Documentation](https://www.chartjs.org/docs/)

---

## 🤝 Contributing

When adding new diagrams:
1. Follow existing naming convention: `##-descriptive-name.md`
2. Include comprehensive explanations below diagrams
3. Use consistent color coding
4. Add code references where applicable
5. Update this README index

---

## 📄 License

These diagrams are part of the Annadaan project and follow the same MIT License.

---

**Last Updated**: January 2025
**Diagram Count**: 10
**Total Documentation**: ~50,000 words
**Code References**: Comprehensive file and line number references included
