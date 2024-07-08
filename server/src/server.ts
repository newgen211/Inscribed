import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from './utils/logger';

// Load the environment variables from the .env file
dotenv.config();

// Initizalize the express app
const app = express();

// Middlewares
app.use(express.json());

// Routes

// Connect to the database and start the server
const MONGO_URI: string = process.env.MONGO_URI ?? '';
const PORT: number = parseInt(process.env.PORT ?? '5000', 10);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger('INFO', 'Connected to MongoDB', true);

    // Start the server
    app.listen(PORT, () => {
      logger('INFO', `Server is listening at http://localhost:${PORT}`, true);
    });
  })
  .catch((error) => {
    logger(
      'ERROR',
      `Something went wrong while connecting to the database: ${error}`,
      true
    );
  });
