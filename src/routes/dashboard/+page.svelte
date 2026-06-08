<script lang="ts">
	import { resolve } from '$app/paths';
	import Button from '$lib/components/ui/button/button.svelte';

	let accessTokenStatus: number | null = $state(null);

	const fetchRefreshToken = async () => {
		try {
			const response = await fetch('/api/auth/refresh');
			accessTokenStatus = response.status;
		} catch (error: unknown) {
			console.error(error);
		}
	};
</script>

<div class="flex h-screen w-full flex-col items-center justify-center bg-purple-50">
	<Button onclick={fetchRefreshToken}>Refresh Token</Button>
	{#if accessTokenStatus !== null}
		{#if accessTokenStatus === 200}
			<div class="max-w-md rounded-lg border border-green-500 bg-green-500/10 p-4 text-green-500">
				<p>Access token refreshed</p>
			</div>
		{:else if accessTokenStatus === 401}
			<div class="max-w-md rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-500">
				<p>Unauthorized</p>
				<a href={resolve('/login')}> <Button>Login Again</Button></a>
			</div>
		{:else}
			<div class="max-w-md rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-500">
				<p>Unauthorized</p>
			</div>
		{/if}
	{/if}
</div>
