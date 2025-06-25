# 🚀 OneBlog – Full Stack Blog Application

Welcome to **OneBlog**, a modern blogging platform with a powerful full stack architecture:

* 🖥️ **Frontend:** Built with React 19, Vite, Tailwind, and Firebase Auth.
* 🔧 **Backend:** Node.js/Express server with MongoDB, JWT, Cloudinary, Multer, and Sharp.


---

## 📸 Cover Image

![Cover](https://github.blog/wp-content/uploads/2024/07/maxresdefault-1.jpg?fit=1280%2C720)

---

# 🌐 OneBlog – Frontend (React)

A modern blogging UI/UX platform where users can read, comment, like, and upload blog posts. Google authentication and clean UI animations included.

### 🔥 Main Features

* 🔑 User registration & login (Google/Auth)
* 📝 Create, update, delete blog posts
* 💬 Add comments
* 🔖 Bookmark blogs
* 📊 TanStack Table: sort blogs by highest word count

---

## 🚀 Live Link

🔗 **Frontend App:** [https://one-blog-tr95.onrender.com/](https://one-blog-tr95.onrender.com/)

---

### 🧰 Tech Stack (Frontend)

| Tool / Library                                                                                                                       | Purpose               |
| ------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| ![React](https://img.shields.io/badge/react-%2320232a?style=flat\&logo=react\&logoColor=%2361DAFB) **React 19**                      | UI library            |
| ![Vite](https://img.shields.io/badge/vite-%23646CFF?style=flat\&logo=vite\&logoColor=white) **Vite**                                 | Fast dev bundler      |
| ![Tailwind](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat\&logo=tailwind-css\&logoColor=white) **Tailwind CSS**  | Utility CSS           |
| ![Firebase](https://img.shields.io/badge/firebase-a08021?style=flat\&logo=firebase\&logoColor=ffcd34) **Firebase Auth**              | Google authentication |
| ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=flat\&logo=mui\&logoColor=white) **MUI**                                 | UI components         |
| ![Lucide](https://img.shields.io/badge/Lucide-000?style=flat\&logo=lucide\&logoColor=white) **Lucide React**                         | Icons                 |
| ![Axios](https://img.shields.io/badge/axios-5A29E4?style=flat\&logo=axios\&logoColor=white) **Axios**                                | API client            |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat\&logo=react-router\&logoColor=white) **React Router v7** | Routing               |
| ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-%23FF5959?style=flat\&logo=sweetalert2\&logoColor=white) **SweetAlert2**     | Alerts/modals         |
| ![Typewriter](https://img.shields.io/badge/Typewriter-000000?style=flat\&logo=javascript\&logoColor=white) **Typewriter**            | Typing effect         |
| ![CountUp](https://img.shields.io/badge/CountUp-%232C8EBB?style=flat\&logo=javascript\&logoColor=white) **CountUp**                  | Counter animation     |

---

# 🔧 OneBlog – Backend (Node.js Server)

This backend API supports authentication, post handling, image uploads, comments, and wishlist/bookmarks.

### 🔥 Main Features

* 🔐 **JWT Auth** – Secure token-based auth
* 🔑 **bcryptjs** – Password hashing
* 📷 **Multer + Sharp** – File upload & image optimization
* ☁️ **Cloudinary** – Cloud image hosting
* 🍪 **Secure Cookies** – Access + refresh tokens in cookies
* 📦 **MongoDB + Mongoose** – Robust NoSQL data handling
* 🗒️ **Post CRUD** – Create/update/delete/view blogs
* 💬 **Comment System** – Authenticated users can comment
* 🔖 **Bookmark System** – Save/wishlist blogs

### 🧰 Tech Stack (Backend)

| Tool / Library                                                                                                            | Purpose             |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat\&logo=node.js\&logoColor=white) **Node.js**             | Runtime             |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat\&logo=express\&logoColor=white) **Express.js**    | Server framework    |
| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat\&logo=mongodb\&logoColor=white) **MongoDB**             | NoSQL DB            |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat\&logo=mongoose\&logoColor=white) **Mongoose**         | ODM layer           |
| ![JWT](https://img.shields.io/badge/JWT-black?style=flat\&logo=jsonwebtokens\&logoColor=white) **JWT**                    | Auth tokens         |
| ![bcryptjs](https://img.shields.io/badge/bcryptjs-9C27B0?style=flat\&logo=javascript\&logoColor=white) **bcryptjs**       | Password hashing    |
| ![Multer](https://img.shields.io/badge/Multer-4B5563?style=flat\&logo=javascript\&logoColor=white) **Multer**             | File uploads        |
| ![Sharp](https://img.shields.io/badge/Sharp-000000?style=flat\&logo=sharp\&logoColor=white) **Sharp**                     | Image resizing      |
| ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat\&logo=cloudinary\&logoColor=white) **Cloudinary** | Cloud image storage |
| ![dotenv](https://img.shields.io/badge/dotenv-000000?style=flat\&logo=dotenv\&logoColor=green) **dotenv**                 | Env config          |

---

## 📌 Backend Routes Summary

| Route                     | Method     | Feature                    |
| ------------------------- | ---------- | -------------------------- |
| `/api/auth/register`      | POST       | Register a user            |
| `/api/auth/login`         | POST       | Login with email/password  |
| `/api/auth/google`        | POST       | Google Auth/Register/Login |
| `/api/posts`              | GET/POST   | Fetch or add posts         |
| `/api/posts/:id`          | PUT/DELETE | Update/Delete a post       |
| `/api/posts/:id/comment`  | POST       | Add comment to a post      |
| `/api/posts/wishlist/:id` | POST       | Toggle wishlist for a post |
| `/api/wishlist`           | GET        | Get all wishlisted blogs   |
| `/api/users/me`           | GET/PUT    | Get or update profile      |
| `/api/users/logout`       | POST       | Logout and clear cookies   |

---

## 🧪 Running Locally

1. ```git clone https://github.com/rridwan27/one-blog.git```
2. ```cd client && npm install && npm run dev```
3. ```cd server && npm install && npm run dev```

Ensure `.env` is configured properly with:

* MongoDB URI
* JWT Secrets
* Cloudinary keys

---

> Proudly crafted with ❤️ by Ridwan
