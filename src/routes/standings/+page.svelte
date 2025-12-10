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
	import { theme } from '$lib/theme';

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
		].map(({ imageSrc, losses, name, wins }) => {
			const href = `/teams/${name.toLowerCase()}`;
			const pf = 1612 + Math.floor(Math.random() * wins * 40);
			const pa = 1612 + Math.floor(Math.random() * losses * 40);
			let streak = Math.floor(Math.random() * wins) - Math.floor(Math.random() * losses);
			if (streak === 0) streak = 1;
			return { href, imageSrc, losses, name, pa, pf, streak, wins };
		})
	);
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
				</Tbody>
			</Table>
		</Card>
	</Container>
</Section>
