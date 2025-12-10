<script lang="ts">
	import { slide } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';
	import favicon from '$lib/assets/favicon.svg';
	import { A, Button, Container, Div, Header, Nav } from '$lib/components';
	import '../app.css';

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
		})),
		{ class: 'text-center', href: '/sign-up', label: 'Sign Up', variants: ['buttonDefault'] }
	]);
	let windowOuterWidth = $state(0);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window bind:outerWidth={windowOuterWidth} />

<Header>
	<Container class="flex items-center justify-between py-3" variants={['full']}>
		<A href="/" variants={['buttonDefault', 'buttonGhost']}>Logo</A>
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
				<A class="px-6 py-3" {href} {variants}>{label}</A>
			{/each}
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
		</Container>
	</Nav>
</Header>
{@render children()}
