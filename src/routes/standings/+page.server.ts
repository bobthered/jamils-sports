import { findTeams } from '$lib/remoteFunctions/findTeams.remote';

export const load = async () => {
	const teams = await findTeams();

	return { teams };
};
