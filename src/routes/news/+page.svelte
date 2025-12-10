<script lang="ts">
	import {
		A,
		Button,
		Card,
		Container,
		Div,
		Form,
		H1,
		H2,
		H3,
		Img,
		Input,
		P,
		Section
	} from '$lib/components';
	import { theme } from '$lib/theme';
	import { Search } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	// $state
	const articles = $state(
		[
			{
				body: 'The Thunder dominated the Warriors in a thrilling overtime victory, extending their winning streak to seven consecutive games.',
				date: 'December 10, 2025',
				imageSrc: 'https://images.pexels.com/photos/1331750/pexels-photo-1331750.jpeg',
				tags: [],
				title: 'Thunder Extends Winning Streak to 7 Games'
			},
			{
				body: 'Three players are neck-and-neck in the race for league MVP as the regular season enters its final stretch.',
				date: 'December 9, 2025',
				imageSrc: 'https://images.pexels.com/photos/945471/pexels-photo-945471.jpeg',
				tags: ['Player News'],
				title: 'MVP Race Heats Up in Final Weeks'
			},
			{
				body: 'With only three weeks remaining in the regular season, teams are jockeying for playoff positioning.',
				date: 'December 8, 2025',
				imageSrc: 'https://images.pexels.com/photos/1293265/pexels-photo-1293265.jpeg',
				tags: ['Announcements'],
				title: 'Playoff Picture Taking Shape'
			},
			{
				body: 'A comprehensive look at the current standings and what each team needs to do to secure a playoff berth.',
				date: 'December 7, 2025',
				imageSrc: 'https://images.pexels.com/photos/258004/pexels-photo-258004.jpeg',
				tags: ['Analysis'],
				title: "Breaking Down the Playoff Picture: Who's In, Who's Out"
			},
			{
				body: 'The Blazers snapped their losing streak with a convincing 94-82 win against the struggling Rockets.',
				date: 'December 6, 2025',
				imageSrc: 'https://images.pexels.com/photos/974498/pexels-photo-974498.jpeg',
				tags: ['Game Recaps'],
				title: 'Blazers End Three-Game Skid with Victory Over Rockets'
			}
		].map(({ body, date, imageSrc, tags, title }) => {
			const href = `/news/${title.toLowerCase().split(' ').join('-')}`;
			return { body, date, href, imageSrc, tags, title };
		})
	);
	let filter = $state('All');
	const filters = $state([
		'All',
		'Analysis',
		'Announcements',
		'Interviews',
		'Game Recaps',
		'Player News'
	]);
	const tagClasses: Record<string, string> = $state({
		Analysis: 'bg-green-500/10 text-green-500 selection:bg-green-500 selection:text-green-500/10',
		Announcements: 'bg-red-500/10 text-red-500 selection:bg-red-500 selection:text-red-500/10',
		Interviews: 'bg-pink-500/10 text-pink-500 selection:bg-pink-500 selection:text-pink-500/10',
		'Game Recaps': 'bg-blue-500/10 text-blue-500 selection:bg-blue-500 selection:text-blue-500/10',
		'Player News':
			'bg-purple-500/10 text-purple-500 selection:bg-purple-500 selection:text-purple-500/10'
	});

	// $derived
	const categories = $derived.by(() =>
		filters
			.filter((filter) => filter !== 'All')
			.map((label) => {
				const numberOfArticles = Math.floor(Math.random() * 30) + 5;
				return { label, numberOfArticles };
			})
			.sort((a, b) => b.numberOfArticles - a.numberOfArticles)
	);
	const featuredArticle = $derived.by(() => articles[0]);
	const latestArticles = $derived.by(() => articles.slice(1, articles.length));
	const popularPosts = $derived.by(() =>
		articles
			.map((article) => {
				const popularity = Math.random();
				return { popularity, ...article };
			})
			.sort((a, b) => b.popularity - a.popularity)
			.slice(0, 3)
	);
</script>

<Section>
	<Container>
		<Card
			class="relative flex scale-100 flex-col overflow-hidden p-0 transition duration-200 hover:scale-105 hover:shadow-xl lg:grid lg:grid-cols-2"
		>
			<Img
				alt={featuredArticle.title}
				class="h-56 w-full object-cover lg:h-auto"
				src={featuredArticle.imageSrc}
			/>
			<Div
				class="flex flex-col space-y-6 bg-gray-950 p-6 text-gray-50 dark:bg-gray-50 dark:text-gray-950"
			>
				<Div class="flex items-center space-x-3">
					<Div class="text-primary-500">{featuredArticle.date}</Div>
					<Div class="opacity-70">|</Div>
					<Div class="opacity-70">5 min read</Div>
				</Div>
				<H1 class={twMerge(theme.getComponentVariant('H4', 'default'))}>{featuredArticle.title}</H1>
				<P class="grow opacity-70">{featuredArticle.body}</P>
				<A href={featuredArticle.href}>Read Full Story</A>
			</Div>
			<Div class="absolute top-3 left-3 rounded-full bg-primary-500 px-3 py-1 text-white">
				Featured
			</Div>
		</Card>
	</Container>
</Section>

<Section class="bg-gray-100 dark:bg-gray-900">
	<Container>
		<Div class="flex flex-col space-y-12">
			<Div class="flex flex-col lg:flex-row lg:justify-between">
				<Div class="relative grow lg:grow-0">
					<Input class="w-full pl-12 lg:w-auto dark:bg-gray-950" placeholder="Search articles..." />
					<Search
						class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
					/>
				</Div>
				<Div class="flex flex-wrap lg:-mt-2 lg:-mr-2">
					{#each filters as value}
						<Button
							class="mt-2 mr-2"
							onclick={() => (filter = value)}
							variants={value !== filter ? ['contrast'] : undefined}>{value}</Button
						>
					{/each}
				</Div>
			</Div>
			<Div class="flex flex-col space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
				<Div class="flex flex-col space-y-6 lg:col-span-2">
					<H2 class={theme.getComponentVariant('H5', 'default')}>Latest Articles</H2>
					{#each latestArticles as { body, date, href, imageSrc, tags, title }}
						<Card
							class="scale-100 overflow-hidden p-0 transition duration-200 hover:scale-105 hover:shadow-xl lg:flex"
							isVisible={tags.includes(filter) || filter === 'All'}
							transition={slide}
						>
							<Img
								alt={title}
								class="h-56 w-full object-cover lg:aspect-square lg:h-72 lg:w-auto"
								src={imageSrc}
							/>
							<Div class="flex flex-col space-y-3 p-6 lg:grow dark:bg-gray-950">
								<Div class="flex items-center space-x-4">
									{#each tags as tag}
										<Div class={twMerge('rounded-full px-3 py-1 text-sm', tagClasses?.[tag])}
											>{tag}</Div
										>
									{/each}
									<Div class="text-sm opacity-70">{date}</Div>
								</Div>
								<H3 class={theme.getComponentVariant('H6', 'default')}>{title}</H3>
								<P class="grow opacity-70">{body}</P>
								<Div class="flex items-center justify-between">
									<A {href}>Read More</A>
									<Div class="text-sm opacity-70">4 min read</Div>
								</Div>
							</Div>
						</Card>
					{/each}
				</Div>
				<Div class="flex flex-col space-y-6">
					<Card class="flex flex-col space-y-3 dark:bg-gray-950">
						<H3 class={theme.getComponentVariant('H6', 'default')}>Categories</H3>
						<Div class="flex flex-col">
							{#each categories as { label, numberOfArticles }}
								<Div class="flex items-center justify-between space-x-4">
									<Button
										class="-ml-6 grow text-left"
										onclick={() => (filter = label)}
										variants={['ghost']}>{label}</Button
									>
									<Div class="rounded-full bg-gray-950/10 px-3 py-1 dark:bg-gray-50/10"
										>{numberOfArticles}</Div
									>
								</Div>
							{/each}
						</Div>
					</Card>
					<Card class="flex flex-col space-y-3 dark:bg-gray-950">
						<H3 class={theme.getComponentVariant('H6', 'default')}>Popular Posts</H3>
						{#each popularPosts as { date, imageSrc, title }}
							<Div class="flex space-x-4">
								<Img alt={title} class="aspect-square h-32 rounded object-cover" src={imageSrc} />
								<Div class="flex flex-col space-y-6">
									<Div class="grow font-semibold">{title}</Div>
									<P class="text-sm opacity-70">{date}</P>
								</Div>
							</Div>
						{/each}
					</Card>
					<Form
						class={twMerge(
							theme.getComponentVariant('Card', 'default'),
							theme.getComponentVariant('Card', 'orangeToRed'),
							'flex flex-col space-y-3'
						)}
					>
						<H3 class={theme.getComponentVariant('H6', 'default')}>Stay Updated</H3>
						<P class="text-sm opacity-70"
							>Subscribe to our newsletter for the latest news and updates.</P
						>
						<Input placeholder="Your email..." variants={['light']} />
						<Button class="text-primary-500" type="submit" variants={['light']}>Subscribe</Button>
					</Form>
				</Div>
			</Div>
		</Div>
	</Container>
</Section>
