<script lang="ts">
	import { page } from '$app/stores';
	import { langs } from './langs';

	export let id: number;
	export let monClick: (m: number) => void;
	import { inview } from 'svelte-inview';

	let isInView: boolean;
	const options = {};

	$: language = $page.url.searchParams.get('lang') || 'en';
	$: genId = $page.url.searchParams.get('gen-id') || '0';

	async function loadData() {
		const res = await fetch('/data/pokemon/' + genId + '-' + id + '.json');
		const json = await res.json();
		json.id = id;
		mon = json;
	}

	$: mon = null;

	// langs[language].loading;
	//async function getName(l: string) {
	//	const monsterResponse = await fetch(`${monster.url}`);
	//	const monsterJson = await monsterResponse.json();
	//	const names = await monsterJson.names;
	//	name = await names.find((name) => name.language.name == l).name;
	//	monster.name = name;
	//}
	//name = monster.names.en

	//$: tmp = getName(language);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div
	class="card card-hover cursor-pointer select-none
				 sm:m-1 sm:w-40 sm:h-[13rem]
				 m-0.5 w-24 h-[7.7rem]"
	on:click={() => monClick(id)}
	use:inview={options}
	on:inview_enter={(event) => {
		const { inView, entry, scrollDirection, observer, node } = event.detail;
		isInView = inView;
		if (mon == null) {
			loadData();
		}
	}}
>
	<div class="relative top-1 left-2 text-surface-300-600-token w-16 sm:text-xl text-sm">
		#{id}
	</div>
	<div
		class="justify-center
					 sm:mx-2 sm:w-36 sm:h-36
					 mx-2 w-20 h-20"
	>
		{#if !mon}
			<div
				class="card animate-pulse variant-soft
							 sm:h-36 sm:w-36
							 h-20 w-20"
			/>
		{:else}
			<img
				class="sm:h-36 sm:w-36 pixelated
								h-20 w-20"
				src="images/pokemon/{mon.id}.png"
				alt={mon.names[language]}
			/>
		{/if}
	</div>
	<div
		class="text-center text-surface-800-100-token
					 sm:mx-2 sm:w-36 sm:text-lg
					 mx-2 text-xs w-20"
	>
		{#if !mon}
			{langs[language].loading}
		{:else}
			{mon.names[language]}
		{/if}
	</div>
</div>

<style>
	.pixelated {
		image-rendering: pixelated;
	}
</style>