<script lang="ts">
	import { page } from '$app/state';
	import { Card, Container, Div, H1, H3, Img, P, Section } from '$lib/components';
	import H2 from '$lib/components/H2/H2.svelte';
	import { findTeams } from '$lib/remoteFunctions/findTeams.remote';
	import { theme } from '$lib/theme';
	import { twMerge } from 'tailwind-merge';

	// helpers
	const getOrdinalSuffix = (number: number) => {
		const rule = pluralRules.select(number);
		const suffix = ordinalMapping[rule];

		return `${number}${suffix}`;
	};
	const ordinalMapping: Record<string, string> = {
		one: 'st',
		two: 'nd',
		few: 'rd',
		other: 'th'
	};
	const pluralRules = new Intl.PluralRules('default', { type: 'ordinal' });
	const updateTeams = async () => {
		const results = await findTeams();
		remoteStatus = 'fulfilled';
		teams = results;
	};

	// $state
	let remoteStatus: 'loading' | 'fulfilled' = $state('loading');
	let teams: Awaited<ReturnType<typeof findTeams>> = $state([]);

	// $derives
	const team = $derived.by(
		() =>
			teams.find((team) => team.name.toLowerCase() === page.params.name) ?? {
				href: '',
				name: 'test',
				assists: 0,
				imageSrc: '',
				losses: 0,
				fieldGoalAttempts: 1,
				fieldGoalMakes: 0,
				freeThrowAttempts: 1,
				freeThrowMakes: 0,
				rebounds: 0,
				streak: 0,
				threeAttempts: 1,
				threeMakes: 0,
				wins: 0
			}
	);
	const heroCards = $derived.by(() => [
		{
			classes: undefined,
			h2: team.wins,
			p: 'Wins',
			variants: ['orangeToRed']
		},
		{
			classes: undefined,
			h2: team.losses,
			p: 'Losses',
			variants: ['blueToPurple']
		},
		{
			classes: undefined,
			h2: (team.wins / (team.wins + team.losses)).toFixed(3),
			p: 'Win %',
			variants: ['greenToTeal']
		},
		{
			classes: team.streak > 0 ? 'text-green-500' : 'text-red-500',
			h2: `${team.streak > 0 ? 'W' : 'L'}${Math.abs(team.streak)}`,
			p: 'Streak',
			variants: ['light']
		}
	]);

	// $effects
	$effect(() => {
		updateTeams();
	});
</script>

<Section class="relative bg-black text-gray-50" variants={['min']}>
	<Img
		alt={team.name}
		class="absolute h-full w-full overflow-hidden object-cover opacity-30"
		src={team.imageSrc}
	/>
	<Container class={twMerge(theme.getComponentVariant('Section', 'lg'), 'relative')}>
		<Div class="flex flex-col space-y-6">
			<Div class="flex items-center justify-center space-x-6 md:justify-start">
				<H1>{team.name}</H1>
				<Div class={twMerge('rounded-full bg-green-500 px-3 py-1 text-white')}>
					{getOrdinalSuffix(1)} Place
				</Div>
			</Div>
			<Div class="grid grid-cols-2 gap-6 md:grid-cols-4">
				{#each heroCards as { classes, h2, p, variants }}
					<Card class="flex flex-col items-center" {variants}>
						<H2 class={twMerge(theme.getComponentVariant('H3', 'default'), classes)}>{h2}</H2>
						<P class="opacity-70">{p}</P>
					</Card>
				{/each}
			</Div>
		</Div>
	</Container>
</Section>

<Section>
	<Container class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
		<Div class="flex flex-col items-center">
			<H3 class={twMerge(theme.getComponentVariant('H4', 'default'))}>
				{(
					(team.freeThrowMakes + team.fieldGoalMakes * 2 + team.threeMakes * 3) /
					(team.wins + team.losses)
				).toFixed(1)}
			</H3>
			<P class="opacity-70">PPG</P>
		</Div>
		<Div class="flex flex-col items-center">
			<H3 class={twMerge(theme.getComponentVariant('H4', 'default'))}>
				{(1600 / (team.wins + team.losses)).toFixed(1)}
			</H3>
			<P class="opacity-70">Opp PPG</P>
		</Div>
		<Div class="flex flex-col items-center">
			<H3 class={twMerge(theme.getComponentVariant('H4', 'default'))}>
				{((team.fieldGoalMakes * 100) / team.fieldGoalAttempts).toFixed(1)}
			</H3>
			<P class="opacity-70">FG%</P>
		</Div>
		<Div class="flex flex-col items-center">
			<H3 class={twMerge(theme.getComponentVariant('H4', 'default'))}>
				{((team.threeMakes * 100) / team.threeAttempts).toFixed(1)}
			</H3>
			<P class="opacity-70">3P%</P>
		</Div>
		<Div class="flex flex-col items-center">
			<H3 class={twMerge(theme.getComponentVariant('H4', 'default'))}>
				{(team.rebounds / (team.wins + team.losses)).toFixed(1)}
			</H3>
			<P class="opacity-70">RPG</P>
		</Div>
		<Div class="flex flex-col items-center">
			<H3 class={twMerge(theme.getComponentVariant('H4', 'default'))}>
				{(team.assists / (team.wins + team.losses)).toFixed(1)}
			</H3>
			<P class="opacity-70">APG</P>
		</Div>
	</Container>
</Section>
