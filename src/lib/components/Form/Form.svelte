<script lang="ts">
	import { type Snippet } from 'svelte';
	import { type HTMLFormAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';
	import { theme } from '$lib/theme';

	type Props = HTMLFormAttributes & {
		children?: Snippet;
		class?: string;
		clientHeight?: number;
		clientWidth?: number;
		element?: HTMLFormElement | null;
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
		isVisible = $bindable(true),
		offsetHeight = $bindable(0),
		offsetWidth = $bindable(0),
		transition: customTransition = (_) => {},
		variants = [],
		...restProps
	}: Props = $props();
</script>

{#if isVisible}
	<form
		{...restProps}
		bind:clientHeight
		bind:clientWidth
		bind:offsetHeight
		bind:offsetWidth
		bind:this={element}
		class={twMerge(
			theme.getComponentVariant('Form', 'default'),
			...variants.map((variant: string) => theme.getComponentVariant('Form', variant)),
			className
		)}
		transition:customTransition
	>
		{#if children}
			{@render children()}
		{/if}
	</form>
{/if}
