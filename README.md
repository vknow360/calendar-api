# Calendar API

A RESTful API for managing academic calendar URLs for different courses and sessions.

## Overview

This API provides endpoints to retrieve academic calendar links for specific courses and sessions. It's built with Node.js, Express, and MongoDB, making it easy to store and retrieve calendar URLs for educational institutions.

## Features

- 🗓️ Retrieve calendar URLs by course and session
- � Upload calendar files with automatic Google Drive integration
- �📚 Support for multiple courses
- 🔄 Session-based calendar management
- 🌐 CORS enabled for cross-origin requests
- 📊 MongoDB integration for data persistence
- ⚡ Fast and lightweight Express.js server
- 🗂️ Multer-based file handling

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Multer for multipart/form-data handling
- **Storage**: Google Drive integration via Google Apps Script
- **HTTP Client**: Axios for external API calls
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
    "link": "https://drive.google.com/file/d/abc123/preview"
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

#### Upload Calendar File

**POST** `/calendar/upload`

Uploads a calendar file to Google Drive and stores the link in the database.

**Content-Type**: `multipart/form-data`

**Form Data:**
- `file` (file, required): The calendar file to upload
- `course` (string, required): The course identifier
- `session` (string, required): The session identifier

**Example Request:**
```bash
POST /api/v1/calendar/upload
Content-Type: multipart/form-data

Form Data:
- file: calendar.pdf
- course: Btech
- session: 2024-2028
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Academic calendar uploaded successfully",
  "link": "https://drive.google.com/file/d/abc123/preview"
}
```

**Error Responses:**

**400 Bad Request** - Missing required fields:
```json
{
  "status": "error",
  "message": "Course, session, and file are required"
}
```

**500 Internal Server Error** - Google Drive upload failed:
```json
{
  "status": "error",
  "message": "Failed to upload academic calendar"
}
```

**500 Internal Server Error** - Database error:
```json
{
  "status": "error",
  "message": "Database operation failed"
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
    "2024-2028": "https://drive.google.com/file/d/abc123/preview",
    "2025-2029": "https://drive.google.com/file/d/def456/preview"
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
  course: "Btech",
  sessions: {
    "2024-2028": "https://drive.google.com/file/d/abc123/preview",
    "2025-2029": "https://drive.google.com/file/d/def456/preview"
  }
});
```

Or use the upload endpoint to automatically add calendar files:

```bash
curl -X POST \
  -F "file=@calendar.pdf" \
  -F "course=Btech" \
  -F "session=2024-2028" \
  http://localhost:5000/api/v1/calendar/upload
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