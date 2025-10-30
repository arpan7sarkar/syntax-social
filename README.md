# 🚀 Syntax Social - Developer Connection Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)](https://jwt.io/)

> **A powerful backend microservice for connecting developers worldwide** 🌐

Syntax Social is a robust Node.js backend API that enables developers to connect, network, and build professional relationships. Built with modern technologies and following industry best practices for scalability and security.

## ✨ Key Features

### 🔐 **Authentication & Security**
- **JWT-based authentication** with secure cookie management
- **Password encryption** using bcrypt with salt rounds
- **Token expiry management** (1-hour sessions)
- **Secure logout** functionality

### 👥 **User Management**
- **Complete profile management** (view, edit, password change)
- **User validation** with strong password requirements
- **Profile customization** (skills, about, photo URL)
- **Age verification** (16+ requirement)

### 🤝 **Connection System**
- **Smart connection requests** (interested/ignored status)
- **Connection review system** (accept/reject)
- **Duplicate request prevention**
- **Bidirectional connection tracking**
- **Connection feed** with pagination

### 📡 **Advanced API Features**
- **RESTful API design**
- **Middleware-based authentication**
- **Input validation** and sanitization
- **Error handling** with meaningful messages
- **Pagination support** for feeds
- **Database indexing** for optimal performance

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | Latest |
| **Express.js** | Web Framework | ^5.1.0 |
| **MongoDB** | Database | - |
| **Mongoose** | ODM | ^8.17.2 |
| **JWT** | Authentication | ^9.0.2 |
| **bcrypt** | Password Hashing | ^6.0.0 |
| **Validator** | Input Validation | ^13.15.15 |

## 🏗️ Architecture

```
src/
├── config/
│   └── database.js          # MongoDB connection setup
├── model/
│   ├── user.js             # User schema with methods
│   └── connectionRequest.js # Connection request schema
├── routers/
│   ├── auth.route.js       # Authentication endpoints
│   ├── profile.route.js    # Profile management
│   ├── connection.route.js # Connection handling
│   ├── userRequest.route.js # User interactions
│   └── index.route.js      # Route aggregation
├── utils/
│   ├── middlewares/
│   │   └── auth.js         # JWT authentication middleware
│   └── validation.js       # Input validation functions
└── app.js                  # Application entry point
```

## 📋 API Endpoints

### 🔐 Authentication Routes
```http
POST /signup          # Create new user account
POST /login           # User authentication
POST /logout          # Secure logout
```

### 👤 Profile Routes
```http
GET  /profile/view     # View user profile
PATCH /profile/edit    # Edit profile information
PATCH /profile/password # Change password
```

### 🤝 Connection Routes
```http
POST /request/send/:status/:toUserId     # Send connection request
POST /request/review/:status/:requestId  # Review connection request
```

### 📊 User Interaction Routes
```http
GET /user/request/received  # Get received connection requests
GET /user/connections      # Get user's connections
GET /feed                  # Get paginated user feed
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/arpan7sarkar/syntax-social.git
cd syntax-social
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Copy the example environment file
cp .example.env .env

# Add your configuration
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. **Start the application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start running on `http://localhost:7777`

## 🔧 Configuration

### Environment Variables
```env
MONGO_URL=mongodb://localhost:27017/syntax-social
JWT_SECRET=your-super-secure-secret-key
```

### Database Schema

**User Model Features:**
- First name and last name validation
- Unique email with validation
- Strong password requirements
- Age verification (16+ years)
- Skills array (5-15 skills required)
- Profile photo and about section
- Automatic timestamps

**Connection Request Model Features:**
- ObjectId references to users
- Status tracking (ignored, interested, accepted, rejected)
- Compound indexing for performance
- Self-connection prevention
- Duplicate request prevention

## 💡 Key Features Explained

### 🔒 **Security Implementation**
- **JWT Authentication**: Secure token-based authentication with 1-hour expiry
- **Password Hashing**: bcrypt with 10 salt rounds for maximum security
- **Input Validation**: Comprehensive validation using validator library
- **Cookie Security**: HttpOnly cookies with proper expiration handling

### 🎯 **Smart Connection System**
- **Duplicate Prevention**: Prevents multiple requests between same users
- **Status Management**: Four-state connection lifecycle (ignored → interested → accepted/rejected)
- **Bidirectional Queries**: Efficient database queries for mutual connections
- **Feed Algorithm**: Intelligent feed that excludes already connected users

### ⚡ **Performance Optimizations**
- **Database Indexing**: Compound indexes on frequently queried fields
- **Pagination**: Configurable page size with 50-item limit
- **Selective Population**: Only fetch necessary user data for connections
- **Query Optimization**: Efficient MongoDB aggregation pipelines

## 🔍 API Usage Examples

### User Registration
```bash
curl -X POST http://localhost:7777/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fName": "John",
    "lName": "Doe",
    "emailId": "john@example.com",
    "password": "SecurePass123!",
    "age": 25,
    "skills": ["JavaScript", "Node.js", "MongoDB", "React", "Python"]
  }'
```

### Send Connection Request
```bash
curl -X POST http://localhost:7777/request/send/interested/USER_ID \
  -H "Cookie: token=YOUR_JWT_TOKEN"
```

### Get User Feed
```bash
curl "http://localhost:7777/feed?page=1&limit=10" \
  -H "Cookie: token=YOUR_JWT_TOKEN"
```

## 🧪 Features in Development

- [ ] Real-time notifications
- [ ] Message system between connections
- [ ] User search and filtering
- [ ] Advanced matching algorithms
- [ ] Profile verification system
- [ ] Activity tracking

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Arpan Sarkar**
- GitHub: [@arpan7sarkar](https://github.com/arpan7sarkar)
- LinkedIn: Connect with me on LinkedIn

## 🙏 Acknowledgments

- Thanks to the Node.js community for excellent documentation
- MongoDB team for the powerful database solution
- Express.js contributors for the robust framework
- JWT.io for authentication standards

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Arpan Sarkar](https://github.com/arpan7sarkar)

</div>
