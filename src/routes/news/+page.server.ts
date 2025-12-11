import { findArticles } from '$lib/remoteFunctions/findArticles.remote';

export const load = async () => {
	const articles = await findArticles();

	return { articles };
};
