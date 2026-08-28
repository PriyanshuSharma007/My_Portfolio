# How to Run the Portfolio Project

This guide provides simple, step-by-step instructions to run both the backend server and the frontend application locally on your computer.

---

## Prerequisites

Make sure you have the following installed on your machine:
1. **Node.js** (v16 or higher)
2. **MongoDB Atlas Account** (Your backend is pre-configured to connect to your cloud database cluster).

---

## 1. Run the Backend Server

The backend is built with Express and Mongoose. It manages your experiences, projects, skills, education details, and stores user messages.

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the Express development server:
   ```bash
   npm run dev
   ```
   - **What happens:** The server starts running on port `5000` (`http://localhost:5000`).
   - **Auto-Seeding:** On startup, the server automatically connects to your MongoDB Atlas cloud database and seeds all mock data (resume, experiences, skills, education, projects) if the database is empty.

---

## 2. Run the Frontend Application

The frontend is built with React, Vite, and Tailwind CSS.

1. Open a new, separate terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   - **What happens:** The Vite server starts running on port `5173`.
   - **Local Link:** Open [http://localhost:5173](http://localhost:5173) in your web browser to view your portfolio!

---

## 3. Configuration & API URL

Our project features a dynamic config routing file in the frontend under [frontend/src/config.ts](frontend/src/config.ts):
- During local development, the frontend automatically makes requests to `http://localhost:5000`.
- If you deploy your backend to Vercel, Render, or Railway, you can customize this in production by setting the environment variable `VITE_API_URL`.
