# Backend - Notification System

Express.js server for managing notifications through external API integration.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with API credentials

4. Run development server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## Build & Production

```bash
npm run build
npm start
```

## API Routes

- `GET /health` - Health check endpoint
- `GET /api/notifications?limit=10&page=1&notification_type=Event` - Fetch notifications

## Features

- Bearer token authentication
- Query parameter validation (limit, page, notification_type)
- Error handling and validation
- Request/response logging
- CORS enabled
- TypeScript support
