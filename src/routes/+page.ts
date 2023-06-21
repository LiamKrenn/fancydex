import type { PageLoad } from './$types';
import { generations } from './generations';

type ApiMonster = {
	name: string;
	url: string;
};

export type IndexMonster = ApiMonster & {
	id: number;
	image: string;
};

export const load = (async ({ fetch, url }) => {
	const generationId = url.searchParams.get('gen-id') || '1';
	const generationResponse = await fetch(generationId + "/");
	const generationJson = await generationResponse.json();

	const generationMonsters: IndexMonster[] = generationJson.pokemon_species.map(
		(monster: ApiMonster) => {
			const splitUrl = monster.url.split('/');
			const id = parseInt(splitUrl[splitUrl.length - 2], 10);

			return {
				name: monster.name,
				url: monster.url,
				id,
				image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
			};
		}
	);

	return {
		monsters: generationMonsters
	};
}) satisfies PageLoad;
