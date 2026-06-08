import { createClient } from 'redis';
import { REDIS_PASSWORD, REDIS_URL } from '$env/static/private';

const globalForRedis = global as typeof global & {
	_redisClient: ReturnType<typeof createClient> | undefined;
};

export const getRedisClient = async () => {
	if (!globalForRedis._redisClient) {
		globalForRedis._redisClient = createClient({
			url: REDIS_URL,
			password: REDIS_PASSWORD
		});
		await globalForRedis._redisClient.connect();
	}
	return globalForRedis._redisClient;
};
