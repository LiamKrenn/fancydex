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
<div class="card card-hover  {((screenSize > 600) ? 'w-auto m-1':'w-20 m-0.5')} cursor-pointer select-none" on:click={() => monClick(monster)}>
	<div class="relative top-1 left-2 text-surface-300-600-token">
		#{monster.id}
	</div>
	<div class="{((screenSize > 600) ? 'mx-3 w-24 h-24':'mx-1 h-20')} justify-center">
		<!--on:load={() => {console.log(loaded); loaded = true;}}-->
		<img src={monster.image} alt={monster.name} />
		<!--Loading Animation, bugs when refresh-->
		<!--{#if !loaded }-->
		<!--	<div class="card animate-pulse variant-soft h-24 w-24" />-->
		<!--{/if}-->
	</div>
	<div class="{((screenSize > 600) ? 'mx-2 mb-4':'mx-1 mb-1 text-sm')}  text-center text-surface-800-100-token">
		{name}
	</div>
</div>
