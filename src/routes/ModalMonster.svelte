<script lang="ts">
	import type { IndexMonster } from './+page';
	import { page } from '$app/stores';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { List } from 'postcss/lib/list';

	const monster: IndexMonster = $modalStore[0].meta?.mon;
	$: descr = '';

	const lang: string = $modalStore[0].meta?.lan;

	async function getDescription() {
		const monsterResponse = await fetch(`${monster.url}`);

		const monsterJson = await monsterResponse.json();
		console.log(monsterJson);
		const flavorTexts = monsterJson.flavor_text_entries;
		//const engFlavorText: string = flavorTexts.find(
		//	(element) => element.language.name === 'en'
		//).flavor_text;
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

<div class="card card-hover m-1 cursor-pointer select-none">
	<div class="relative left-3 top-3 text-4xl text-surface-300-600-token">
		#{monster.id}
	</div>
	<div class="pixelated mx-3 w-96 h-96 justify-center">
		<!--on:load={() => {console.log(loaded); loaded = true;}}-->
		<img src={monster.image} alt={monster.name} height="100%" width="100%" />
		<!--{#if !loaded }-->
		<!--	<div class="card animate-pulse variant-soft h-24 w-24" />-->
		<!--{/if}-->
	</div>
	<div class="p-2 break-words w-96 text-2xl mx-2 mb-4 text-center text-surface-800-100-token">
		{descr}
	</div>
</div>

<style>
	.pixelated {
		image-rendering: pixelated;
	}
</style>
