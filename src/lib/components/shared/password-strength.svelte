<script lang="ts">
	import { cn } from '$lib/lib/utils';

	let { password }: { password: string } = $props();
	let atLeastOneNumberRegex = /[0-9]+/;
	let atLeastOneSymbolNumberRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,./?]+/;
</script>

<ul class="flex list-disc flex-col gap-1 px-3">
	<li
		class={cn('text-xs font-medium', {
			'text-green-600': password.length >= 8,
			'text-red-600': password.length < 8,
			'text-muted-foreground': password.length === 0
		})}
	>
		Minimum 8 characters
	</li>
	<li
		class={cn('text-xs font-medium', {
			'text-green-600': atLeastOneNumberRegex.test(password),
			'text-red-600': !atLeastOneNumberRegex.test(password),
			'text-muted-foreground': password.length === 0
		})}
	>
		Contains at least one number
	</li>
	<li
		class={cn('text-xs font-medium', {
			'text-green-600': atLeastOneSymbolNumberRegex.test(password),
			'text-red-600': !atLeastOneSymbolNumberRegex.test(password),
			'text-muted-foreground': password.length === 0
		})}
	>
		Contains at least one symbol
	</li>
</ul>
