import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true, minlength: 3, maxlength: 15 },
  age: { type: Number, min: 13 }
});

const User = mongoose.model('User', userSchema);
export default User;
