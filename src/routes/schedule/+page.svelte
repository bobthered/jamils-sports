<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import {
		Button,
		Card,
		Container,
		Div,
		H1,
		H2,
		H3,
		H4,
		Img,
		P,
		Section,
		Select
	} from '$lib/components';
	import { theme } from '$lib/theme';
	import { Calendar, List } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	// $state
	let team = $state('All');
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
		].map(({ imageSrc, losses, name, wins }) => {
			const href = `/teams/${name.toLowerCase()}`;
			return { href, imageSrc, losses, name, wins };
		})
	);
	let view = $state('List');
	const views = $state([
		{
			Icon: List,
			label: 'List'
		},
		{
			Icon: Calendar,
			label: 'Calendar'
		}
	]);

	// $derives
	const games = $derived.by(() => {
		let availableTeams = structuredClone($state.snapshot(teams));
		let currentDate = new Date();
		currentDate.setHours(18, 0, 0);
		let games = [];

		while (games.length < 8) {
			const team1Index = Math.floor(Math.random() * availableTeams.length);
			const team1 = availableTeams[team1Index];
			availableTeams = availableTeams.filter((_, index) => index !== team1Index);

			const team2Index = Math.floor(Math.random() * availableTeams.length);
			const team2 = availableTeams[team2Index];
			availableTeams = availableTeams.filter((_, index) => index !== team2Index);

			games.push({ date: new Date(currentDate), team1, team2 });

			if (availableTeams.length === 0) availableTeams = structuredClone($state.snapshot(teams));
			currentDate.setHours(currentDate.getHours() + 1);
			if (currentDate.getHours() > 21) {
				currentDate.setDate(currentDate.getDate() + 7);
				currentDate.setHours(18, 0, 0);
			}
		}

		return games;
	});
	const teamOptions = $derived.by(() => [
		{ label: 'All', value: 'All' },
		...teams
			.map(({ name }) => ({ label: name, value: name }))
			.sort((a, b) => a.label.localeCompare(b.label))
	]);
</script>

<Section class={twMerge(theme.getComponentVariant('Card', 'orangeToRed'))} variants={[]}>
	<Container>
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
	</Container>
</Section>

<Section>
	<Container class="flex flex-col space-y-6">
		<Div class="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
			<Select bind:value={team} options={teamOptions} />
			<Div class="grid grid-cols-2 gap-2">
				{#each views as { Icon, label }}
					<Button
						onclick={() => (view = label)}
						variants={label !== view ? ['contrast'] : undefined}
					>
						<Div class="flex items-center justify-center space-x-2">
							<Icon />
							<Div>{label}</Div>
						</Div>
					</Button>
				{/each}
			</Div>
		</Div>
		<Div class="flex flex-col space-y-6">
			<H3>Upcoming Games</H3>
			<Div class="flex flex-col space-y-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
				{#each games as { date, team1, team2 }}
					<Card
						class="flex flex-col overflow-hidden p-0"
						isVisible={team === 'All' || team1.name === team || team2.name === team}
						transition={slide}
					>
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
			</Div>
		</Div>
	</Container>
</Section>
