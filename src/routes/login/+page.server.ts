import { fail, type Actions } from '@sveltejs/kit';

import { UserLoginSchema } from '$lib/zod/user';
import { User } from '$lib/server/db/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ENVIRONMENT_TYPE } from '$env/static/private';
import { getRedisClient } from '$lib/server/redis/client';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const parsed = UserLoginSchema.safeParse({ email, password });
		if (!parsed.success) {
			console.log(parsed.error);
			return fail(400, {
				message: 'Invalid form data',
				error: parsed.error.message,
				success: false
			});
		}
		try {
			const user = await User.findOne({ username: parsed.data.email });
			console.log(user);
			if (!user) {
				return fail(404, {
					message: 'User with this email does not exist',
					error: 'User not found',
					success: false
				});
			}
			const isMatchingPassword = await bcrypt.compare(password, user.password);
			if (!isMatchingPassword) {
				return fail(401, {
					message: 'Invalid password',
					error: 'Invalid password',
					success: false
				});
			}
			const accessToken = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET);
			const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET);
			cookies.set('access_token', accessToken, {
				httpOnly: true,
				secure: ENVIRONMENT_TYPE === 'production',
				path: '/',
				maxAge: 60 * 15, // 15 minutes
				sameSite: 'lax'
			});
			cookies.set('refresh_token', refreshToken, {
				httpOnly: true,
				secure: ENVIRONMENT_TYPE === 'production',
				path: '/',
				maxAge: 60 * 60 * 24 * 30, // 30 days
				sameSite: 'lax'
			});
			const redisClient = await getRedisClient();
			await redisClient.set(`refresh:${user._id}`, refreshToken, {
				expiration: {
					type: 'EX',
					value: 60 * 60 * 24 * 30 // 30 days
				}
			});
			return { success: true, message: 'Login successful' };
		} catch (error: unknown) {
			console.error(error);
			return fail(500, {
				message: 'Failed to login',
				error: 'Something went wrong',
				success: false
			});
		}
	}
};
