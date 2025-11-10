# Deployment Architecture

This diagram shows the recommended production deployment architecture for the Annadaan platform, including hosting options, security layers, and infrastructure components.

```mermaid
graph TB
    subgraph Users["👥 End Users"]
        MobileUsers[Mobile Browsers<br/>━━━━━━━<br/>Chrome, Safari,<br/>Firefox Mobile]

        DesktopUsers[Desktop Browsers<br/>━━━━━━━<br/>Chrome, Firefox,<br/>Edge, Safari]
    end

    subgraph CDN["🌐 CDN & Edge Layer"]
        CloudFront[CloudFront / Cloudflare CDN<br/>━━━━━━━<br/>• Static asset caching<br/>• DDoS protection<br/>• HTTPS/TLS<br/>• Global edge locations]
    end

    subgraph Frontend["📱 Frontend Hosting"]
        StaticHost[Static Website Hosting<br/>━━━━━━━<br/>Options:<br/>• Vercel<br/>• Netlify<br/>• AWS S3 + CloudFront<br/>• GitHub Pages]

        StaticFiles[Static Files<br/>━━━━━━━<br/>• index.html<br/>• style.css<br/>• app.js<br/>• Assets]
    end

    subgraph LoadBalancer["⚖️ Load Balancing Layer"]
        LB[Application Load Balancer<br/>━━━━━━━<br/>• Health checks<br/>• SSL termination<br/>• Request routing<br/>• Auto-scaling trigger]
    end

    subgraph Backend["⚙️ Backend Application Layer"]
        Server1[Node.js Server Instance 1<br/>━━━━━━━<br/>• Express.js app<br/>• API routes<br/>• Business logic<br/>Port: 3000]

        Server2[Node.js Server Instance 2<br/>━━━━━━━<br/>• Express.js app<br/>• API routes<br/>• Business logic<br/>Port: 3000]

        Server3[Node.js Server Instance N<br/>━━━━━━━<br/>• Express.js app<br/>• API routes<br/>• Business logic<br/>Port: 3000]
    end

    subgraph BackendPlatform["☁️ Backend Hosting Options"]
        Heroku[Heroku<br/>━━━━━━━<br/>• Easy deployment<br/>• Auto-scaling<br/>• Add-ons]

        Railway[Railway<br/>━━━━━━━<br/>• Modern interface<br/>• GitHub integration<br/>• Built-in monitoring]

        Render[Render<br/>━━━━━━━<br/>• Zero DevOps<br/>• Auto-deploy<br/>• Free tier]

        AWS[AWS EC2 / ECS<br/>━━━━━━━<br/>• Full control<br/>• Scalable<br/>• Complex setup]

        DigitalOcean[DigitalOcean Droplets<br/>━━━━━━━<br/>• Simple VPS<br/>• Good pricing<br/>• SSH access]
    end

    subgraph Database["🗄️ Database Layer"]
        MongoAtlas[MongoDB Atlas<br/>━━━━━━━<br/>• Cloud-hosted<br/>• M10+ cluster (production)<br/>• Automatic backups<br/>• Replication<br/>• Sharding support]

        Replica1[(Primary<br/>Replica)]
        Replica2[(Secondary<br/>Replica 1)]
        Replica3[(Secondary<br/>Replica 2)]
    end

    subgraph Security["🔒 Security Layer"]
        WAF[Web Application Firewall<br/>━━━━━━━<br/>• SQL injection protection<br/>• XSS protection<br/>• Rate limiting<br/>• IP blocking]

        Secrets[Secrets Management<br/>━━━━━━━<br/>• Environment variables<br/>• API keys<br/>• Database credentials<br/>Options: AWS Secrets Manager,<br/>HashiCorp Vault]
    end

    subgraph Monitoring["📊 Monitoring & Logging"]
        APM[Application Performance<br/>━━━━━━━<br/>• New Relic<br/>• Datadog<br/>• PM2 monitoring]

        Logs[Logging Service<br/>━━━━━━━<br/>• CloudWatch<br/>• Loggly<br/>• Papertrail]

        ErrorTracking[Error Tracking<br/>━━━━━━━<br/>• Sentry<br/>• Rollbar<br/>• Bugsnag]
    end

    subgraph Backup["💾 Backup & Recovery"]
        AutoBackup[Automated Backups<br/>━━━━━━━<br/>• Daily snapshots<br/>• Point-in-time recovery<br/>• 30-day retention]

        Disaster[Disaster Recovery<br/>━━━━━━━<br/>• Multi-region setup<br/>• Failover config<br/>• Recovery plan]
    end

    subgraph CI_CD["🔄 CI/CD Pipeline"]
        GitHub[GitHub Repository<br/>━━━━━━━<br/>• Version control<br/>• Code review<br/>• Branch protection]

        Actions[GitHub Actions<br/>━━━━━━━<br/>• Automated testing<br/>• Build process<br/>• Deployment]

        Testing[Testing Suite<br/>━━━━━━━<br/>• Unit tests<br/>• Integration tests<br/>• E2E tests]
    end

    %% User Flow
    MobileUsers --> CloudFront
    DesktopUsers --> CloudFront

    CloudFront --> WAF
    WAF --> StaticHost
    WAF --> LB

    StaticHost --> StaticFiles
    StaticFiles -.->|API Calls| LB

    %% Load Balancing
    LB --> Server1
    LB --> Server2
    LB --> Server3

    %% Backend Deployment Options (one would be chosen)
    Server1 -.->|Deployed on| Heroku
    Server1 -.->|OR Deployed on| Railway
    Server1 -.->|OR Deployed on| Render
    Server1 -.->|OR Deployed on| AWS
    Server1 -.->|OR Deployed on| DigitalOcean

    %% Database Connection
    Server1 --> MongoAtlas
    Server2 --> MongoAtlas
    Server3 --> MongoAtlas

    MongoAtlas --> Replica1
    MongoAtlas --> Replica2
    MongoAtlas --> Replica3

    %% Security
    Secrets -.->|Provides credentials| Server1
    Secrets -.->|Provides credentials| Server2
    Secrets -.->|Provides credentials| Server3

    %% Monitoring
    Server1 --> APM
    Server1 --> Logs
    Server1 --> ErrorTracking

    %% Backup
    MongoAtlas --> AutoBackup
    AutoBackup --> Disaster

    %% CI/CD
    GitHub --> Actions
    Actions --> Testing
    Testing -->|Deploy Frontend| StaticHost
    Testing -->|Deploy Backend| Server1

    %% Styling
    style Users fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style CDN fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style Frontend fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style LoadBalancer fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style Backend fill:#fff4e1,stroke:#ff9800,stroke-width:2px
    style BackendPlatform fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style Database fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style Security fill:#ffebee,stroke:#c62828,stroke-width:2px
    style Monitoring fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    style Backup fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style CI_CD fill:#fff9c4,stroke:#f9a825,stroke-width:2px
```

## Deployment Guide

### Phase 1: Frontend Deployment

#### Option A: Vercel (Recommended for Simplicity)

**Steps**:
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure build settings:
   ```yaml
   Build Command: (none - static files)
   Output Directory: .
   Install Command: (none)
   ```
4. Environment variables: None needed for frontend
5. Deploy automatically on git push

**Pros**:
- Zero configuration
- Automatic HTTPS
- Global CDN
- Preview deployments
- Free tier available

**Cons**:
- Less control over infrastructure

---

#### Option B: AWS S3 + CloudFront

**Steps**:
1. Create S3 bucket: `annadaan-frontend`
2. Enable static website hosting
3. Upload files:
   ```bash
   aws s3 sync . s3://annadaan-frontend --exclude "server.js" --exclude "models/*" --exclude "node_modules/*"
   ```
4. Create CloudFront distribution:
   - Origin: S3 bucket
   - SSL certificate: AWS Certificate Manager
   - Caching: Enabled
5. Configure Route53 DNS

**Pros**:
- Full AWS ecosystem integration
- Highly scalable
- Custom domain easy

**Cons**:
- More complex setup
- Costs can add up

---

#### Option C: Netlify

**Steps**:
1. Connect GitHub repository
2. Configure:
   ```yaml
   Build command: (none)
   Publish directory: .
   ```
3. Deploy

**Pros**:
- Similar to Vercel
- Great free tier
- Forms and functions support

---

### Phase 2: Backend Deployment

#### Option A: Railway (Recommended for Modern Stack)

**Steps**:
1. Connect GitHub repository
2. Create new service from repo
3. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://...
   PORT=3000
   NODE_ENV=production
   ```
4. Railway auto-detects Node.js and deploys
5. Get public URL: `https://annadaan-production.up.railway.app`

**Configuration** (`package.json`):
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": "16.x"
  }
}
```

**Pros**:
- Modern interface
- Auto-deploy on push
- Built-in metrics
- Affordable pricing

**Cons**:
- Relatively new platform

---

#### Option B: Heroku (Traditional PaaS)

**Steps**:
1. Install Heroku CLI
2. Login and create app:
   ```bash
   heroku login
   heroku create annadaan-api
   ```
3. Add environment variables:
   ```bash
   heroku config:set MONGODB_URI="mongodb+srv://..."
   heroku config:set NODE_ENV="production"
   ```
4. Create `Procfile`:
   ```
   web: node server.js
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

**Pros**:
- Mature platform
- Extensive add-ons
- Easy scaling

**Cons**:
- Dyno sleep on free tier
- More expensive at scale

---

#### Option C: AWS EC2 (Full Control)

**Steps**:
1. Launch EC2 instance (Ubuntu 22.04)
2. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. Install PM2 process manager:
   ```bash
   sudo npm install -g pm2
   ```
4. Clone repository:
   ```bash
   git clone https://github.com/your-repo/annadaan.git
   cd annadaan
   npm install
   ```
5. Create `.env` file:
   ```bash
   echo "MONGODB_URI=mongodb+srv://..." > .env
   echo "PORT=3000" >> .env
   ```
6. Start with PM2:
   ```bash
   pm2 start server.js --name annadaan
   pm2 save
   pm2 startup
   ```
7. Configure Nginx reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name annadaan.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
8. Setup SSL with Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d annadaan.com
   ```

**Pros**:
- Full control
- Customizable
- Cost-effective at scale

**Cons**:
- Requires DevOps knowledge
- Manual scaling
- Security management

---

### Phase 3: Database Configuration (MongoDB Atlas)

#### Production Cluster Setup

**Current Setup**: Free M0 tier (development)
**Production Recommendation**: M10+ cluster

**Steps**:
1. Upgrade to M10 cluster ($57/month):
   - 2GB RAM
   - 10GB storage
   - Automated backups
   - Point-in-time recovery

2. Enable Replication:
   - 3-node replica set (default)
   - Automatic failover
   - High availability

3. Configure Network Access:
   ```
   Remove: 0.0.0.0/0 (allow all)
   Add: Backend server IP addresses
   Add: VPC peering (if using AWS/GCP/Azure)
   ```

4. Create Production Database User:
   ```
   Username: annadaan_prod
   Password: [Strong 32-char password]
   Role: readWrite on annadaan database
   ```

5. Connection String:
   ```
   mongodb+srv://annadaan_prod:[PASSWORD]@cluster0.xxxxx.mongodb.net/annadaan?retryWrites=true&w=majority&ssl=true
   ```

6. Enable Monitoring:
   - Performance Advisor
   - Real-time alerts
   - Query profiler

7. Backup Strategy:
   - Continuous backups (enabled)
   - Snapshot schedule: Daily at 2 AM UTC
   - Retention: 30 days
   - Restore testing: Monthly

---

### Phase 4: Security Hardening

#### Required Security Updates

**Before deploying to production, implement**:

1. **Password Hashing**
   ```bash
   npm install bcrypt
   ```
   ```javascript
   // server.js registration
   const bcrypt = require('bcrypt')
   const hashedPassword = await bcrypt.hash(password, 10)
   userData.password = hashedPassword

   // server.js login
   const user = await User.findOne({ email })
   const validPassword = await bcrypt.compare(password, user.password)
   ```

2. **JWT Authentication**
   ```bash
   npm install jsonwebtoken
   ```
   ```javascript
   // server.js
   const jwt = require('jsonwebtoken')

   // Generate token on login
   const token = jwt.sign(
     { userId: user._id, userType: user.userType },
     process.env.JWT_SECRET,
     { expiresIn: '7d' }
   )

   // Middleware
   const requireAuth = (req, res, next) => {
     const token = req.headers.authorization?.split(' ')[1]
     if (!token) return res.status(401).json({ error: 'Unauthorized' })

     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       req.user = decoded
       next()
     } catch (error) {
       res.status(401).json({ error: 'Invalid token' })
     }
   }
   ```

3. **Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```
   ```javascript
   const rateLimit = require('express-rate-limit')

   const apiLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   })

   app.use('/api/', apiLimiter)
   ```

4. **Input Sanitization**
   ```bash
   npm install express-validator mongoose-sanitize
   ```
   ```javascript
   const { body, validationResult } = require('express-validator')
   const mongoSanitize = require('express-mongo-sanitize')

   app.use(mongoSanitize()) // Prevent NoSQL injection

   // Validation example
   app.post('/api/auth/register',
     body('email').isEmail().normalizeEmail(),
     body('password').isLength({ min: 8 }),
     async (req, res) => {
       const errors = validationResult(req)
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
       }
       // ...
     }
   )
   ```

5. **Security Headers**
   ```bash
   npm install helmet
   ```
   ```javascript
   const helmet = require('helmet')
   app.use(helmet())
   ```

6. **CORS Restriction**
   ```javascript
   const cors = require('cors')

   // Development
   if (process.env.NODE_ENV === 'development') {
     app.use(cors())
   } else {
     // Production
     app.use(cors({
       origin: [
         'https://annadaan.com',
         'https://www.annadaan.com'
       ],
       credentials: true
     }))
   }
   ```

---

### Phase 5: Environment Variables Management

#### Backend Environment Variables

**Development** (`.env` file):
```env
MONGODB_URI=mongodb://localhost:27017/annadaan
PORT=3000
NODE_ENV=development
JWT_SECRET=dev-secret-key-change-in-production
```

**Production** (Server environment):
```env
MONGODB_URI=mongodb+srv://annadaan_prod:[PASSWORD]@cluster0.xxxxx.mongodb.net/annadaan?retryWrites=true&w=majority
PORT=3000
NODE_ENV=production
JWT_SECRET=[64-character random string]
FRONTEND_URL=https://annadaan.com
SENTRY_DSN=[Sentry error tracking DSN]
```

**Generate Strong JWT Secret**:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

### Phase 6: Monitoring & Logging Setup

#### Application Performance Monitoring

**Option A: PM2 Plus** (if using PM2)
```bash
pm2 install pm2-server-monit
pm2 link [SECRET] [PUBLIC]
```

**Option B: New Relic**
```bash
npm install newrelic
```
```javascript
// First line in server.js
require('newrelic')
```

#### Error Tracking: Sentry

```bash
npm install @sentry/node
```

```javascript
// server.js
const Sentry = require('@sentry/node')

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
})

// Error handling middleware (last middleware)
app.use(Sentry.Handlers.errorHandler())
```

#### Logging: Winston

```bash
npm install winston
```

```javascript
const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

// Usage
logger.info('User registered', { userId: user._id })
logger.error('Database connection failed', { error: err.message })
```

---

### Phase 7: CI/CD Pipeline

#### GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml`

```yaml
name: Deploy Annadaan

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
```

---

## Infrastructure Costs Estimate

### Monthly Cost Breakdown (Production)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| **Frontend** (Vercel Pro) | Unlimited bandwidth | $20 |
| **Backend** (Railway Pro) | 8GB RAM, 4vCPU | $20 |
| **Database** (MongoDB M10) | 2GB RAM, 10GB storage | $57 |
| **CDN** (Cloudflare Pro) | Caching, DDoS protection | $20 |
| **Monitoring** (Sentry Team) | Error tracking | $26 |
| **Domain** (annadaan.com) | Registration | $12/year |
| **SSL** (Let's Encrypt) | Free | $0 |
| **Total** | | **~$143/month** |

### Scaling Costs (1000+ users, high traffic)

| Service | Scaled Tier | Monthly Cost |
|---------|-------------|--------------|
| Frontend (Vercel) | Same (unlimited) | $20 |
| Backend (Railway) | 16GB RAM, 8vCPU, 3 instances | $120 |
| Database (MongoDB M30) | 8GB RAM, 40GB storage | $194 |
| CDN (Cloudflare Business) | Advanced security | $200 |
| Monitoring (New Relic Pro) | Full APM | $99 |
| **Total** | | **~$633/month** |

---

## Deployment Checklist

### Pre-Deployment
- [ ] Implement password hashing (bcrypt)
- [ ] Add JWT authentication
- [ ] Implement rate limiting
- [ ] Add input validation and sanitization
- [ ] Configure CORS for specific domain
- [ ] Set up error tracking (Sentry)
- [ ] Add logging (Winston)
- [ ] Write deployment documentation
- [ ] Create staging environment
- [ ] Load testing completed

### Deployment Day
- [ ] MongoDB Atlas M10 cluster created
- [ ] Database user with strong password
- [ ] Network whitelist configured
- [ ] Backend deployed to Railway/Heroku
- [ ] Environment variables set
- [ ] Frontend deployed to Vercel/Netlify
- [ ] DNS configured
- [ ] SSL certificate issued
- [ ] Monitoring dashboards configured
- [ ] Backup schedule verified

### Post-Deployment
- [ ] Test all user flows end-to-end
- [ ] Verify analytics tracking
- [ ] Test error reporting
- [ ] Review logs for issues
- [ ] Load test with artillery/k6
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Document incident response plan
- [ ] Train team on monitoring tools

---

## Disaster Recovery Plan

### Backup Strategy
1. **Automated MongoDB Backups**: Daily at 2 AM UTC
2. **Code Repository**: GitHub (version controlled)
3. **Configuration Backups**: Environment variables documented securely

### Recovery Time Objectives (RTO)
- **Database failure**: < 1 hour (restore from backup)
- **Backend server failure**: < 15 minutes (auto-scaling or manual restart)
- **Frontend failure**: < 5 minutes (CDN serves cached version)

### Incident Response
1. Alert received via monitoring
2. Assess impact and scope
3. Failover to backup systems if needed
4. Restore from latest backup
5. Post-mortem and documentation
6. Implement preventive measures

---

## Performance Optimization

### Backend
- Enable gzip compression
- Implement Redis caching for frequent queries
- Optimize MongoDB indexes
- Use connection pooling

### Frontend
- Minify CSS and JS
- Lazy load images
- Implement service worker for offline support
- Code splitting for large apps

### Database
- Add indexes on frequently queried fields
- Use aggregation pipelines efficiently
- Implement pagination for large datasets
- Consider sharding for massive scale
