import type { PageLoad } from './$types';
import { generations } from './generations';
import { langs } from './langs';

export type IndexMonster = {
	color: {
		name: string;
		url: string;
	};
	evolves_from_species: null;
	generation: string;
	id: number;
	names: {
		[lang: string]: string;
	};
	descriptions: {
		[lang: string]: string;
	};
};

export const load = (async ({ fetch, url }) => {
	let generationMonsters: IndexMonster[] = [];
	const genfromto = {
		1: [1, 151],
		2: [152, 251],
		3: [252, 386],
		4: [387, 493],
		5: [494, 649],
		6: [650, 721],
		7: [722, 809],
		8: [810, 905]
	};
	const genId = url.searchParams.get('gen-id') || '1';
	const from = genfromto[genId][0];
	const to = genfromto[genId][1];
	
	const idsar = Array.from({length: to - from + 1}, (_, i) => i + 1);
	
	
	return {
		ids: idsar
	};
}) satisfies PageLoad;
