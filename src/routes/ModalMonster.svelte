<script lang="ts">
	import type { IndexMonster } from './+page';
	import { modalStore } from '@skeletonlabs/skeleton';

	const monster: IndexMonster = $modalStore[0].meta?.mon;
	
	const lang: string = $modalStore[0].meta?.lan;

	$: name = ((lang != 'de') ? 'loading...' : 'ladet...');
	async function getName(l: string) {
		const monsterResponse = await fetch(`${monster.url}`);
		const monsterJson = await monsterResponse.json();
		const names = await monsterJson.names;
		name = await names.find((name) => name.language.name == l).name;
	}
	getName(lang);

	$: descr = ((lang != 'de') ? 'loading...' : 'ladet...');
	async function getDescription() {
		const monsterResponse = await fetch(`${monster.url}`);

		const monsterJson = await monsterResponse.json();
		const flavorTexts = monsterJson.flavor_text_entries;
		const latestEnglishDescription = flavorTexts
			.filter(function (texts) {
				return texts.language.name == lang;
			})
			.at(-1).flavor_text;
		descr = latestEnglishDescription.replace('', ' ').replace('POKéMON', 'Pokémon');
	}
	getDescription();

	//export let loaded: boolean; $modalStore[0].meta?.someKey
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="card m-1 cursor-pointer sm:w-96 w-3/5">
	<div class="relative sm:text-4xl sm:left-3 sm:top-3 text-xl left-2 top-2 text-surface-300-600-token">
		#{monster.id}
	</div>
	<div class="pixelated  sm:mx-3 mx-1 justify-center">
		<!--on:load={() => {console.log(loaded); loaded = true;}}-->
		<img src={monster.image} alt={monster.name} height="100%" width="100%" />
		<!--{#if !loaded }-->
		<!--	<div class="card animate-pulse variant-soft h-24 w-24" />-->
		<!--{/if}-->
	</div>
	<h1 class="h1 p-2 break-words sm:text-5xl sm:mx-2 sm:mb-4 text-2xl mx-1 text-center text-surface-800-100-token">
		{name}
	</h1>
	<div class="p-2 break-words sm:text-2xl sm:mx-2 sm:mb-4 mx-1 mb-2  text-center text-surface-800-100-token">
		{descr}
	</div>
</div>

<style>
	.pixelated {
		image-rendering: pixelated;
	}
</style>