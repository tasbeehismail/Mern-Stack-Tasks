import express from 'express';
import { register, login, getAllUsers, deleteUser, editUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUsers);
router.delete('/user/:email', deleteUser);
router.put('/user/:email', editUser);

export default router;
