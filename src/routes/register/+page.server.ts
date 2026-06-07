import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { mongoClient } from '$lib/server/db/client';

const UserRegistrationSchema = z.object({
	email: z.email(),
	password: z.string().min(8).max(32)
});

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const parsed = UserRegistrationSchema.safeParse({ email, password });
		if (!parsed.success) {
			return fail(400, { error: parsed.error.cause });
		}
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			await mongoClient
				.db('conductor_db')
				.collection('users')
				.insertOne({ username: email, password: hashedPassword });
			return { success: true, message: 'User registered successfully' };
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Failed to register user', error: 'Something went wrong' });
		}
	}
};
