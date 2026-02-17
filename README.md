# 🎓 CampusGPT

A modern campus management system with intelligent features and role-based access control. Built as a collaborative project to streamline campus operations and enhance the educational experience.

## 📖 Overview

CampusGPT is a comprehensive web application designed to manage campus operations efficiently. The platform provides dedicated portals for students, faculty, and administrators, each with tailored features and functionalities. Built with modern web technologies, it offers a seamless and intuitive user experience.

## ✨ Key Features

### 🔐 Authentication & Security
- Secure JWT-based authentication
- Role-based access control (Student, Faculty, Admin)
- Protected routes and API endpoints
- Password encryption using bcrypt

### 👨‍🎓 Student Portal
- Personalized dashboard with quick access to resources
- Chat interface for queries
- Query history tracking
- Event calendar and notifications
- Resource library access

### 👨‍🏫 Faculty Portal
- Content upload and management
- Student engagement analytics
- Course insights and statistics
- Query monitoring dashboard

### 👨‍💼 Admin Portal
- System monitoring and health checks
- User management interface
- System-wide statistics and analytics
- Database management tools

### 🎨 Modern UI/UX
- Responsive design for all devices
- Dark theme with gradient accents
- Smooth animations and transitions
- Accessible interface components

## 🛠️ Technology Stack

### Frontend
- **React 19.0.0** - UI library
- **React Router DOM 7.5.1** - Navigation
- **Tailwind CSS 3.4.17** - Styling
- **Radix UI** - Accessible components
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **FastAPI 0.110.1** - Web framework
- **MongoDB** - Database
- **Motor** - Async MongoDB driver
- **PyJWT** - JWT authentication
- **Bcrypt** - Password hashing
- **Python 3.8+** - Programming language

## 📋 Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CampusGPT
```

### 2. Backend Setup

#### Create and Activate Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### Configure Environment

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=campusgpt_db
JWT_SECRET=your-super-secure-secret-key-change-this
JWT_ALGORITHM=HS256
```

> ⚠️ **Important:** Change the JWT_SECRET to a secure random string in production.

### 3. Frontend Setup

#### Install Dependencies

```bash
cd ../frontend
npm install
```

#### Configure Environment

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:8000
```

## 🎯 Running the Application

### 1. Start MongoDB

Ensure MongoDB is running on your system:

```bash
# Windows (if installed as service)
net start MongoDB

# macOS/Linux
mongod
```

### 2. Start Backend Server

**Option A: Using Python directly**
```bash
cd backend
python -m uvicorn server:app --reload --host 127.0.0.1 --port 8000
```

**Option B: Using PowerShell script (Windows)**
```bash
.\run_backend.ps1
```

The backend API will be available at: `http://127.0.0.1:8000`
API documentation: `http://127.0.0.1:8000/docs`

### 3. Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The application will be available at: `http://localhost:3000`

## 👥 Demo Accounts

For testing purposes, you can use these demo credentials:

| Role    | Email                  | Password     |
|---------|------------------------|--------------|
| Student | student@campus.com     | student123   |
| Faculty | faculty@campus.com     | faculty123   |
| Admin   | admin@campus.com       | admin123     |

## 📁 Project Structure

```
CampusGPT/
├── backend/
│   ├── server.py           # FastAPI application & routes
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Backend configuration (create this)
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Layout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ui/        # Reusable UI components
│   │   ├── pages/         # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── student/   # Student portal pages
│   │   │   ├── faculty/   # Faculty portal pages
│   │   │   └── admin/     # Admin portal pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── App.jsx        # Root component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   ├── package.json       # NPM dependencies
│   ├── vite.config.js     # Vite configuration
│   └── .env              # Frontend configuration (create this)
│
├── venv/                  # Python virtual environment
├── run_backend.ps1        # Backend startup script (Windows)
└── README.md             # Project documentation
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint              | Description           |
|--------|----------------------|----------------------|
| POST   | `/api/auth/register` | Register new user    |
| POST   | `/api/auth/login`    | User login           |
| GET    | `/api/auth/me`       | Get current user     |
| POST   | `/api/seed`          | Seed demo users      |

### Student Routes
| Method | Endpoint                | Description           |
|--------|------------------------|----------------------|
| GET    | `/student/dashboard`   | Student dashboard    |
| GET    | `/student/history`     | Query history        |

### Faculty Routes
| Method | Endpoint                | Description           |
|--------|------------------------|----------------------|
| GET    | `/faculty/dashboard`   | Faculty dashboard    |
| GET    | `/faculty/insights`    | Analytics & insights |

### Admin Routes
| Method | Endpoint              | Description           |
|--------|----------------------|----------------------|
| GET    | `/admin/dashboard`   | System statistics    |
| GET    | `/admin/users`       | User management      |
| GET    | `/admin/monitor`     | System monitoring    |

## 🤝 Contributing

This is a collaborative group project. We welcome contributions from team members.

### Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request for review
5. Merge after approval

## 📝 License

This project is developed for educational purposes.

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check the `MONGO_URI` in your `.env` file
- Verify MongoDB is listening on port 27017

**Port Already in Use:**
- Kill the process using the port or change the port number
- Backend: Modify `--port` parameter
- Frontend: Vite will prompt to use a different port

**Module Not Found:**
- Ensure you've installed all dependencies
- Backend: Check if virtual environment is activated
- Frontend: Run `npm install` again

**Authentication Issues:**
- Clear browser localStorage
- Check if JWT_SECRET matches between sessions
- Verify token expiration settings

## 📞 Contact

For questions or support regarding this project, please contact the development team.

---

**Built with ❤️ by the CampusGPT Development Team**
