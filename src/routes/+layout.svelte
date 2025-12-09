<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { Container, Header } from '$lib/components';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header>
	<Container variants={['full']}>Test</Container>
</Header>
{@render children()}
