import { query } from '$app/server';

export const findTeams = query(async () => {
	const results = [
		{
			href: '/teams/thunder',
			name: 'Thunder',
			assists: 150,
			imageSrc: 'https://images.pexels.com/photos/71103/basketball-sports-teams-players-71103.jpeg',
			losses: 3,
			fieldGoalAttempts: 525,
			fieldGoalMakes: 210,
			freeThrowAttempts: 345,
			freeThrowMakes: 225,
			rebounds: 150,
			streak: 4,
			threeAttempts: 615,
			threeMakes: 180,
			wins: 12
		},
		{
			href: '/teams/warriors',
			name: 'Warriors',
			assists: 150,
			imageSrc: 'https://images.pexels.com/photos/974502/pexels-photo-974502.jpeg',
			losses: 4,
			fieldGoalAttempts: 645,
			fieldGoalMakes: 330,
			freeThrowAttempts: 300,
			freeThrowMakes: 210,
			rebounds: 150,
			streak: 2,
			threeAttempts: 615,
			threeMakes: 120,
			wins: 11
		},
		{
			href: '/teams/hawks',
			name: 'Hawks',
			assists: 135,
			imageSrc: 'https://images.pexels.com/photos/974501/pexels-photo-974501.jpeg',
			losses: 5,
			fieldGoalAttempts: 645,
			fieldGoalMakes: 165,
			freeThrowAttempts: 360,
			freeThrowMakes: 210,
			rebounds: 120,
			streak: 6,
			threeAttempts: 645,
			threeMakes: 195,
			wins: 10
		},
		{
			href: '/teams/eagles',
			name: 'Eagles',
			assists: 165,
			imageSrc: 'https://images.pexels.com/photos/3755445/pexels-photo-3755445.jpeg',
			losses: 6,
			fieldGoalAttempts: 585,
			fieldGoalMakes: 180,
			freeThrowAttempts: 360,
			freeThrowMakes: 225,
			rebounds: 165,
			streak: 1,
			threeAttempts: 540,
			threeMakes: 195,
			wins: 9
		},
		{
			href: '/teams/blazers',
			name: 'Blazers',
			assists: 120,
			imageSrc: 'https://images.pexels.com/photos/5586480/pexels-photo-5586480.jpeg',
			losses: 8,
			fieldGoalAttempts: 615,
			fieldGoalMakes: 165,
			freeThrowAttempts: 330,
			freeThrowMakes: 240,
			rebounds: 135,
			streak: 4,
			threeAttempts: 645,
			threeMakes: 165,
			wins: 7
		},
		{
			href: '/teams/rockets',
			name: 'Rockets',
			assists: 135,
			imageSrc: 'https://images.pexels.com/photos/8979937/pexels-photo-8979937.jpeg',
			losses: 10,
			fieldGoalAttempts: 540,
			fieldGoalMakes: 285,
			freeThrowAttempts: 360,
			freeThrowMakes: 210,
			rebounds: 150,
			streak: -4,
			threeAttempts: 630,
			threeMakes: 135,
			wins: 5
		}
	];

	return results;
});
