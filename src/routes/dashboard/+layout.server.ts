import { getSessionUser } from '$lib/server/auth/session';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const sessionUserId = await getSessionUser(cookies);
	if (!sessionUserId) {
		return redirect(302, '/login');
	}
	return {
		sessionUserId
	};
};
