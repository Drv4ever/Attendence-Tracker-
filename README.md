# 📊 Attendance Tracker System

A **full-stack Live Attendance Tracking System** built with **Node.js, Express, MongoDB, and WebSockets**, designed for real-time classroom attendance with role-based access control.

This project demonstrates **backend architecture, authentication, WebSocket communication, and database design**, making it ideal for **college projects, backend interviews, and portfolio showcase**.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Signup & Login using **JWT**
* Password hashing with **bcrypt**
* Role-based access control:

  * 👨‍🏫 **Teacher**
  * 👨‍🎓 **Student**
* Secure protected routes

### 🏫 Class Management

* Teachers can:

  * Create classes
  * Update class details
  * Delete classes
  * View enrolled students

### 📡 Live Attendance (WebSocket)

* Real-time attendance using **WebSockets (`ws`)**
* Teacher starts an attendance session
* Students join live session
* Attendance is marked instantly
* Prevents duplicate attendance

### 💾 Database Persistence

* Attendance records stored in **MongoDB**
* Mongoose schemas for:

  * Users
  * Classes
  * Attendance

---

## 🛠 Tech Stack

| Layer           | Technology        |
| --------------- | ----------------- |
| Backend         | Node.js, Express  |
| Database        | MongoDB, Mongoose |
| Auth            | JWT, bcrypt       |
| Validation      | Zod               |
| Real-time       | WebSocket (`ws`)  |
| Version Control | Git, GitHub       |

---

## 📁 Project Structure

```
attendence-system/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── websocket/
│   └── server.js
│
├── frontend/          # (Optional / WIP)
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 📦 Installation & Running

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Drv4ever/Attendence-Tracker-.git
cd attendence-system
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start the Server

```bash
npm start
# or
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 🔌 API Overview

### 🔑 Auth Routes

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | `/api/auth/signup` | Register user      |
| POST   | `/api/auth/login`  | Login user         |
| GET    | `/api/auth/me`     | Get logged-in user |

### 🏫 Class Routes (Teacher Only)

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| POST   | `/api/classes`     | Create class    |
| GET    | `/api/classes`     | Get all classes |
| PUT    | `/api/classes/:id` | Update class    |
| DELETE | `/api/classes/:id` | Delete class    |

### 📡 WebSocket Attendance

* Teacher creates session
* Students join via class code
* Attendance updates live

---

## 🧪 Testing

> ⚠️ Currently, automated tests are **not implemented**.

You can manually test APIs using:

* Postman
* Thunder Client (VS Code)

---

## 🔐 Security Practices

* Passwords hashed using bcrypt
* JWT-based authentication
* Protected routes via middleware
* Role-based access control

---

## 🎯 Learning Outcomes

Through this project, you will understand:

* Backend project structure
* JWT authentication flow
* WebSocket real-time systems
* MongoDB schema design
* Role-based authorization
* REST API best practices

---

## 🌱 Future Improvements

* Frontend integration (React)
* QR-based attendance
* Attendance analytics dashboard
* Export attendance as CSV
* Automated test suite (Jest)

---

## 👤 Author

**Dhruv Jain**
BTech IT, VIT Vellore
Backend & Full Stack Developer

---

## ⭐ Support

If you found this project helpful:

* ⭐ Star the repository
* 🍴 Fork it
* 🛠 Contribute improvements

---

**Happy Coding! 🚀**
