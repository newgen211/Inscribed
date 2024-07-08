import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

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
    // TODO: Use custom logger to log connection status
    console.log('Connected to MongoDB');

    // Start the server
    app.listen(PORT, () => {
      // TODO: Use custom logger to log server status
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // TODO: Use custom logger for connection errors
    console.error(
      `Something went wrong when connecting to MongoDB -- ${error}`
    );
  });
