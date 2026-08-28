import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { seedDatabase } from './seed';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://selfcoder01_db_user:gbcJhnowKm7hFn8e@cluster0.k2qcfjd.mongodb.net/';

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Database connection state cache
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log('Connected to MongoDB');

    // Seed database if running locally or if database is empty
    await seedDatabase();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Middleware to connect to DB on every serverless request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Run express server listener ONLY when not deployed to Vercel/Serverless
if (!process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

export default app;
