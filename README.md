# Calendar API

A RESTful API for managing academic calendar URLs for different courses and sessions.

## Overview

This API provides endpoints to retrieve academic calendar links for specific courses and sessions. It's built with Node.js, Express, and MongoDB, making it easy to store and retrieve calendar URLs for educational institutions.

## Features

- 🗓️ Retrieve calendar URLs by course and session
- 📚 Support for multiple courses
- 🔄 Session-based calendar management
- 🌐 CORS enabled for cross-origin requests
- 📊 MongoDB integration for data persistence
- ⚡ Fast and lightweight Express.js server

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment**: dotenv for configuration
- **Development**: nodemon for auto-restart

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vknow360/calendar-api.git
cd calendar-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/calendar-db
DB_NAME=calendar-db
```

4. Start the server:
```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Endpoints

#### Get Calendar URL

**GET** `/calendar`

Retrieves the calendar URL for a specific course and session.

**Query Parameters:**
- `course` (string, required): The course identifier
- `session` (string, required): The session identifier

**Example Request:**
```bash
GET /api/v1/calendar?course=Btech&session=2024-2028
```

**Success Response (200):**
```json
[
  {
    "link": "https://calendar.example.com/cs-2024-spring"
  }
]
```

**Error Responses:**

**400 Bad Request** - Missing required parameters:
```json
{
  "error": "Course and session are required"
}
```

**404 Not Found** - Course not found:
```json
{
  "error": "No academic calendar found for this course"
}
```

**404 Not Found** - Session not found:
```json
{
  "error": "No calendar found for this session"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

## Data Model

### Calendar Schema

```javascript
{
  course: String (required),    // Course identifier
  sessions: Map<String, String> // Session to URL mapping
}
```

**Example Document:**
```json
{
  "_id": "...",
  "course": "Btech",
  "sessions": {
    "2024-2028": "https://calendar.example.com/cs-2024-spring",
    "2025-2029": "https://calendar.example.com/cs-2024-fall"
  }
}
```

## Project Structure

```
calendar-api/
├── index.js              # Main application entry point
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
├── models/
│   └── calendar.model.js # MongoDB schema definition
├── routes/
│   └── calendar.route.js # API route handlers
└── utils/
    └── dbconnect.js      # Database connection utility
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | Required |
| `DB_NAME` | Database name | Required |

## Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Running in Development Mode
```bash
npm run dev
```

This will start the server with nodemon, which automatically restarts the server when files change.

### Adding Sample Data

To add calendar data to your database, you can use MongoDB Compass or the MongoDB shell:

```javascript
// Connect to your database and insert sample data
db.calendars.insertOne({
  course: "MTech",
  sessions: {
    "2024-2026": "https://calendar.example.com/cs-2024-spring",
    "2025-2027": "https://calendar.example.com/cs-2024-fall"
  }
});
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ for academic calendar management**