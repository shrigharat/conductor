<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import PasswordStrength from '$lib/components/shared/password-strength.svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let password = $state('');
	let confirmPassword = $state('');

	let isSubmitting = $state(false);
</script>

<div class="flex h-screen flex-col items-center justify-center bg-background">
	<div class="w-full max-w-md rounded-lg border border-border bg-white p-4">
		<h1 class="text-3xl">Register</h1>
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
		<form
			class="mt-4 flex flex-col gap-4"
			method="POST"
			action="/register"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					await update();
					isSubmitting = false;
				};
			}}
		>
			<div>
				<label for="email">Email</label>
				<Input type="email" id="email" name="email" required placeholder="john.doe@example.com" />
			</div>
			<div>
				<label for="password">Password</label>
				<div class="flex flex-col gap-2">
					<Input type="password" id="password" name="password" required bind:value={password} />
					<PasswordStrength {password} />
				</div>
			</div>
			<div>
				<label for="email">Confirm Password</label>
				<div class="flex flex-col gap-1">
					<Input
						type="password"
						id="confirm-password"
						name="confirm-password"
						required
						bind:value={confirmPassword}
					/>
					{#if confirmPassword.length > 0 && confirmPassword !== password}
						<p class="text-xs text-red-600">Passwords do not match</p>
					{/if}
				</div>
			</div>
			<Button type="submit" disabled={isSubmitting}>Register</Button>
		</form>
	</div>
	<p class="mt-4 text-center text-sm text-muted-foreground">
		Already have an account? <a href={resolve('/login')} class="text-blue-500">Login</a>
	</p>
</div>
