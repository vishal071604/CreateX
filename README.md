# 🚀 CreateX

CreateX is a full-stack social media web application built using the **MERN stack**.

It allows users to register and log in securely, create posts with text and images, view posts in a feed, and like or unlike posts.

---

## 🌐 Live Demo

**Frontend:**
https://create-x-psi.vercel.app/

**Backend:**
https://createx-e030.onrender.com/

## 💻 GitHub Repository

https://github.com/vishal071604/CreateX

---

## ✨ Features

* 👤 User registration
* 🔐 User login and logout
* 🎫 JWT-based authentication
* 🍪 HTTP-only cookie authentication
* 📝 Create text posts
* 🖼️ Upload images with posts
* 📰 View posts in a feed
* ❤️ Like and unlike posts
* 🔢 Display total likes
* 👥 Display post author information
* 🗄️ MongoDB database
* ☁️ Image uploads using ImageKit
* 🔗 REST API
* 📱 Responsive user interface

---

## 🛠️ Tech Stack

### 🎨 Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Axios

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* cookie-parser
* Multer

### 🔧 Tools & Services

* ImageKit
* Git
* GitHub
* Postman
* Vercel
* Render

---

## 📁 Project Structure

```text
CreateX/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── likeController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Like.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── likeRoutes.js
│   │
│   ├── utils/
│   │   └── uploadFile.js
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> `.env` files are not included in the repository because they contain sensitive credentials.

---

## 🔐 Authentication

CreateX uses **JWT-based authentication with HTTP-only cookies**.

### Authentication Flow

```text
User Login
    ↓
React Frontend
    ↓
Express REST API
    ↓
Email & Password Verification
    ↓
JWT Generated
    ↓
HTTP-only Cookie
    ↓
Protected API Requests
```

Passwords are securely hashed using **bcryptjs**.

The JWT is stored in an HTTP-only cookie rather than `localStorage`.

---

## 🔗 REST API

### Authentication APIs

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |
| GET    | `/api/auth/me`       | Get current user    |
| POST   | `/api/auth/logout`   | Logout user         |

### Post APIs

| Method | Endpoint     | Description   |
| ------ | ------------ | ------------- |
| POST   | `/api/posts` | Create a post |
| GET    | `/api/posts` | Get all posts |

### Like APIs

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/likes/:postId` | Like a post          |
| DELETE | `/api/likes/:postId` | Unlike a post        |
| GET    | `/api/likes/:postId` | Get like information |

---

## ⚙️ Environment Variables

### Frontend

Create a `.env` file inside the `Frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://createx-e030.onrender.com/api
```

### Backend

Create a `.env` file inside the `Backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
FRONTEND_URL=http://localhost:5173
```

For production:

```env
FRONTEND_URL=https://create-x-psi.vercel.app
```

> **Never commit `.env` files or secret credentials to GitHub.**

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/vishal071604/CreateX.git
```

```bash
cd CreateX
```

### 2. Start Backend

```bash
cd Backend
npm install
npm start
```

Backend:

```text
http://localhost:5000
```

### 3. Start Frontend

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## ☁️ Deployment

### Frontend — Vercel

The React frontend is deployed on **Vercel**.

Production URL:

```text
https://create-x-psi.vercel.app/
```

Production environment variable:

```text
VITE_API_URL=https://createx-e030.onrender.com/api
```

### Backend — Render

The Node.js backend is deployed on **Render**.

Production URL:

```text
https://createx-e030.onrender.com/
```

Render configuration:

```text
Build Command:
npm install

Start Command:
npm start
```

Production environment variables are configured securely in Render.

---

## 🗄️ Database

CreateX uses **MongoDB** with **Mongoose**.

The database stores:

* User information
* Posts
* Post authors
* Image URLs
* Like information

---

## 🖼️ Image Upload

Images are uploaded using **ImageKit**.

```text
User selects image
        ↓
React FormData
        ↓
Express API
        ↓
Multer
        ↓
ImageKit
        ↓
Image URL
        ↓
MongoDB
```

The ImageKit private key is stored only on the backend.

---

## 🔄 Application Architecture

```text
                    CreateX
                       │
              ┌────────┴────────┐
              ↓                 ↓
        React Frontend     Express Backend
              │                 │
           Vercel          Render Server
              │                 │
              └───────┬─────────┘
                      ↓
                 REST API
                      │
             ┌────────┴────────┐
             ↓                 ↓
        MongoDB Atlas       ImageKit
```

---

## 🔒 Security

CreateX implements basic web application security practices:

* Password hashing using bcryptjs
* JWT authentication
* HTTP-only cookies
* Protected API routes
* Authentication middleware
* CORS configuration
* Environment variables for secrets
* `.env` excluded from Git
* Server-side authentication
* Secure production cookie configuration

---

## 🧪 API Testing

The backend REST APIs can be tested using **Postman**.

Example:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/posts
GET  /api/posts
POST /api/likes/:postId
DELETE /api/likes/:postId
```

---

## 🔮 Future Improvements

* 💬 Comments
* 👤 User profiles
* 🖼️ Profile pictures
* 🔔 Notifications
* 🔍 Search functionality
* 📝 Edit and delete posts
* 👥 Follow/unfollow users
* ❤️ Personalized feed
* 💬 Real-time messaging

---

## 👨‍💻 Author

**Vinay Kalawad**

Electronics & Communication Engineering Student
KLE Technological University

---

## 📄 License

This project is created for educational and portfolio purposes.
