# Notification System Design

## Project Overview
A full-stack notification application built with React/Next.js frontend and Node.js backend, integrating with an external notifications API.

## Architecture

### Directory Structure
```
afford/
├── notification_app_be/          # Backend server
├── notification_app_fe/          # Frontend React/Next.js app
├── logging_middleware/           # Logging utilities
├── notification-system-design.md # This file
├── README.md                     # Project documentation
└── .gitignore                    # Git ignore rules
```

## API Integration

### External API
- **Endpoint**: `http://20.207.122.201/evaluation-service/notifications`
- **Protected**: Yes (requires authentication)
- **Method**: GET
- **Query Parameters**:
  - `limit`: Number of notifications to fetch
  - `page`: Pagination page number
  - `notification_type`: Filter by type (Event, Result, Placement)

### Response Schema
```json
{
  "notifications": [
    {
      "ID": "string (UUID)",
      "Type": "string (Event|Result|Placement)",
      "Message": "string",
      "Timestamp": "string (YYYY-MM-DD HH:mm:ss)"
    }
  ]
}
```

## Frontend Requirements

### Pages
1. **All Notifications**: Display all fetched notifications
2. **Priority Notifications**: Limited view of top "n" notifications
3. **Filter by Type**: Separate page with notification type filtering

### Features
- Responsive design (desktop + mobile)
- Distinguish between new and viewed notifications
- Material UI styling
- Error handling
- Runs on: `http://localhost:3000`

## Backend Requirements

### Features
- Authentication with external API
- Query parameter handling (limit, page, notification_type)
- Pagination support
- Error handling and validation
- Logging middleware integration

### Runs on
- `http://localhost:PORT` (to be defined in Phase 3)

## Development Stack
- **Frontend**: React/Next.js, Material UI
- **Backend**: Node.js
- **Database**: None (API integration only)
- **Logging**: Custom middleware in `logging_middleware/`
