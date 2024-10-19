// dependancies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import router from '../routes/router.js';
import db from '../database/db.js';


dotenv.config();

// server initialization
const server = express();
const port = process.env.PORT;

// middleware
server.use(express.json());
server.use(cors({  origin: 'http://localhost:5173' }));

// router
server.use('/', router)

// start the server
server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});