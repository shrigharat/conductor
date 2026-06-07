<script lang="ts">
	import { resolve } from '$app/paths';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	console.log(form);
</script>

<div class="flex h-screen flex-col items-center justify-center bg-background">
	<div class="w-full max-w-md rounded-lg border border-border bg-white p-4">
		<h1 class="text-3xl">Login</h1>
		{#if form?.error}
			<div class="mt-2 rounded-lg border border-red-500 bg-red-500/10 p-4 px-4 py-2 text-red-500">
				<p class="text-red-500">{form.message}</p>
			</div>
		{/if}
		{#if form?.success}
			<div
				class="mt-2 rounded-lg border border-green-500 bg-green-500/10 p-4 px-4 py-2 text-green-500"
			>
				<p class="text-green-500">{form.message}</p>
			</div>
		{/if}
		<form class="mt-4 flex flex-col gap-4" method="POST" action="/login">
			<div>
				<label for="email">Email</label>
				<Input type="email" id="email" name="email" required placeholder="john.doe@example.com" />
			</div>
			<div>
				<label for="password">Password</label>
				<Input type="password" id="password" name="password" />
			</div>
			<Button type="submit">Login</Button>
		</form>
		<p class="mt-4 text-center text-sm text-muted-foreground">
			Don't have an account? <a href={resolve('/register')} data-sveltekit-preload-code="hover"
				>Register</a
			>
		</p>
	</div>
</div>
