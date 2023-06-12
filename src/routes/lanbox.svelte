<script lang="ts">
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import At from './at.svelte';
	import En from './en.svelte';

	const updateSearchParams = (key: string, value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);
		goto(`?${searchParams.toString()}`);
	};

	$: lang = $page.url.searchParams.get('lang') || 'en';
	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'lanbox',
		closeQuery: '.listbox-item',
		placement: 'bottom'
	};
</script>

<button class="btn variant-ringed-surface select-none" use:popup={popupCombobox}>
	<span class="justify-center">
		{#if lang == 'de'}
			<At />
		{:else}
			<En />
		{/if}
	</span>
</button>
<div class="card text-xl shadow-xl py-1" data-popup="lanbox">
	<ListBox rounded="rounded-none" class="select-none">
		<ListBoxItem
		class="rounded-lg {('en' == lang) ? 'variant-ringed-surface text-black dark:text-white' : ''}"
			bind:group={lang}
			name="medium"
			value={'en'}
			on:click={() => updateSearchParams('lang', 'en')}>English</ListBoxItem
		>
		<ListBoxItem
		class="rounded-lg {('de' == lang) ? 'variant-ringed-surface text-black dark:text-white' : ''}"
			bind:group={lang}
			name="medium"
			value={'de'}
			on:click={() => updateSearchParams('lang', 'de')}>Deutsch</ListBoxItem
		>
	</ListBox>
</div>
