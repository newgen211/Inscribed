import express from 'express';

const authRoutes = express.Router();

authRoutes.get('/test', (req, res) => res.send('Test Route'));

export default authRoutes;
