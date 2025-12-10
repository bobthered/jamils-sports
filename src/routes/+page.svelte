<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import {
		A,
		Card,
		Container,
		Div,
		H1,
		H2,
		Img,
		P,
		Section,
		Table,
		Tbody,
		Th,
		Thead,
		Tr
	} from '$lib/components';
	import { theme } from '$lib/theme';

	// $state
	const featuredGames = $state([
		{
			date: 'Friday, 7:00PM',
			headerClasses: 'from-orange-500 to-red-500',
			team1: 'Thunder',
			team2: 'Warriors'
		},
		{
			date: 'Saturday, 6:30PM',
			headerClasses: 'from-blue-500 to-purple-500',
			team1: 'Hawks',
			team2: 'Eagles'
		},
		{
			date: 'Sunday, 5:00PM',
			headerClasses: 'from-green-500 to-teal-500',
			team1: 'Blazers',
			team2: 'Rockets'
		}
	]);
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
</script>

<Section class="relative bg-black p-0 text-gray-50 sm:p-0 md:p-0 lg:p-0 xl:p-0">
	<Img
		alt="Basketball Hoop in Basketball Court"
		class="absolute h-full w-full overflow-hidden object-cover opacity-30"
		src="https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg"
	/>
	<Container class={twMerge(theme.getComponentVariant('Section', 'lg'), 'relative')}>
		<Div class="flex flex-col space-y-6 text-center">
			<H1>Welcome to Jamil's League</H1>
			<P class="text-xl opacity-70">Where Champions Are Made</P>
			<Div class="flex flex-col space-y-6 sm:mx-auto sm:flex-row sm:space-y-0 sm:space-x-6">
				<A href="/sign-up" variants={['buttonDefault']}>Join the League</A>
				<A href="/schedule" variants={['buttonDefault', 'buttonLight']}>View Schedule</A>
			</Div>
		</Div>
	</Container>
</Section>

<Section class="text-center">
	<Container>
		<Div class="flex flex-col space-y-12">
			<H2>Featured Games This Week</H2>
			<Div class="flex flex-col space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
				{#each featuredGames as { date, headerClasses, team1, team2 }}
					<Card class="flex flex-col overflow-hidden p-0">
						<Div class={twMerge('bg-linear-to-r px-6 py-3 text-left text-white', headerClasses)}>
							{date}
						</Div>
						<Div class="flex items-center justify-center space-x-6 p-6">
							<Div class="flex flex-col text-xl font-semibold">
								<Div>{team1}</Div>
								<Div class="text-2xl font-semibold text-primary-500">-</Div>
							</Div>
							<Div>VS</Div>
							<Div class="flex flex-col text-xl font-semibold">
								<Div>{team2}</Div>
								<Div class="text-2xl font-semibold text-primary-500">-</Div>
							</Div>
						</Div>
					</Card>
				{/each}
			</Div>
		</Div>
	</Container>
</Section>

<Section class="bg-gray-100 text-center dark:bg-gray-900">
	<Container>
		<Div class="flex flex-col space-y-12">
			<H2>Our Teams</H2>
			<Div
				class="flex flex-col space-y-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 md:grid-cols-3"
			>
				{#each teams as { href, imageSrc, losses, name, wins }}
					<Card class="flex flex-col overflow-hidden p-0">
						<Img alt={name} class="h-40 w-full object-cover lg:h-56" src={imageSrc} />
						<Div class="flex flex-col space-y-3 p-6 text-left dark:bg-gray-800">
							<Div class="flex flex-col">
								<Div class="text-xl font-semibold">{name}</Div>
								<Div class="opacity-70">Record: {wins}-{losses}</Div>
							</Div>
							<A {href}>View Roster</A>
						</Div>
					</Card>
				{/each}
			</Div>
		</Div>
	</Container>
</Section>

<Section class="text-center">
	<Container>
		<Div class="flex flex-col space-y-12">
			<H2>League Standings</H2>
			<Card class="overflow-hidden p-0">
				<Table class="w-full">
					<Thead>
						<Tr>
							<Th>Rank</Th>
							<Th>Team</Th>
							<Th>W</Th>
							<Th>L</Th>
							<Th>PCT</Th>
							<Th>GB</Th>
						</Tr>
					</Thead>
					<Tbody>
						{#each teams as { losses, name, wins }, index}
							<Tr></Tr>
						{/each}
					</Tbody>
				</Table>
			</Card>
		</Div>
	</Container>
</Section>
