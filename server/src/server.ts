import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import log from './utils/log';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';

// Load environment variables
dotenv.config();

// Load the environment variables needed into constants
const PORT: string | undefined      = process.env.PORT ?? '5000';
const MONGO_URI: string | undefined = process.env.MONGO_URI ?? '';

// Initalize the express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Serve static React files and handle frontend routes
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (req: Request, res: Response): void => {

    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));

});

// Connect to the MongoDB database
mongoose.connect(MONGO_URI)
.then( () => {

    log('INFO', 'Connected to MongoDB', true);
    
    // Start the express app
    app.listen(parseInt(PORT, 10), () => {
        log('INFO', `Server is listening on port ${PORT}`, true);
    });

} )
.catch( (error) => {

    log('ERROR', `Something went wrong while connecting to MongoDB: ${error}`, true);

} );