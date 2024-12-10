import dotenv from 'dotenv';
import express from 'express';
import db from './connections/db.js'
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to the database
db();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Boot server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
