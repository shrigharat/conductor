import { MONGO_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';

const globalForMongo = global as typeof global & {
	_mongoClient: MongoClient | undefined;
};

if (!globalForMongo._mongoClient) {
	console.log('Connecting to MongoDB...');
	globalForMongo._mongoClient = new MongoClient(MONGO_URL, {
		authSource: 'admin'
	});
	await globalForMongo._mongoClient.connect();
	console.log('MongoDB connected');
} else {
	console.log('MongoDB already connected');
}

export const mongoClient = globalForMongo._mongoClient;
