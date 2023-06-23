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
	class="card card-hover w-auto sm:m-1 m-0.5 cursor-pointer select-none"
	on:click={() => monClick(id)}
	use:inview={options}
	on:inview_enter={(event) => {
		const { inView, entry, scrollDirection, observer, node} = event.detail;
		isInView = inView;
		loadData();
	}}
>
	{#if !mon}
		<div class="relative top-1 left-2 text-surface-300-600-token">#{id}</div>
		<div class="justify-center mx-1 w-20 h-20 sm:mx-3 sm:w-24 sm:h-24">
			<div class="card animate-pulse variant-soft h-20 w-20 sm:h-24 sm:w-24" />
		</div>
		<div class=" mx-1 mb-1 text-xs text-center text-surface-800-100-token sm:mx-2 sm:mb-4">
			{langs[language].loading}
		</div>
	{:else}
		<div class="relative top-1 left-2 text-surface-300-600-token">
			#{id}
		</div>
		<div class="justify-center mx-1 w-20 h-20 sm:mx-3 sm:w-24 sm:h-24">
			<img
				class="h-20 w-20 sm:h-24 sm:w-24"
				src="images/pokemon/{mon.id}.png"
				alt={mon.names[language]}
			/>
		</div>
		<div class=" mx-1 mb-1 text-xs text-center text-surface-800-100-token sm:mx-2 sm:mb-4">
			{mon.names[language]}
		</div>
	{/if}
</div>
