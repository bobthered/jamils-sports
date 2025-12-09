<script lang="ts">
	import { type Snippet } from 'svelte';
	import { type HTMLAnchorAttributes, type HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';
	import { theme } from '$lib/theme';

	type Props = HTMLAnchorAttributes & {
		children?: Snippet;
		class?: string;
		clientHeight?: number;
		clientWidth?: number;
		element?: HTMLAnchorElement | null;
		href?: string;
		isVisible?: boolean;
		offsetHeight?: number;
		offsetWidth?: number;
		transition?: (node: Element, options?: Record<string, any>) => any;
		variants?: string[];
	};
	let {
		children,
		class: className,
		clientHeight = $bindable(0),
		clientWidth = $bindable(0),
		element = $bindable(null),
		href,
		isVisible = $bindable(true),
		offsetHeight = $bindable(0),
		offsetWidth = $bindable(0),
		transition: customTransition = (_) => {},
		variants = [],
		...restProps
	}: Props = $props();
</script>

{#if isVisible}
	<a
		{...restProps}
		bind:clientHeight
		bind:clientWidth
		bind:offsetHeight
		bind:offsetWidth
		bind:this={element}
		class={twMerge(
			theme.getComponentVariant('A', 'default'),
			...variants.map((variant: string) => theme.getComponentVariant('A', variant)),
			className
		)}
		{href}
		transition:customTransition
	>
		{#if children}
			{@render children()}
		{/if}
	</a>
{/if}
