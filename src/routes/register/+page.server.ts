import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { User } from '$lib/server/db/models/user';
import { UserRegistrationSchema } from '$lib/zod/user';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const parsed = UserRegistrationSchema.safeParse({ email, password });
		if (!parsed.success) {
			return fail(400, { message: 'Invalid form data', error: parsed.error.cause, success: false });
		}
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			await User.create({ username: email, password: hashedPassword });
			return { success: true, message: 'User registered successfully' };
		} catch (error: unknown) {
			console.error(error);
			if (error instanceof Error && 'code' in error && error.code === 11000) {
				return fail(400, {
					message: 'User with this email already exists',
					error: error.message,
					success: false
				});
			}
			return fail(500, {
				message: 'Failed to register user',
				error: 'Something went wrong',
				success: false
			});
		}
	}
};
