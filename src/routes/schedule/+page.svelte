<script lang="ts">
	import { slide } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';
	import { Card, Container, Div, H1, H2, H3, H4, Img, P, Section, Select } from '$lib/components';
	import { theme } from '$lib/theme';
	import { findGames } from '$lib/remoteFunctions/findGames.remote';
	import { findTeams } from '$lib/remoteFunctions/findTeams.remote';

	// helpers
	const updateState = async () => {
		const [gamesResult, teamsResult] = await Promise.all([findGames(), findTeams()]);
		remoteStatus = 'fulfilled';
		games = gamesResult;
		teams = teamsResult;
		teamOptions = [
			{ label: 'All', value: 'All' },
			...teams
				.map(({ name }) => ({ label: name, value: name }))
				.sort((a, b) => a.label.localeCompare(b.label))
		];
	};

	// $state
	let games: Awaited<ReturnType<typeof findGames>> = $state([]);
	let remoteStatus: 'loading' | 'fulfilled' = $state('loading');
	let team = $state('All');
	let teamOptions: { label: string; value: string }[] = $state([{ label: 'All', value: 'All' }]);
	let teams: Awaited<ReturnType<typeof findTeams>> = $state([]);

	// $effects
	$effect(() => {
		updateState();
	});
</script>

<Section class={twMerge(theme.getComponentVariant('Card', 'orangeToRed'))} variants={[]}>
	<Container>
		{#if remoteStatus === 'loading'}
			<Div>Loading</Div>
		{:else}
			<Div class="flex flex-col space-y-6 text-center">
				<Div class="flex flex-col items-center space-y-3">
					<Div class="rounded-full bg-white px-3 py-1 text-primary-500">Game of the Week</Div>
					<H1 class={twMerge(theme.getComponentVariant('H3', 'default'))}>Championship Showdown</H1>
					<P class="opacity-70">Don't miss this epic matchup!</P>
				</Div>
				<Card class="flex flex-col overflow-hidden p-0 sm:flex-row" variants={['light']}>
					<Div class="flex grow flex-col items-center space-y-6 bg-gray-50 p-6">
						<Img
							alt={teams[0].name}
							class="aspect-square h-24 rounded-full border-4 border-primary-500 object-cover"
							src={teams[0].imageSrc}
						/>
						<Div class="flex flex-col items-center">
							<H2 class={twMerge(theme.getComponentVariant('H5', 'default'))}>
								{teams[0].name}
							</H2>
							<P class="opacity-70">{teams[0].wins}-{teams[0].losses} Record</P>
						</Div>
					</Div>
					<Div class="flex grow flex-col items-center justify-center space-y-6 p-6">
						<P class="opacity-70">Saturday, December 13, 2025</P>
						<H2 class={twMerge(theme.getComponentVariant('H4', 'default'))}>7:30 PM</H2>
					</Div>
					<Div class="flex grow flex-col items-center space-y-6 bg-gray-50 p-6">
						<Img
							alt={teams[1].name}
							class="aspect-square h-24 rounded-full border-4 border-primary-500 object-cover"
							src={teams[1].imageSrc}
						/>
						<Div class="flex flex-col items-center">
							<H2 class={twMerge(theme.getComponentVariant('H5', 'default'))}>
								{teams[1].name}
							</H2>
							<P class="opacity-70">{teams[1].wins}-{teams[1].losses} Record</P>
						</Div>
					</Div>
				</Card>
			</Div>
		{/if}
	</Container>
</Section>

<Section>
	<Container class="flex flex-col space-y-6">
		<Div class="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
			<Select bind:value={team} options={teamOptions} />
		</Div>
		<Div class="flex flex-col space-y-6">
			<H3>Upcoming Games</H3>
			<Div class="flex flex-col space-y-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
				{#if remoteStatus === 'loading'}
					<Card>Loading</Card>
				{:else}
					{#each games as { date, team1, team2 }}
						{@const isVisible = team === 'All' || team1.name === team || team2.name === team}
						<Card class="flex flex-col overflow-hidden p-0" {isVisible} transition={slide}>
							<Div
								class="flex justify-between bg-slate-950 px-6 py-3 text-slate-50 dark:bg-slate-50 dark:text-slate-950"
							>
								<Div>{date.toLocaleString('default', { month: 'long', day: 'numeric' })}</Div>
								<Div class="text-primary-500"
									>{date.toLocaleString('default', { hour: 'numeric', minute: '2-digit' })}</Div
								>
							</Div>
							<Div class="flex">
								<Div class="flex grow flex-col items-center space-y-6 p-6">
									<Img
										alt={team1.name}
										class="aspect-square h-28 rounded-full object-cover"
										src={team1.imageSrc}
									/>
									<Div class="flex flex-col items-center">
										<H4>{team1.name}</H4>
										<P class="opacity-70">{team1.wins}-{team1.losses}</P>
									</Div>
								</Div>
								<H4 class="flex items-center">VS</H4>
								<Div class="flex grow flex-col items-center space-y-6 p-6">
									<Img
										alt={team2.name}
										class="aspect-square h-28 rounded-full object-cover"
										src={team2.imageSrc}
									/>
									<Div class="flex flex-col items-center">
										<H4>{team2.name}</H4>
										<P class="opacity-70">{team2.wins}-{team2.losses}</P>
									</Div>
								</Div>
							</Div>
						</Card>
					{/each}
				{/if}
			</Div>
		</Div>
	</Container>
</Section>
