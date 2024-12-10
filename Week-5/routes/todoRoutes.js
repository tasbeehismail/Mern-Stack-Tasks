import express from 'express';
import { createTodo, getTodos, editTodo, deleteTodo } from '../controllers/todoController.js';

const router = express.Router();

router.post('/', createTodo);
router.get('/:userId', getTodos);
router.put('/:todoId', editTodo);
router.delete('/:todoId', deleteTodo);

export default router;
