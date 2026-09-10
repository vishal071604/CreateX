# 🚀 CreateX

A full-stack social media web application built using the **MERN stack**.

CreateX allows users to register and log in, create posts with text and images, view posts in a feed, and like or unlike posts.

---

## 🌐 Live Demo

🔗 **Frontend:** https://create-x-aayy.vercel.app

🔗 **Backend:** https://createx-vpbi.onrender.com

## 💻 GitHub Repository

🔗 https://github.com/vishal071604/CreateX

---

## ✨ Features

- 👤 User registration
- 🔐 User login and logout
- 🎫 JWT-based authentication
- 📝 Create text posts
- 🖼️ Upload images with posts
- 📰 View posts in a feed
- ❤️ Like and unlike posts
- 🔢 Display total likes
- 👥 Display post author information
- 🗄️ MongoDB database
- ☁️ Image uploads using ImageKit
- 🔗 REST API
- 📱 Responsive user interface

---

## 🛠️ Tech Stack

### 🎨 Frontend

- ⚛️ React.js
- ⚡ Vite
- 🟨 JavaScript
- 🌐 HTML5
- 🎨 CSS3

### ⚙️ Backend

- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB
- 📦 Mongoose
- 🔑 JWT
- 🔒 bcryptjs
- 📤 Multer

### 🔧 Other Tools

- 🖼️ ImageKit
- 🔧 Git
- 🐙 GitHub
- 🧪 Postman
- ▲ Vercel
- 🚀 Render

---

## 📁 Project Structure

```text
CreateX/
│
├── 📂 Frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   ├── 📂 pages/
│   │   ├── 📂 services/
│   │   ├── 📄 App.jsx
│   │   └── 📄 main.jsx
│   │
│   ├── 📂 public/
│   ├── 🔐 .env
│   ├── 📄 package.json
│   └── 📄 vite.config.js
│
├── 📂 Backend/
│   ├── 📂 config/
│   │   └── 📄 db.js
│   │
│   ├── 📂 controllers/
│   │   ├── 📄 authController.js
│   │   ├── 📄 postController.js
│   │   └── 📄 likeController.js
│   │
│   ├── 📂 middleware/
│   │   ├── 📄 authMiddleware.js
│   │   └── 📄 upload.js
│   │
│   ├── 📂 models/
│   │   ├── 📄 User.js
│   │   ├── 📄 Post.js
│   │   └── 📄 Like.js
│   │
│   ├── 📂 routes/
│   │   ├── 📄 authRoutes.js
│   │   ├── 📄 postRoutes.js
│   │   └── 📄 likeRoutes.js
│   │
│   ├── 📂 utils/
│   │   └── 📄 uploadFile.js
│   │
│   ├── 📄 server.js
│   ├── 📄 package.json
│   └── 🔐 .env
│
└── 📄 README.md
