<script lang="ts">
	import { Mail, Phone } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';
	import favicon from '$lib/assets/favicon.svg';
	import { A, Button, Container, Div, Footer, H6, Header, Nav } from '$lib/components';
	import '../app.css';
	import { page } from '$app/state';

	// $props
	let { children } = $props();

	// $state
	let isNavOpen = $state(false);
	const navItems = $state([
		...['News', 'Schedule', 'Standings', 'Teams'].map((label) => ({
			class: undefined,
			href: `/${label.toLowerCase().split(' ').join(' ')}`,
			label,
			variants: ['buttonDefault', 'buttonGhost']
		}))
	]);
	let windowOuterWidth = $state(0);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window bind:outerWidth={windowOuterWidth} />

<Header>
	<Container class="flex items-center justify-between py-3" variants={['full']}>
		<A class="-ml-6" href="/" variants={['buttonDefault', 'buttonGhost']}>Logo</A>
		<Button
			onclick={() => (isNavOpen = !isNavOpen)}
			isVisible={windowOuterWidth < 768}
			variants={['icon']}
		>
			<Div class="relative aspect-square w-6">
				<Div
					class={twMerge(
						'absolute top-1/2 left-1/2 h-0.5 w-5 -translate-x-1/2 bg-current transition duration-200',
						isNavOpen ? 'translate-y-0 rotate-45' : '-translate-y-1 rotate-0'
					)}
				/>
				<Div
					class={twMerge(
						'absolute top-1/2 left-1/2 h-0.5 w-5 -translate-x-1/2 bg-current transition duration-200',
						isNavOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1 rotate-0'
					)}
				/>
			</Div>
		</Button>
		<Nav class="flex space-x-1" isVisible={windowOuterWidth >= 768}>
			{#each navItems as { href, label, variants }}
				<A
					class={twMerge('px-6 py-3', page.url.pathname === href ? 'text-primary-500' : undefined)}
					{href}
					{variants}>{label}</A
				>
			{/each}
			<A class="px-6 py-3" href="/sign-up" variants={['buttonDefault']}>Sign Up</A>
		</Nav>
	</Container>
	<Nav
		class="border-t border-gray-950/10 dark:border-gray-50/10"
		isVisible={windowOuterWidth < 768 && isNavOpen}
		transition={(node: Element) => slide(node, { duration: 200 })}
	>
		<Container class="flex flex-col space-y-1 py-6">
			{#each navItems as { class: className, href, label, variants }}
				<A class={className} {href} {variants}>{label}</A>
			{/each}
			<A class="text-center" href="/sign-up" variants={['buttonDefault']}>Sign Up</A>
		</Container>
	</Nav>
</Header>
{@render children()}
<Footer>
	<Container>
		<Div class="flex flex-col divide-y divide-gray-50/10 dark:divide-gray-950/10">
			<Div class="flex flex-col space-y-6 py-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
				<Div class="flex flex-col space-y-3">
					<A class="-ml-6" href="/" variants={['buttonDefault', 'buttonGhost']}>Logo</A>
					<Div class="opacity-70">Building champions on and off the court since 2025</Div>
				</Div>
				<Div class="flex flex-col space-y-3">
					<H6>Quick Links</H6>
					<Div class="flex flex-col opacity-70">
						{#each navItems as { href, label }}
							<A class="text-current" {href}>{label}</A>
						{/each}
					</Div>
				</Div>
				<Div class="flex flex-col space-y-3">
					<H6>Contact</H6>
					<Div class="grid grid-cols-[fit-content(0px)_1fr] gap-x-2 gap-y-4 opacity-70">
						<Phone />
						<Div>(555) 123-4567</Div>
						<Mail />
						<A class="text-current" href="mailto:info@jamilsleague.com">info@jamilsleague.com</A>
					</Div>
				</Div>
			</Div>
			<Div class="py-6 text-center opacity-70">© 2025 Jamil's League. All rights reserved.</Div>
		</Div>
	</Container>
</Footer>
