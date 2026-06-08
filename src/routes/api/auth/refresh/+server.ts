import { ACCESS_TOKEN_SECRET, ENVIRONMENT_TYPE, REFRESH_TOKEN_SECRET } from '$env/static/private';
import { getRedisClient } from '$lib/server/redis/client.js';
import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export async function GET({ cookies }) {
	const refreshToken = cookies.get('refresh_token');
	if (!refreshToken) {
		return json(
			{ message: 'Unauthorized', error: 'No refresh token found', success: false },
			{ status: 401 }
		);
	}

	try {
		const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string };
		if (!decoded) {
			return json(
				{ message: 'Unauthorized', error: 'Invalid refresh token', success: false },
				{ status: 401 }
			);
		}
		const userId = decoded?.userId;
		if (!userId) {
			return json(
				{ message: 'Unauthorized', error: 'Invalid refresh token', success: false },
				{ status: 401 }
			);
		}
		const redisClient = await getRedisClient();
		const redisRefreshToken = await redisClient.get(`refresh:${userId}`);
		if (!redisRefreshToken) {
			return json(
				{
					message: 'Unauthorized',
					error: 'Refresh token not present for this user',
					success: false
				},
				{ status: 401 }
			);
		}
		const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET);
		cookies.set('access_token', accessToken, {
			httpOnly: true,
			secure: ENVIRONMENT_TYPE === 'production',
			path: '/',
			maxAge: 60 * 15, // 15 minutes
			sameSite: 'lax'
		});
		return json({ message: 'Access token refreshed', success: true }, { status: 200 });
	} catch (error: unknown) {
		console.error(error);
		return json(
			{ message: 'Something went wrong', error: 'Temporary server error', success: false },
			{ status: 500 }
		);
	}
}
