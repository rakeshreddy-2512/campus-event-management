# Campus Event Management System

A full-stack platform for universities to create events, manage registrations, generate QR-based tickets, send notifications, and review analytics from an admin dashboard.

## Tech Stack
- **Frontend:** React + Vite, Tailwind CSS, Recharts
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Security/Auth:** JWT + bcrypt
- **Ticketing:** QR code generation via `qrcode`

## Core Features
- User authentication (student/admin roles)
- Admin panel to create and manage events
- Event registration with capacity checks
- Auto-generated unique QR ticket per registration
- In-app notifications and email notification transport
- Analytics dashboard showing total events/registrations and occupancy

## Project Structure
```
backend/
  src/
    config/ db connection
    controllers/ auth, event, registration
    middleware/ auth guards
    models/ User, Event, Registration
    routes/ API route groups
    utils/ notification helpers
frontend/
  src/
    api/ axios client
    components/ navbar
    context/ auth context
    pages/ auth, events, tickets, admin dashboard
```

## Setup Instructions
### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## API Overview
- `POST /api/auth/register` - register user
- `POST /api/auth/login` - login user
- `GET /api/events` - public list of events
- `POST /api/events` - create event (admin)
- `GET /api/events/analytics/overview` - analytics (admin)
- `POST /api/registrations/:eventId` - register for event and generate QR ticket
- `GET /api/registrations/me/list` - get logged-in user's tickets
- `GET /api/users/notifications` - fetch notifications

## Authentication & Roles
- JWT token returned on register/login
- Include `Authorization: Bearer <token>` for protected routes
- Role-based authorization for admin routes

## Notes for Production
- Replace JSON email transport with real SMTP provider
- Add input validation (e.g., Zod/Joi)
- Add rate limiting and security headers (`helmet`)
- Add image/file upload support for event posters
- Add check-in endpoint that validates QR payload at event gate

## License
MIT
