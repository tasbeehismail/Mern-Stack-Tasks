import express from 'express';
import path from 'path';
import bootstrap from './src/app.js';
import cors from 'cors';

const server = express();
const __dirname = path.resolve(); 

// Enable CORS for development
server.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

// Parse JSON bodies
server.use(express.json());

// Register API routes before serving the React app
bootstrap(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});