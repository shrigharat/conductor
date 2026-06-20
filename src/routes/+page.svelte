<script lang="ts">
	import { resolve } from '$app/paths';

	const features = [
		{
			icon: '⚡',
			title: 'Instant triggers',
			description: 'Fire workflows on webhooks, schedules, or any event your stack emits.'
		},
		{
			icon: '🔗',
			title: '100+ integrations',
			description: 'Connect Slack, GitHub, Postgres, S3, and everything in between out of the box.'
		},
		{
			icon: '👁️',
			title: 'Real-time observability',
			description: 'Every run logged, every step timed. Debug failures in seconds, not hours.'
		},
		{
			icon: '🔒',
			title: 'Secrets management',
			description: 'Encrypted at rest, scoped per workflow. Your credentials never leave our vault.'
		},
		{
			icon: '🤝',
			title: 'Team collaboration',
			description: 'Role-based access, audit logs, and shared environments for the whole org.'
		},
		{
			icon: '📈',
			title: 'Auto-scaling',
			description:
				'From 10 runs a day to 10 million. Conductor scales without you lifting a finger.'
		}
	];
</script>

<section
	class="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-muted to-background px-6 py-24 text-center"
>
	<span class="mb-4 text-sm font-semibold tracking-widest text-primary uppercase"
		>Introducing Conductor</span
	>
	<h1 class="max-w-3xl text-5xl leading-tight font-bold text-foreground sm:text-6xl">
		Orchestrate your workflows,<br class="hidden sm:block" /> effortlessly.
	</h1>
	<p class="mt-6 max-w-xl text-lg text-muted-foreground">
		Conductor brings your team's pipelines, automations, and integrations into one beautifully
		simple interface.
	</p>
	<div class="mt-10 flex flex-col gap-4 sm:flex-row">
		<a
			href={resolve('/register')}
			class="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-purple-700"
		>
			Sign up free
		</a>
		<a
			href={resolve('/demo')}
			class="rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
		>
			Live demo →
		</a>
	</div>
</section>

<section class="bg-background px-6 py-24">
	<div class="mx-auto max-w-5xl">
		<h2 class="mb-4 text-center text-3xl font-bold text-foreground">Everything you need</h2>
		<p class="mx-auto mb-16 max-w-xl text-center text-muted-foreground">
			Built for teams who move fast and can't afford things to break.
		</p>
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as f (f.title)}
				<div class="rounded-2xl border border-border bg-muted p-6">
					<div class="mb-4 text-3xl">{f.icon}</div>
					<h3 class="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
					<p class="text-sm text-muted-foreground">{f.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-muted px-6 py-24">
	<div class="mx-auto max-w-2xl text-center">
		<h2 class="mb-4 text-3xl font-bold text-foreground">Simple, transparent pricing</h2>
		<p class="mb-10 text-muted-foreground">
			Start free. Upgrade when your team grows. No hidden fees.
		</p>
		<div class="flex flex-col justify-center gap-6 sm:flex-row">
			<div class="flex-1 rounded-2xl border border-border bg-background p-8">
				<p class="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">Starter</p>
				<p class="text-4xl font-bold text-foreground">Free</p>
				<p class="mt-2 text-sm text-muted-foreground">Up to 3 workflows · 1 user</p>
			</div>
			<div class="relative flex-1 rounded-2xl border-2 border-primary bg-background p-8">
				<span
					class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
					>Popular</span
				>
				<p class="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">Pro</p>
				<p class="text-4xl font-bold text-foreground">
					$29<span class="text-lg font-normal text-muted-foreground">/mo</span>
				</p>
				<p class="mt-2 text-sm text-muted-foreground">Unlimited workflows · 10 users</p>
			</div>
		</div>
		<a href={resolve('/pricing')} class="mt-8 inline-block text-sm text-primary hover:underline"
			>See full pricing details →</a
		>
	</div>
</section>

<section class="bg-primary px-6 py-24 text-center text-primary-foreground">
	<h2 class="mb-4 text-4xl font-bold">Ready to conduct?</h2>
	<p class="mx-auto mb-10 max-w-md text-purple-200">
		Join thousands of teams already running on Conductor. Set up takes under 5 minutes.
	</p>
	<div class="flex flex-col justify-center gap-4 sm:flex-row">
		<a
			href={resolve('/register')}
			class="rounded-lg bg-primary-foreground px-6 py-3 font-semibold text-primary transition-colors hover:bg-purple-100"
		>
			Get started free
		</a>
		<a
			href={resolve('/demo')}
			class="rounded-lg border border-purple-300 px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-purple-700"
		>
			Watch the demo
		</a>
	</div>
</section>
