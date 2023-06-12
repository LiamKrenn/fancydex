<script lang="ts">
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { generations } from './generations';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

  const updateSearchParams = (key: string, value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);
		goto(`?${searchParams.toString()}`);
	};

	$: generation = $page.url.searchParams.get('gen-id') || '0';
	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'genbox',
		closeQuery: '.listbox-item',
    placement: 'bottom'
	};
</script>

<button class="btn variant-ghost-tertiary select-none " use:popup={popupCombobox}>
	<span class="">{generations.find((gen) => gen.id.toString() == generation)?.main_region || 'Region'}</span>
</button>
<div class="card text-xl shadow-xl py-1 select-none" data-popup="genbox">
	<ListBox rounded="rounded-none">
		{#each generations as gen (gen.id)}
			<ListBoxItem
				class="rounded-lg {(gen.id.toString() == generation) ? 'variant-ringed-tertiary text-black dark:text-white' : ''}"
				bind:group={generation}
				name="medium"
				value={gen.id.toString()}
				on:click={() => updateSearchParams('gen-id', gen.id.toString())}
				>{gen.main_region}</ListBoxItem
			>
		{/each}
	</ListBox>
</div>
