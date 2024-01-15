export type Generation = {
	id: number;
	name: string;
	games: string[];
	main_region: { [lang: string]: string };
	pokemon_species?: string[];
};

export const generations: Generation[] = [
	{
		id: 1,
		name: 'Generation I',
		games: ['Red', 'Blue', 'Yellow'],
		main_region: {
			en: 'Kanto',
			ja: 'カントー',
			it: 'Kanto',
			es: 'Kanto',
			de: 'Kanto',
			fr: 'Kanto',
			ko: '관동'
		}
	},
	{
		id: 2,
		name: 'Generation II',
		games: ['Gold', 'Silver', 'Crystal'],
		main_region: {
			en: 'Johto',
			ja: 'ジョウト',
			it: 'Johto',
			es: 'Johto',
			de: 'Johto',
			fr: 'Johto',
			ko: '성도'
		}
	},
	{
		id: 3,
		name: 'Generation III',
		games: ['Ruby', 'Sapphire', 'Emerald'],
		main_region: {
			en: 'Hoenn',
			ja: 'ホウエン',
			it: 'Hoenn',
			es: 'Hoenn',
			de: 'Hoenn',
			fr: 'Hoenn',
			ko: '호연'
		}
	},
	{
		id: 4,
		name: 'Generation IV',
		games: ['Diamond', 'Pearl', 'Platinum'],
		main_region: {
			en: 'Sinnoh',
			ja: 'シンオウ',
			it: 'Sinnoh',
			es: 'Sinnoh',
			de: 'Sinnoh',
			fr: 'Sinnoh',
			ko: '신오'
		}
	},
	{
		id: 5,
		name: 'Generation V',
		games: ['Black', 'White', 'Black 2', 'White 2'],
		main_region: {
			en: 'Unova',
			ja: 'イッシュ',
			it: 'Unima',
			es: 'Teselia',
			de: 'Einall',
			fr: 'Unys',
			ko: '하나'
		}
	},
	{
		id: 6,
		name: 'Generation VI',
		games: ['X', 'Y', 'Omega Ruby', 'Alpha Sapphire'],
		main_region: {
			en: 'Kalos',
			ja: 'カロス',
			it: 'Kalos',
			es: 'Kalos',
			de: 'Kalos',
			fr: 'Kalos',
			ko: '칼로스'
		}
	},
	{
		id: 7,
		name: 'Generation VII',
		games: ['Sun', 'Moon', 'Ultra Sun', 'Ultra Moon'],
		main_region: {
			en: 'Alola',
			ja: 'アローラ',
			it: 'Alola',
			es: 'Alola',
			de: 'Alola',
			fr: 'Alola',
			ko: '알로라'
		}
	},
	{
		id: 8,
		name: 'Generation VIII',
		games: ['Sword', 'Shield'],
		main_region: {
			en: 'Galar',
			ja: 'ガラル',
			it: 'Galar',
			es: 'Galar',
			de: 'Galar',
			fr: 'Galar',
			ko: '가라르'
		}
	},
	{
		id: 9,
		name: 'Generation IX',
		games: ['Scarlet', 'Violet'],
		main_region: {
			en: 'Paldea',
			ja: 'パルデア',
			it: 'Paldea',
			es: 'Paldea',
			de: 'Paldea',
			fr: 'Paldea',
			ko: '팔데아'
		}
	}
];
