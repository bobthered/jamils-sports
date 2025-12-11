import { findArticles } from '$lib/remoteFunctions/findArticles.remote';
import { findGames } from '$lib/remoteFunctions/findGames.remote';
import { findTeams } from '$lib/remoteFunctions/findTeams.remote';

export const load = async () => {
	const [articles, games, teams] = await Promise.all([findArticles(), findGames(), findTeams()]);

	return { articles, games, teams };
};
