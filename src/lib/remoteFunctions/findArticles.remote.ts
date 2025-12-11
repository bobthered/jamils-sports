import { query } from '$app/server';

export const findArticles = query(async () => {
	const results = [
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
	});

	return results;
});
