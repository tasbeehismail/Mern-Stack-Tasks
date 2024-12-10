import User from '../models/user.js';
import Todo from '../models/todo.js';

export const register = async (req, res) => {
  try {
    const { username, password, firstName, age } = req.body;
    const user = new User({ username, password, firstName, age });
    await user.save();
    res.status(201).json({ message: 'User was registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const todos = await Todo.find({ userId: user._id });
    res.json({ message: 'Logged in successfully', username: user.username, todos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'firstName');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndDelete({ username: email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const { email } = req.params;
    const editValue = req.body;
    const user = await User.findOneAndUpdate({ username: email }, editValue, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User was edited successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
