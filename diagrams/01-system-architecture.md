# System Architecture Diagram

This diagram shows the complete system architecture of the Annadaan platform, including all technology layers and their interactions.

```mermaid
graph TB
    subgraph Client["🌐 Client Layer (Browser)"]
        HTML[index.html<br/>Landing & Dashboard UI]
        CSS[style.css<br/>Responsive Design<br/>CSS Variables]
        JS[app.js<br/>Client Logic<br/>API Integration]
        Charts[Chart.js<br/>Analytics Visualization]
    end

    subgraph Server["⚙️ Backend Server (Node.js + Express)"]
        direction TB
        API[REST API Routes<br/>server.js]

        subgraph Middleware["Middleware Layer"]
            CORS[CORS Handler<br/>Cross-Origin Support]
            JSON[JSON Parser<br/>Body Parser]
            Static[Static File Server]
        end

        subgraph Routes["API Routes"]
            AuthRoutes[Auth Routes<br/>POST /api/auth/register<br/>POST /api/auth/login]
            UserRoutes[User Routes<br/>GET /api/users/:type<br/>GET /api/users/id/:id]
            DonationRoutes[Donation Routes<br/>GET/POST/PATCH<br/>/api/donations]
            StatsRoutes[Stats Routes<br/>GET /api/stats]
        end
    end

    subgraph DataLayer["💾 Data Layer"]
        direction TB
        Models[Mongoose ODM Models]
        UserModel[User.js<br/>User Schema]
        DonationModel[Donation.js<br/>Donation Schema]
    end

    subgraph Database["🗄️ MongoDB Atlas (Cloud)"]
        UsersDB[(Users Collection<br/>event_donors, ngos,<br/>volunteers)]
        DonationsDB[(Donations Collection<br/>food_items, tracking,<br/>status management)]
    end

    subgraph Config["⚙️ Configuration"]
        ENV[.env File<br/>MONGODB_URI<br/>PORT=3000]
        PKG[package.json<br/>Dependencies:<br/>express, mongoose,<br/>cors, dotenv]
    end

    %% Client connections
    HTML --> JS
    CSS --> HTML
    JS --> Charts

    %% Client to Server
    JS -->|HTTP/JSON<br/>REST API Calls| API

    %% Server internal flow
    API --> CORS
    API --> JSON
    API --> Static
    CORS --> AuthRoutes
    CORS --> UserRoutes
    CORS --> DonationRoutes
    CORS --> StatsRoutes

    %% Routes to Models
    AuthRoutes --> UserModel
    UserRoutes --> UserModel
    DonationRoutes --> DonationModel
    StatsRoutes --> UserModel
    StatsRoutes --> DonationModel

    %% Models to Database
    UserModel -->|Mongoose ODM| UsersDB
    DonationModel -->|Mongoose ODM| DonationsDB

    %% Configuration
    ENV -.->|Environment Vars| API
    PKG -.->|Dependencies| Server

    %% Styling
    style Client fill:#e1f5ff,stroke:#0288d1,stroke-width:2px
    style Server fill:#fff4e1,stroke:#ff9800,stroke-width:2px
    style DataLayer fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px
    style Database fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style Config fill:#fce4ec,stroke:#e91e63,stroke-width:2px
```

## Technology Stack Summary

### Frontend
- **HTML5** - Semantic markup with accessibility
- **CSS3** - Custom design system with CSS variables
- **Vanilla JavaScript (ES6+)** - No frameworks, lightweight
- **Chart.js** - Data visualization library

### Backend
- **Node.js v16+** - JavaScript runtime
- **Express.js v4.18.2** - Web framework
- **Mongoose v8.0.0** - MongoDB ODM
- **CORS v2.8.5** - Cross-origin resource sharing
- **dotenv v16.3.1** - Environment configuration

### Database
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Collections**: Users, Donations
- **Indexing**: Email (unique), Tracking ID (unique)

### Development Tools
- **Nodemon v3.0.1** - Auto-restart development server
- **npm** - Package management
- **Git** - Version control

## Communication Flow

1. **User Request**: Browser sends HTTP request to Express server
2. **Middleware Processing**: CORS, JSON parsing, authentication
3. **Route Handling**: Appropriate route handler processes request
4. **Data Access**: Mongoose models interact with MongoDB
5. **Response**: JSON data sent back to client
6. **UI Update**: JavaScript updates DOM dynamically
