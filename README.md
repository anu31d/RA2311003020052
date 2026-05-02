# Notification System

A full-stack notification management application built with React/Next.js frontend and Node.js backend.

## Project Structure

```
afford/
├── notification_app_be/          # Backend server
├── notification_app_fe/          # Frontend React/Next.js app
├── logging_middleware/           # Logging utilities
├── notification-system-design.md # Architecture documentation
└── README.md                     # This file
```

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd notification_app_be
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Add your credentials to `.env`:
- `CLIENT_ID`: Get from API registration
- `CLIENT_SECRET`: Get from API registration

5. Run development server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd notification_app_fe
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Run development server:
```bash
npm run dev
```

App runs on `http://localhost:3000`

## Features

- **All Notifications**: Display all notifications with pagination
- **Priority View**: Limited view of top 5 notifications
- **Filter by Type**: Filter notifications by Event, Result, or Placement
- **New/Viewed Tracking**: Distinguish between new and viewed notifications
- **Responsive Design**: Mobile, tablet, and desktop support
- **Error Handling**: Comprehensive error handling and validation
- **Material UI**: Professional UI with Material Design

## API Endpoints

### Backend
- `GET /health` - Health check
- `GET /api/notifications` - Fetch notifications with query params
  - `limit` (1-100): Number of notifications
  - `page` (≥1): Page number
  - `notification_type`: Event | Result | Placement

## Technology Stack

- **Backend**: Node.js, Express, TypeScript, Axios
- **Frontend**: React, Next.js, TypeScript, Material UI
- **Authentication**: Bearer Token (external API)
- **Styling**: Material UI, CSS

## Scripts

### Backend
- `npm run dev` - Development mode
- `npm run build` - Build TypeScript
- `npm start` - Production mode

### Frontend
- `npm run dev` - Development mode
- `npm run build` - Build Next.js app
- `npm start` - Production mode

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `CLIENT_ID`: API client ID
- `CLIENT_SECRET`: API client secret
- `EMAIL`: User email
- `ACCESS_CODE`: API access code
- `AUTH_API_URL`: Authentication endpoint
- `NOTIFICATIONS_API_URL`: Notifications endpoint

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:5000)

## Development

Both servers run on separate ports:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

The frontend automatically proxies API calls to the backend URL configured in `.env.local`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)