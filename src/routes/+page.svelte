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
		Td,
		Th,
		Thead,
		Tr
	} from '$lib/components';
	import { findArticles } from '$lib/remoteFunctions/findArticles.remote';
	import { findGames } from '$lib/remoteFunctions/findGames.remote';
	import { findTeams } from '$lib/remoteFunctions/findTeams.remote';
	import { theme } from '$lib/theme';

	// helpers
	const updateState = async () => {
		const [articlesResult, gamesResult, teamsResult] = await Promise.all([
			findArticles(),
			findGames(),
			findTeams()
		]);
		remoteStatus = 'fulfilled';
		articles = articlesResult;
		games = gamesResult;
		teams = teamsResult;
	};

	// $state
	let articles: Awaited<ReturnType<typeof findArticles>> = $state([]);
	let games: Awaited<ReturnType<typeof findGames>> = $state([]);
	let remoteStatus: 'loading' | 'fulfilled' = $state('loading');
	let teams: Awaited<ReturnType<typeof findTeams>> = $state([]);

	// $derived
	const featuredGames = $derived.by(() => games.slice(0, 3));
	const latestArticles = $derived.by(() => articles.slice(0, 3));

	// $effects
	$effect(() => {
		updateState();
	});
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
			{#if remoteStatus === 'fulfilled'}
				<Div class="flex flex-col space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
					{#each featuredGames as { date, team1, team2 }}
						<Card
							class="flex scale-100 flex-col overflow-hidden p-0 transition duration-200 hover:scale-105 hover:shadow-xl"
						>
							<Div class={twMerge('bg-linear-to-r px-6 py-3 text-left text-white')}>
								{date.toLocaleString('default', {
									weekday: 'long',
									hour: 'numeric',
									minute: '2-digit'
								})}
							</Div>
							<Div class="flex items-center justify-center space-x-6 p-6">
								<Div class="flex flex-col text-xl font-semibold">
									<Div>{team1.name}</Div>
									<Div class="text-2xl font-semibold text-primary-500">-</Div>
								</Div>
								<Div>VS</Div>
								<Div class="flex flex-col text-xl font-semibold">
									<Div>{team2.name}</Div>
									<Div class="text-2xl font-semibold text-primary-500">-</Div>
								</Div>
							</Div>
						</Card>
					{/each}
				</Div>
			{/if}
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
				{#if remoteStatus === 'fulfilled'}
					{#each teams as { href, imageSrc, losses, name, wins }}
						<Card
							class="flex scale-100 flex-col overflow-hidden p-0 transition duration-200 hover:scale-105 hover:shadow-xl"
						>
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
				{/if}
			</Div>
		</Div>
	</Container>
</Section>

<Section>
	<Container>
		<Div class="flex flex-col space-y-12">
			<H2 class="text-center">League Standings</H2>
			<Card class="relative overflow-auto p-0">
				<Table class="w-full">
					<Thead>
						<Tr>
							<Th>Rank</Th>
							<Th class="sticky left-0 text-left">Team</Th>
							<Th>W</Th>
							<Th>L</Th>
							<Th>PCT</Th>
							<Th>GB</Th>
						</Tr>
					</Thead>
					<Tbody>
						{#if remoteStatus === 'fulfilled'}
							{#each teams as { losses, name, wins }, index}
								<Tr>
									<Td class="text-center">{index + 1}</Td>
									<Td class="sticky left-0">{name}</Td>
									<Td class="text-center">{wins}</Td>
									<Td class="text-center">{losses}</Td>
									<Td class="text-center">{(wins / (losses + wins)).toFixed(3)}</Td>
									<Td class="text-center">{(12 - wins).toFixed(1)}</Td>
								</Tr>
							{/each}
						{/if}
					</Tbody>
				</Table>
			</Card>
		</Div>
	</Container>
</Section>

<Section class="bg-gray-100 text-center dark:bg-gray-900">
	<Container>
		<Div class="flex flex-col space-y-12">
			<H2>Latest News</H2>
			<Div
				class="flex flex-col space-y-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 md:grid-cols-3"
			>
				{#if remoteStatus === 'fulfilled'}
					{#each latestArticles as { body, date, href, imageSrc, title }}
						<Card
							class="flex scale-100 flex-col overflow-hidden p-0 transition duration-200 hover:scale-105 hover:shadow-xl"
						>
							<Img alt={title} class="h-40 w-full object-cover lg:h-56" src={imageSrc} />
							<Div class="flex grow flex-col space-y-3 p-6 text-left dark:bg-gray-800">
								<Div class="text-sm text-primary-500">{date}</Div>
								<Div class="text-xl font-semibold">{title}</Div>
								<Div class="grow opacity-70">{body}</Div>
								<A {href}>Read More</A>
							</Div>
						</Card>
					{/each}
				{/if}
			</Div>
		</Div>
	</Container>
</Section>
