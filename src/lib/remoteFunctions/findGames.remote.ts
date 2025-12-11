import { query } from '$app/server';
import { findTeams } from './findTeams.remote';

export const findGames = query(async () => {
	const teams = await findTeams();

	return [
		{
			date: new Date('2025-12-11T23:00:00.287Z'),
			team1: teams[0],
			team2: teams[1]
		},
		{
			date: new Date('2025-12-12T00:00:00.287Z'),
			team1: teams[2],
			team2: teams[3]
		},
		{
			date: new Date('2025-12-12T01:00:00.287Z'),
			team1: teams[4],
			team2: teams[5]
		},
		{
			date: new Date('2025-12-12T02:00:00.287Z'),
			team1: teams[1],
			team2: teams[0]
		},
		{
			date: new Date('2025-12-18T23:00:00.287Z'),
			team1: teams[3],
			team2: teams[2]
		},
		{
			date: new Date('2025-12-19T00:00:00.287Z'),
			team1: teams[5],
			team2: teams[4]
		},
		{
			date: new Date('2025-12-19T01:00:00.287Z'),
			team1: teams[5],
			team2: teams[0]
		},
		{
			date: new Date('2025-12-19T02:00:00.287Z'),
			team1: teams[2],
			team2: teams[4]
		}
	];
});
