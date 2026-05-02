# Frontend - Notification System

Next.js/React application for displaying notifications with filtering and tracking.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```

3. Run development server:
```bash
npm run dev
```

App runs on `http://localhost:3000`

## Build & Production

```bash
npm run build
npm start
```

## Pages

- `/` - All notifications with pagination
- `/filter` - Filter notifications by type
- `/priority` - Top 5 priority notifications

## Features

- Responsive design (mobile, tablet, desktop)
- New/viewed notification tracking
- Notification filtering by type
- Pagination support
- Material UI components
- TypeScript support
- Error handling
- Loading states

## Configuration

Set `NEXT_PUBLIC_API_URL` in `.env.local` to point to backend (default: http://localhost:5000)
