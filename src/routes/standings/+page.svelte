<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import {
		A,
		Card,
		Container,
		Div,
		Img,
		Section,
		Table,
		Tbody,
		Td,
		Th,
		Thead,
		Tr
	} from '$lib/components';
	import { findTeams } from '$lib/remoteFunctions/findTeams.remote';
	import { theme } from '$lib/theme';

	// helpers
	const updateTeams = async () => {
		const results = await findTeams();
		remoteStatus = 'fulfilled';
		teams = results;
	};

	// $state
	let remoteStatus: 'loading' | 'fulfilled' = $state('loading');
	let teams: Awaited<ReturnType<typeof findTeams>> = $state([]);

	// $effects
	$effect(() => {
		updateTeams();
	});
</script>

<Section class={twMerge(theme.getComponentVariant('Card', 'blueToPurple'))}>
	<Container>
		<Card class="relative overflow-auto p-0">
			<Table class="w-full">
				<Thead>
					<Tr>
						<Th class="text-center">Rank</Th>
						<Th class="sticky left-0 text-left">Team</Th>
						<Th class="text-center">W</Th>
						<Th class="text-center">L</Th>
						<Th class="text-center">PCT</Th>
						<Th class="text-center">GB</Th>
						<Th class="text-center">PF</Th>
						<Th class="text-center">PA</Th>
						<Th class="text-center">DIFF</Th>
						<Th class="text-center">Streak</Th>
					</Tr>
				</Thead>
				<Tbody>
					{#if remoteStatus === 'loading'}
						<Tr><Td colspan={10}>Loading...</Td></Tr>
					{:else}
						{#each teams as { href, imageSrc, losses, name, pa, pf, streak, wins }, index}
							<Tr>
								<Td class="text-center">{index + 1}</Td>
								<Td class="sticky left-0 font-semibold">
									<Div class="flex items-center space-x-2 ">
										<Img
											alt={name}
											class="aspect-square h-10 rounded-full object-cover"
											src={imageSrc}
										/>
										<A href="/teams/{name.toLowerCase()}">{name}</A>
									</Div>
								</Td>
								<Td class="text-center">{wins}</Td>
								<Td class="text-center">{losses}</Td>
								<Td class="text-center">{(wins / (wins + losses)).toFixed(3)}</Td>
								<Td class="text-center">{(12 - wins).toFixed(1)}</Td>
								<Td class="text-center">{pf}</Td>
								<Td class="text-center">{pa}</Td>
								<Td class={twMerge('text-center', pf - pa >= 0 ? 'text-green-500' : 'text-red-500')}
									>{pf - pa > 0 ? '+' : ''}{pf - pa}</Td
								>
								<Td class="text-center">
									<Div
										class={twMerge(
											'rounded-full px-3 py-1',
											streak > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
										)}
									>
										{streak > 0 ? 'W' : 'L'}{Math.abs(streak)}
									</Div>
								</Td>
							</Tr>
						{/each}
					{/if}
				</Tbody>
			</Table>
		</Card>
	</Container>
</Section>
