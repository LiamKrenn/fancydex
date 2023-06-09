<script lang="ts">
	import type { IndexMonster } from './+page';
	import { page } from '$app/stores';

	export let monster: IndexMonster;
	export let monClick: (m: IndexMonster) => void;
	//$: language = $page.url.searchParams.get('lang') || 'en';

	//async function getName(l: string) {
	//	const monsterResponse = await fetch(`${monster.url}`);
	//	const monsterJson = await monsterResponse.json();
	//	const names = monsterJson.names;
	//	return names.find((name) => name.language.name == l).name;
	//}

	//$: langName = getName(language);

	//export let loaded: boolean;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="card card-hover m-1 cursor-pointer select-none" on:click={() => monClick(monster)}>
	<div class="relative top-1 left-2 text-surface-300-600-token">
		#{monster.id}
	</div>
	<div class="mx-3 w-24 h-24 justify-center">
		<!--on:load={() => {console.log(loaded); loaded = true;}}-->
		<img src={monster.image} alt={monster.name} />
		<!--{#if !loaded }-->
		<!--	<div class="card animate-pulse variant-soft h-24 w-24" />-->
		<!--{/if}-->
	</div>
	<div class="mx-2 mb-4 text-center text-surface-800-100-token">
		{monster.name}
	</div>
</div>
