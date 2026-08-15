# 🚀 CreateX

CreateX is a full-stack **MERN social media application** that allows users to create, share, and interact with posts through a modern and responsive social media feed.

The application demonstrates practical full-stack development using **React.js, Node.js, Express.js, MongoDB, REST APIs, ImageKit, and JWT-based authentication**.

---

## ✨ Features

### 👤 User Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- User-specific content

### 📝 Post Management

- Create social media posts
- Add text content to posts
- Upload images with posts
- View posts in a dynamic feed
- Display post author
- Display post creation date and time
- User-specific post ownership

### ❤️ Post Interaction

- Like posts
- Unlike posts
- Real-time like count updates
- Visual liked/unliked heart state

### 🖼️ Image Handling

- Upload images
- Multer for file handling
- ImageKit for cloud image storage
- Display uploaded images in the feed

### 📱 Feed

- Dynamic post feed
- Latest posts appear at the top
- Automatically displays newly created posts
- Loading state
- Error handling
- Empty feed state

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- CSS
- Axios
- React Hooks

## Backend

- Node.js
- Express.js
- REST API
- JWT
- Cookie-based Authentication
- Multer

## Database

- MongoDB
- Mongoose

## Cloud Storage

- ImageKit

---

# 🏗️ Application Architecture

```text
                     ┌──────────────────┐
                     │      User        │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │ React Frontend   │
                     │     + Vite       │
                     └────────┬─────────┘
                              │
                         Axios / REST
                              │
                              ▼
                     ┌──────────────────┐
                     │ Express Backend  │
                     │     + Node.js    │
                     └───────┬──────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
        ┌───────────────┐         ┌───────────────┐
        │    MongoDB    │         │    ImageKit   │
        │  Users/Posts  │         │    Images     │
        └───────────────┘         └───────────────┘
