import { Router } from "express";
import AppError from "../utils/appError.js";
import authRouter from './auth.routes.js';
import blogRouter from './blog.routes.js';

const app = Router();

app.use('/auth', authRouter);
app.use('/blogs', blogRouter);

app.use('*', (req, res, next) => {
    next(new AppError('Invalid routing path ' + req.originalUrl, 404)); 
});

export default app;