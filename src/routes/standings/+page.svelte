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
	import type { PageProps } from '../$types';

	// $props
	let { data }: PageProps = $props();
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
					{#each data.teams as { imageSrc, fieldGoalMakes, freeThrowMakes, losses, name, streak, threeMakes, wins }, index}
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
							<Td class="text-center">{freeThrowMakes + fieldGoalMakes * 2 + threeMakes * 3}</Td>
							<Td class="text-center">{1600}</Td>
							<Td
								class={twMerge(
									'text-center',
									freeThrowMakes + fieldGoalMakes * 2 + threeMakes * 3 - 1600 >= 0
										? 'text-green-500'
										: 'text-red-500'
								)}
								>{freeThrowMakes + fieldGoalMakes * 2 + threeMakes * 3 - 1600 > 0
									? '+'
									: ''}{freeThrowMakes + fieldGoalMakes * 2 + threeMakes * 3 - 1600}</Td
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
