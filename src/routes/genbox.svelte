<script lang="ts">
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { generations } from './generations';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { langs } from './langs';

  const updateSearchParams = (key: string, value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);
		goto(`?${searchParams.toString()}`);
	};

	$: lang = $page.url.searchParams.get('lang') || 'en';
	$: generation = $page.url.searchParams.get('gen-id') || '0';
	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'genbox',
		closeQuery: '.listbox-item',
    placement: 'bottom'
	};
</script>

<button class="btn variant-filled select-none " use:popup={popupCombobox}>
	<span class="">{generations.find((gen) => gen.id.toString() == generation)?.main_region[lang] || langs[lang]["region"]}</span>
</button>
<div class="card text-xl shadow-xl select-none" data-popup="genbox">
	<ListBox rounded="rounded-lg">
		{#each generations as gen (gen.id)}
			<ListBoxItem
				active="variant-ringed-tertiary  text-black dark:text-white"
				bind:group={generation}
				name="medium"
				aria-label="select {gen.main_region[lang]} as region"
				value={gen.id.toString()}
				on:click={() => updateSearchParams('gen-id', gen.id.toString())}
				>{gen.main_region[lang]}</ListBoxItem
			>
		{/each}
	</ListBox>
</div>
