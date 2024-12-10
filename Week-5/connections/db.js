import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/todo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected successfully to the database');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default db;
