<script lang="ts">
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { svgs } from './svgs';

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

	const langoptions: { language: string; display: string }[] = [
		{
			language: 'en',
			display: 'English'
		},
		{
			language: 'de',
			display: 'Deutsch'
		},
		{
			language: 'ja',
			display: '日本語'
		},
		{
			language: 'it',
			display: 'Italiano'
		},
		{
			language: 'es',
			display: 'Español'
		},
		{
			language: 'fr',
			display: 'Français'
		},
		{
			language: 'ko',
			display: '한국어'
		}
	];
</script>

<button class="btn variant-ghost-surface select-none" use:popup={popupCombobox}>
	<span class="justify-center">
		{@html svgs[lang]}
	</span>
</button>
<div class="card text-xl shadow-xl py-1" data-popup="lanbox">
	<ListBox rounded="rounded-none" class="select-none">
		{#each langoptions as l}
			<ListBoxItem
				bind:group={lang}
				name="medium"
				value={l['language']}
				on:click={() => updateSearchParams('lang', l['language'])}>{l['display']}</ListBoxItem
			>
		{/each}
	</ListBox>
</div>
