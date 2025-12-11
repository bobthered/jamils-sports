import { findGames } from '$lib/remoteFunctions/findGames.remote';
import { findTeams } from '$lib/remoteFunctions/findTeams.remote';

export const load = async () => {
	const [games, teams] = await Promise.all([findGames(), findTeams()]);

	return { games, teams };
};
