import { MONGO_URL } from '$env/static/private';
import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
	if (isConnected) return;

	try {
		console.log('Connecting to MongoDB...');
		console.log(MONGO_URL);
		await mongoose.connect(MONGO_URL, {
			authSource: 'admin'
		});
		isConnected = true;
		console.log('MongoDB connected');
	} catch (error) {
		console.error('MongoDB connection failed:', error);
		process.exit(1);
	}
}
