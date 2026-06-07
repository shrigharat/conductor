import mongoose from 'mongoose';
import { connectDB } from '../client';

await connectDB();

const _userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

const User = mongoose.model('User', _userSchema);

export { User };
