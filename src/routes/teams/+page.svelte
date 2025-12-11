<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { A, Card, Container, Div, Img, Section } from '$lib/components';
	import { findTeams } from '$lib/remoteFunctions/findTeams.remote';
	import { theme } from '$lib/theme';

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

	// $effects
	$effect(() => {
		updateTeams();
	});
</script>

<Section>
	<Container>
		<Div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
			{#if remoteStatus === 'loading'}
				<Card>Loading</Card>
			{:else}
				{#each teams as { href, imageSrc, losses, name, pa, pf, streak, wins }, index}
					<Card
						class="flex scale-100 flex-col overflow-hidden p-0 transition duration-200 hover:scale-105 hover:shadow-xl"
					>
						<Img alt={name} class="h-48 w-full object-cover sm:h-48" src={imageSrc} />
						<Div class="flex flex-col space-y-6 p-6">
							<Div class="flex items-center justify-between">
								<Div class={twMerge(theme.getComponentVariant('H4', 'default'))}>{name}</Div>
								<Div class="rounded-full bg-green-500/10 px-3 py-1 text-green-500"
									>{getOrdinalSuffix(index + 1)}</Div
								>
							</Div>
							<Div class="grid grid-cols-3 gap-6">
								<Div class="flex flex-col items-center">
									<Div class={twMerge(theme.getComponentVariant('H5', 'default'))}>{wins}</Div>
									<Div class="text-sm opacity-70">Wins</Div>
								</Div>
								<Div class="flex flex-col items-center">
									<Div class={twMerge(theme.getComponentVariant('H5', 'default'))}>{losses}</Div>
									<Div class="text-sm opacity-70">Losses</Div>
								</Div>
								<Div class="flex flex-col items-center">
									<Div class={twMerge(theme.getComponentVariant('H5', 'default'))}
										>{(wins / (wins + losses)).toFixed(3)}</Div
									>
									<Div class="text-sm opacity-70">PCT</Div>
								</Div>
							</Div>
							<Div class="flex items-center justify-between">
								<Div class="text-sm opacity-70">Current Streak:</Div>
								<Div
									class={twMerge(
										'rounded-full px-3 py-1',
										streak > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
									)}>{streak > 0 ? 'W' : 'L'}{Math.abs(streak)}</Div
								>
							</Div>
							<A
								class={twMerge(theme.getComponentVariant('Button', 'default'), 'text-center')}
								{href}>View Team Profile</A
							>
						</Div>
					</Card>
				{/each}
			{/if}
		</Div>
	</Container>
</Section>
