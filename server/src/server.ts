import cors     from 'cors';
import dotenv   from 'dotenv';
import path     from 'path';
import mongoose from 'mongoose';
import express, { Express, Response, Request } from 'express';
import authRouter from './routes/auth.routes';
import createTransporter from './utils/nodemailer.util';
import userRouter from './routes/user.routes';
            

// Load environment variables
dotenv.config();

// Get the server port and MongoDB connection string from the environment variables
const PORT: number            = parseInt(process.env.PORT as string ?? 5000, 10);
const URI: string | undefined = process.env.MONGO_URI;

// Check to make sure MongoDB URI is not undefined
if(URI === undefined) {

    // Log connection missing string error and exit gracefully
    console.error(`MongoDB connection string (MONGO_URI) is not defined`);
    process.exit(1);

}

// Initalize the express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors());

// Create a nodemailer transporter to send email
export const transporter = createTransporter();

// Routers
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Serve Static React Files and Frontend Routes
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (req: Request, res: Response): void => {

    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));

});

// Connect to MongoDB and start the server
mongoose.connect(URI).then( () => {

    // Log Connection to MongoDB
    console.log(`Connected to MongoDB`);

    // Start the express app
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });

}).catch( (error) => {

    // Log connection error and gracefully exit
    console.error(`Error occured while connecting to MongoDB --- ${error} ---`);
    process.exit(1);

});