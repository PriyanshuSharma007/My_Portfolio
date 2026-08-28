import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { seedDatabase } from './seed';

// Load environment variables from the .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Read MongoDB Atlas URI strictly from environment variables
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('CRITICAL: MONGO_URI is not defined in environment variables or .env file!');
}

// Enable CORS and parse JSON request bodies
app.use(cors());
app.use(express.json());

// Set up all API routes under the "/api" prefix
app.use('/api', apiRoutes);

/**
 * Database Connection Helper (Cached)
 * In serverless environments like Vercel, functions spin up and down.
 * Reusing an active connection prevents Mongoose connection pool exhaustion.
 */
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using cached database connection');
    return;
  }
  if (!MONGO_URI) return;
  
  try {
    const db = await mongoose.connect(MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log('Successfully connected to MongoDB Cloud');

    // Run database seeder to populate mock portfolio data on first run
    await seedDatabase();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Middleware: Auto-connect to DB on every incoming API request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// For local environment, run Express listener.
// In Vercel serverless environment, Vercel exports and wraps 'app' automatically.
if (!process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running locally on port ${PORT}`);
    });
  });
}

export default app;
