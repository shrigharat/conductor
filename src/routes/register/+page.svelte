<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
</script>

<div class="flex h-screen flex-col items-center justify-center bg-background">
	<div class="w-full max-w-md rounded-lg border border-border bg-white p-4">
		<h1 class="text-3xl">Register</h1>
		<form class="mt-4 flex flex-col gap-4" method="POST" action="/register" use:enhance>
			<div>
				<label for="email">Email</label>
				<Input
					value="john.doe@example.com"
					type="email"
					id="email"
					name="email"
					required
					placeholder="john.doe@example.com"
				/>
			</div>
			<div>
				<label for="password">Password</label>
				<Input type="password" id="password" name="password" required value="test1234" />
			</div>
			<Button type="submit">Register</Button>
		</form>
	</div>
</div>
