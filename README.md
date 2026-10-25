# Uhasibu Prediction Market Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black)](https://nextjs.org/)

> **Kenya-Focused Web-First Prediction Market MVP (Academic Prototype)**

A research platform developed for university academic research to study prediction markets using virtual currency. This platform enables academic research on market dynamics, user behavior, and forecasting accuracy in a controlled environment.

## 🎓 Overview

Uhasibu (Swahili for "calculation/prediction") is an academic research tool designed to explore how prediction markets function in the Kenyan context. The platform uses virtual currency (vKES) to simulate real market dynamics while maintaining strict ethical research protocols.

### Key Features

- **🔐 Age-Gated Access**: Strict 18+ verification for research participants
- **📱 OTP Authentication**: Secure login via Kenyan phone numbers (+254)
- **🌍 Bilingual Support**: Full English and Swahili localization
- **💰 Virtual Currency**: Play money (vKES) system for risk-free participation
- **📊 Market Trading**: Create and participate in prediction markets
- **👤 User Profiles**: Demographic data collection for research purposes
- **📈 Portfolio Management**: Track positions and performance
- **🛡️ Admin Dashboard**: Research oversight and market management

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 14 (Pages Router) + React 18 + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL 15
- **Authentication**: JWT + Africa's Talking SMS OTP
- **Admin Panel**: Next.js 14 (separate dashboard)
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx

### Project Structure

```
unasibu/
├── frontend/              # Next.js user-facing application
│   ├── pages/            # Page routes
│   ├── components/       # React components
│   ├── styles/           # Global styles
│   └── public/           # Static assets
├── backend/              # Express.js API server
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth & validation
│   │   └── db/           # Database connection
│   └── package.json
├── admin-dashboard/      # Next.js admin interface
│   ├── pages/            # Admin routes
│   └── components/       # Admin components
├── nginx/                # Reverse proxy configuration
├── scripts/              # Database initialization scripts
├── docker-compose.yml    # Container orchestration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **Docker** and **Docker Compose**
- **PostgreSQL** 15 (if running locally)
- **Africa's Talking** API credentials (for SMS OTP)

### Environment Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/collins-muchiri/uhasibu-platform.git
   cd Uhasibu-Platform
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables** (`.env`):
   ```env
   # Database
   DATABASE_URL=postgresql://uhasibu:changeme@postgres:5432/uhasibu
   
   # Africa's Talking
   AT_USERNAME=your_username
   AT_API_KEY=your_api_key
   AT_SENDER_ID=your_sender_id
   
   # JWT
   JWT_SECRET=your_secure_random_secret
   
   # API URLs
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

### Running with Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Services will be available at**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Admin Dashboard: http://localhost:3002
- PostgreSQL: localhost:5432

### Running Locally (Development)

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Admin Dashboard
```bash
cd admin-dashboard
npm install
npm run dev
```

## 📖 Usage

### User Flow

1. **Age Verification**: Users must confirm they are 18+ and accept terms
2. **Phone Authentication**: Enter Kenyan phone number (+254...)
3. **OTP Verification**: Receive and enter 6-digit code via SMS
4. **Profile Completion**: Provide name, age, and county
5. **Market Access**: Browse and participate in prediction markets
6. **Portfolio Management**: Track positions and virtual currency balance

### Admin Features

- Create and manage prediction markets
- Set market parameters (title, description, end date, options)
- Monitor user activity and research data
- Resolve markets and distribute winnings
- Export data for academic analysis

## 🔒 Research Ethics

This platform adheres to strict research ethics protocols:

- ✅ **Informed Consent**: Clear terms and conditions
- ✅ **Age Verification**: Mandatory 18+ gate
- ✅ **Virtual Currency Only**: No real money gambling
- ✅ **Data Privacy**: Secure handling of participant information
- ✅ **Academic Purpose**: Clearly stated research objectives
- ✅ **Responsible Gaming**: Help resources provided (1195)

## 🛠️ Development

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Database Management

```bash
# Access PostgreSQL container
docker-compose exec postgres psql -U uhasibu -d uhasibu

# Run migrations (if using migration tool)
npm run migrate

# Seed database
npm run seed
```

## 📊 API Endpoints

### Authentication
- `POST /auth/send-otp` - Send OTP to phone number
- `POST /auth/verify-otp` - Verify OTP and get JWT token

### User
- `GET /api/user` - Get user profile (authenticated)
- `PUT /user/profile` - Update user profile

### Markets
- `GET /markets` - List all active markets
- `GET /markets/:id` - Get market details
- `POST /markets/:id/trade` - Place a trade (authenticated)

### Admin
- `POST /admin/markets` - Create new market (admin only)
- `PUT /admin/markets/:id` - Update market
- `POST /admin/markets/:id/resolve` - Resolve market

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Production Build

```bash
# Build frontend
cd frontend
npm run build
npm start

# Build admin dashboard
cd admin-dashboard
npm run build
npm start
```

### Docker Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

This is an academic research project. Contributions are welcome for:

- Bug fixes
- Performance improvements
- Documentation enhancements
- Localization improvements (Swahili translations)

Please ensure all contributions maintain research ethics standards.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎓 Academic Citation

If you use this platform in your research, please cite:

```
Uhasibu Prediction Market Platform (2026)
University Research Project
https://github.com/collins-muchiri/uhasibu-platform
```

## 📞 Support

- **Research Inquiries**: Contact University Research Ethics Board
- **Technical Issues**: Open a GitHub issue
- **Gambling Help**: Call 1195 (Kenya)

## ⚠️ Disclaimer

This is a research prototype using virtual currency only. It is not a real gambling platform. Participation is voluntary and for academic research purposes only. All participants must be 18 years or older.

---

**Built with ❤️ for university academic research**

## Contribution and license

Issues and pull requests are welcome — please open an issue describing the proposed change before submitting substantive work. This project is released under the MIT License.
