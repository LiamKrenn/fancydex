<script lang="ts">
	import type { IndexMonster } from './+page';
	import { page } from '$app/stores';

	export let monster: IndexMonster;
	export let monClick: (m: IndexMonster) => void;

	$: language = $page.url.searchParams.get('lang') || 'en';

	$: screenSize = 0;

	$: name = ((language != 'de') ? 'loading...' : 'ladet...');
	async function getName(l: string) {
		const monsterResponse = await fetch(`${monster.url}`);
		const monsterJson = await monsterResponse.json();
		const names = await monsterJson.names;
		name = await names.find((name) => name.language.name == l).name;
		monster.name = name;
	}
	$: tmp = getName(language);
</script>
<svelte:window bind:innerWidth={screenSize} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card card-hover sm:w-auto sm:m-1 w-22 m-0.5 cursor-pointer select-none" on:click={() => monClick(monster)}>
	<div class="relative top-1 left-2 text-surface-300-600-token">
		#{monster.id}
	</div>
	<div class="justify-center mx-1 w-22 h-22 sm:mx-3 sm:w-24 sm:h-24 ">
		<!--on:load={() => {console.log(loaded); loaded = true;}}-->
		<img class="h-22 w-22 sm:h-24 sm:w-24" src="images/pokemon/{monster.id}.png" alt={monster.name} />
		<!--Loading Animation, bugs when refresh-->
		<!--{#if !loaded }-->
		<!--	<div class="card animate-pulse variant-soft h-24 w-24" />-->
		<!--{/if}-->
	</div>
	<div class=" mx-1 mb-1 text-xs text-center text-surface-800-100-token sm:mx-2 sm:mb-4">
		{name}
	</div>
</div>
