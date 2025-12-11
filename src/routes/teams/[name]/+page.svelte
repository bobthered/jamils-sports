<script lang="ts">
	import { page } from '$app/state';
	import { Card, Container, Div, H1, H3, Img, P, Section } from '$lib/components';
	import H2 from '$lib/components/H2/H2.svelte';
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

	// $state
	const teams = $state(
		[
			{
				imageSrc:
					'https://images.pexels.com/photos/71103/basketball-sports-teams-players-71103.jpeg',
				losses: 3,
				name: 'Thunder',
				wins: 12
			},
			{
				imageSrc: 'https://images.pexels.com/photos/974502/pexels-photo-974502.jpeg',
				losses: 4,
				name: 'Warriors',
				wins: 11
			},
			{
				imageSrc: 'https://images.pexels.com/photos/974501/pexels-photo-974501.jpeg',
				losses: 5,
				name: 'Hawks',
				wins: 10
			},
			{
				imageSrc: 'https://images.pexels.com/photos/3755445/pexels-photo-3755445.jpeg',
				losses: 6,
				name: 'Eagles',
				wins: 9
			},
			{
				imageSrc: 'https://images.pexels.com/photos/5586480/pexels-photo-5586480.jpeg',
				losses: 8,
				name: 'Blazers',
				wins: 7
			},
			{
				imageSrc: 'https://images.pexels.com/photos/8979937/pexels-photo-8979937.jpeg',
				losses: 10,
				name: 'Rockets',
				wins: 5
			}
		].map(({ imageSrc, losses, name, wins }, index) => {
			const href = `/teams/${name.toLowerCase()}`;
			const pa = 1612 + Math.floor(Math.random() * losses * 40);
			const pf = 1612 + Math.floor(Math.random() * wins * 40);
			const rank = index + 1;
			let streak = Math.floor(Math.random() * wins) - Math.floor(Math.random() * losses);
			const twoMakes = Math.floor(pa * (Math.random() * 0.1 + 0.3) * (1 / 2));
			const twoAttempts = Math.floor(twoMakes / (Math.random() * 0.2 + 0.5));
			const threeMakes = Math.floor(pa * (Math.random() * 0.1 + 0.3) * (1 / 3));
			const threeAttempts = Math.floor(threeMakes / (Math.random() * 0.2 + 0.2));
			const oneMakes = pa - twoMakes * 2 - threeMakes * 3;
			const oneAttempts = Math.floor(oneMakes / (Math.random() * 0.2 + 0.7));
			const rebounds = Math.floor((Math.random() * 12 + 8) * 15);
			const assists = Math.floor((Math.random() * 12 + 8) * 15);
			if (streak === 0) streak = 1;
			return {
				assists,
				href,
				imageSrc,
				losses,
				name,
				oneAttempts,
				oneMakes,
				pa,
				pf,
				rank,
				rebounds,
				streak,
				threeAttempts,
				threeMakes,
				twoAttempts,
				twoMakes,
				wins
			};
		})
	);

	// $derives
	const team = $derived.by(
		() =>
			teams.find((team) => team.name.toLowerCase() === page.params.name) ?? {
				assists: 0,
				href: '',
				imageSrc: '',
				losses: 0,
				name: 'test',
				oneAttempts: 1,
				oneMakes: 0,
				pa: 0,
				pf: 0,
				rank: 0,
				rebounds: 0,
				streak: 0,
				threeAttempts: 1,
				threeMakes: 0,
				twoAttempts: 1,
				twoMakes: 0,
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
					{getOrdinalSuffix(team.rank)} Place
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
				{(team.pf / (team.wins + team.losses)).toFixed(1)}
			</H3>
			<P class="opacity-70">PPG</P>
		</Div>
		<Div class="flex flex-col items-center">
			<H3 class={twMerge(theme.getComponentVariant('H4', 'default'))}>
				{(team.pa / (team.wins + team.losses)).toFixed(1)}
			</H3>
			<P class="opacity-70">Opp PPG</P>
		</Div>
		<Div class="flex flex-col items-center">
			<H3 class={twMerge(theme.getComponentVariant('H4', 'default'))}>
				{((team.twoMakes * 100) / team.twoAttempts).toFixed(1)}
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
