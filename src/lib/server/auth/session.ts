import { ACCESS_TOKEN_SECRET, ENVIRONMENT_TYPE, REFRESH_TOKEN_SECRET } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { getRedisClient } from '../redis/client';

type UserId = string & { __brand: 'UserId' };

type TokenPayload = {
	userId: UserId;
};

type SessionUser = {
	userId: UserId;
};

const verifyToken = (token: string, secret: string): UserId | null => {
	try {
		const decoded = jwt.verify(token, secret) as TokenPayload;
		if (!decoded.userId) {
			return null;
		}
		return decoded.userId;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const getSessionUser = async (cookies: Cookies): Promise<SessionUser | null> => {
	const accessToken = cookies.get('access_token');
	const redisClient = await getRedisClient();
	if (accessToken) {
		const decodedUserId = verifyToken(accessToken, ACCESS_TOKEN_SECRET);
		if (decodedUserId) {
			return { userId: decodedUserId };
		}
		return null;
	}

	const refreshToken = cookies.get('refresh_token');
	if (!refreshToken) {
		return null;
	}

	const decodedUserId = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);
	if (!decodedUserId) {
		return null;
	}

	const userSession = await redisClient.get(`refresh:${decodedUserId}`);
	if (!userSession) {
		return null;
	}

	const newAccessToken = jwt.sign({ userId: decodedUserId }, ACCESS_TOKEN_SECRET);
	cookies.set('access_token', newAccessToken, {
		httpOnly: true,
		secure: ENVIRONMENT_TYPE === 'production',
		path: '/',
		maxAge: 60 * 15, // 15 minutes
		sameSite: 'lax'
	});

	return { userId: decodedUserId } as SessionUser;
};
export { getSessionUser, verifyToken };
export type { SessionUser, UserId, TokenPayload };
