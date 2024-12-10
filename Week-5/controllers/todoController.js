import Todo from '../models/todo.js';

export const createTodo = async (req, res) => {
  try {
    const { userId, title, tags } = req.body;
    const todo = new Todo({ userId, title, tags });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const { userId } = req.params;
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const editData = req.body;
    const todo = await Todo.findByIdAndUpdate(todoId, editData, { new: true, runValidators: true });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
