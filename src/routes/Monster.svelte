<script lang="ts">
	import { page } from '$app/stores';
	import { langs } from './langs';
	import { inview } from 'svelte-inview';

	export let id: number;
	export let searchString: string;

	$: language = $page.url.searchParams.get('lang') || 'en';
	$: genId = $page.url.searchParams.get('gen-id') || '0';

	async function loadData() {
		if (id == undefined) return;
		const res = await fetch('/data/pokemon/' + genId + '-' + id + '.json');
		const json = await res.json();
		json.id = id;
		mon = json;
	}

	let mon: string | null = null;
</script>

{#if mon == null || mon['names'][language].toLowerCase().includes(searchString)}
	<button
		tabindex="0"
		class="card card-hover cursor-pointer select-none flex flex-col items-center relative
			 sm:m-1 sm:w-40 sm:h-[13rem]
			 m-0.5 w-24 h-[7.7rem]"
		on:click
		use:inview={{}}
		on:inview_enter={() => {
			if (mon == null) {
				loadData();
			}
		}}
	>
		<div
			class="relative top-0 left-0 text-surface-600-300-token w-full text-left pt-1 pl-2 sm:text-xl text-sm"
		>
			#{id}
		</div>
		{#if !mon}
			<div
				class="card animate-pulse variant-soft
						sm:h-36 sm:w-36
						h-20 w-20"
			/>
		{:else}
			<img
				class="sm:h-36 sm:w-36
						h-20 w-20"
				src="images/pokemon/{mon.id}.png"
				alt={mon.names[language]}
				height="96px"
				width="96px"
			/>
		{/if}
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
	</button>
{/if}
