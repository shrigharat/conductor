import { createClient } from 'redis';
import env from '$env/static/private';

const globalForRedis = global as typeof global & {
	_redisClient: ReturnType<typeof createClient> | undefined;
};

if (!globalForRedis._redisClient) {
	globalForRedis._redisClient = createClient({
		url: env.REDIS_URL
	});
	await globalForRedis._redisClient.connect();
}

export const redis = globalForRedis._redisClient;
