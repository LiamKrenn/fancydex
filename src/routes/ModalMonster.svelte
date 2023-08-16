<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import { langs } from './langs';

	const id: number = $modalStore[0].meta?.id;

	const lang: string = $modalStore[0].meta?.lan;
	const genId: number = $modalStore[0].meta?.genid;

	$: mon = null;

	async function loadData() {
		const res = await fetch('/data/pokemon/' + genId + '-' + id + '.json');
		const json = await res.json();
		json.id = id;
		mon = json;
	}

	loadData();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="card m-1 cursor-default sm:w-[25rem] w-9/12">
	<div
		class="relative w-32 text-surface-300-600-token
		sm:text-4xl sm:left-3 sm:top-3
		xs:text-3xl left-2 top-2
		text-xl"
	>
		#{id}
	</div>
	<img
		class="pixelated justify-center sm:w-96 sm:h-96 sm:mx-2 w-[90%] h-[90%] mx-[5%]"
		src="images/pokemon/{id}.png"
		alt={mon ? mon.names[lang] : 'unloaded pokemon'}
		loading="eager"
	/>
	<h1
		class="
		h1 p-4 break-words text-center text-surface-800-100-token
		sm:text-5xl
		xs:text-3xl
		text-2xl"
	>
		{#if !mon}
			{langs[lang].loading}
		{:else}
			{mon.names[lang]}
		{/if}
	</h1>
	<div
		class="
		break-words text-center text-surface-800-100-token pb-2
		sm:text-2xl
		xs:text-base xs:px-2
		text-sm px-1"
	>
		{#if !mon}
			{langs[lang].loading}
		{:else}
			{mon.descriptions[lang]}
		{/if}
	</div>
</div>

<style>
	.pixelated {
		image-rendering: pixelated;
	}
</style>
