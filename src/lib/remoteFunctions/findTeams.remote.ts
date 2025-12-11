import { query } from '$app/server';

export const findTeams = query(async () => {
	const results = [
		{
			imageSrc: 'https://images.pexels.com/photos/71103/basketball-sports-teams-players-71103.jpeg',
			losses: 3,
			name: 'Thunder',
			pa: 1656,
			pf: 1862,
			streak: 4,
			wins: 12
		},
		{
			imageSrc: 'https://images.pexels.com/photos/974502/pexels-photo-974502.jpeg',
			losses: 4,
			name: 'Warriors',
			pa: 1719,
			pf: 1663,
			streak: 2,
			wins: 11
		},
		{
			imageSrc: 'https://images.pexels.com/photos/974501/pexels-photo-974501.jpeg',
			losses: 5,
			name: 'Hawks',
			pa: 1659,
			pf: 1659,
			streak: 6,
			wins: 10
		},
		{
			imageSrc: 'https://images.pexels.com/photos/3755445/pexels-photo-3755445.jpeg',
			losses: 6,
			name: 'Eagles',
			pa: 1680,
			pf: 1810,
			streak: 1,
			wins: 9
		},
		{
			imageSrc: 'https://images.pexels.com/photos/5586480/pexels-photo-5586480.jpeg',
			losses: 8,
			name: 'Blazers',
			pa: 1877,
			pf: 1707,
			streak: 4,
			wins: 7
		},
		{
			imageSrc: 'https://images.pexels.com/photos/8979937/pexels-photo-8979937.jpeg',
			losses: 10,
			name: 'Rockets',
			pa: 1793,
			pf: 1770,
			streak: -4,
			wins: 5
		}
	].map(({ imageSrc, losses, name, pa, pf, streak, wins }) => {
		const href = `/teams/${name.toLowerCase()}`;
		return { href, imageSrc, losses, name, pa, pf, streak, wins };
	});

	return results;
});
