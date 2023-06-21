<script lang="ts">
	import type { IndexMonster } from './+page';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { langs } from './langs';
	import { page } from '$app/stores';

	const id: number = $modalStore[0].meta?.id;
	
	const lang: string = $modalStore[0].meta?.lan;
	const genId = $page.url.searchParams.get('gen-id') || '0';

	async function loadData() {
		const res = await fetch('/data/pokemon/' + genId + '-' + id + '.json');
		const json = await res.json();
		json.id = id;
		return json;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="card m-1 cursor-pointer sm:w-96 w-3/5">
	<div class="relative sm:text-4xl sm:left-3 sm:top-3 text-xl left-2 top-2 text-surface-300-600-token">
		#{id}
	</div>
	{#await loadData()}
	<div class="sm:mx-3 mx-1 justify-center "/>
	<h1 class="h1 p-2 break-words sm:text-5xl sm:mx-2 sm:mb-4 text-2xl mx-1 text-center text-surface-800-100-token">
		{langs[lang].loading}
	</h1>
	<div class="p-2 break-words sm:text-2xl sm:mx-2 sm:mb-4 mx-1 mb-2  text-center text-surface-800-100-token">
		{langs[lang].loading}
	</div>
	{:then monster}
	<div class="pixelated  sm:mx-3 mx-1 justify-center " >
		<img src="images/pokemon/{id}.png"  alt={monster.names[lang]} height="100%" width="100%" loading="eager" />

	</div>
	<h1 class="h1 p-2 break-words sm:text-5xl sm:mx-2 sm:mb-4 text-2xl mx-1 text-center text-surface-800-100-token">
		{monster.names[lang]}
	</h1>
	<div class="p-2 break-words sm:text-2xl sm:mx-2 sm:mb-4 mx-1 mb-2  text-center text-surface-800-100-token">
		{monster.descriptions[lang]}
	</div>
	{/await}
	
</div>

<style>
	.pixelated {
		image-rendering: pixelated;
	}
</style>