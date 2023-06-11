<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		LightSwitch,
		RadioGroup,
		RadioItem,
		type ModalSettings,
		modalStore,
		Modal
	} from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import Monster from './Monster.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import type { IndexMonster } from './+page';
	import { goto } from '$app/navigation';
	import ModalMonster from './ModalMonster.svelte';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import Genbox from './genbox.svelte';
	import Lanbox from './lanbox.svelte';
	inject({ mode: dev ? 'development' : 'production' });

	export let data: PageData;

	$: screenSize = 0;
	$: tmp2 = console.log(screenSize);

	$: lang = $page.url.searchParams.get('lang') || 'en';
	$: genId = $page.url.searchParams.get('gen-id') || '0';

	$: searchString = '';
	$: filteredMonsters = data.monsters
		.filter((monster) => {
			return monster.name.toLowerCase().includes(searchString.toLowerCase());
		})
		.sort((ma, mb) => (ma.id > mb.id ? 1 : -1));

	const updateSearchParams = (key: string, value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);
		goto(`?${searchParams.toString()}`);
	};

	const monClick = (m: IndexMonster) => {
		const modal: ModalSettings = {
			type: 'component',
			meta: { mon: m, lan: lang },
			component: { ref: ModalMonster }
		};
		modalStore.trigger(modal);
	};
</script>

<svelte:window bind:innerWidth={screenSize} />

<Modal />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				{#if screenSize > 600}
					<a
						class="text-2xl font-thin cursor-pointer select-none align-middle"
						href="/"
						on:click={() => {
							genId = '0';
						}}>Fancydex</a
					>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="default">
				<div class="flex w-full {screenSize < 600 ? '-ml-5' : '-ml-2'}">
					<!--<RadioGroup-->
					<!--	class="align-middle select-none"-->
					<!--	active="variant-filled-primary"-->
					<!--	hover="hover:variant-soft-primary"-->
					<!-->-->
					<!--	{#each generations as gen (gen.id)}-->
					<!--		<RadioItem-->
					<!--			bind:group={genId}-->
					<!--			name="justify"-->
					<!--			value={gen.id.toString()}-->
					<!--			on:click={() => updateSearchParams('gen-id', gen.id.toString())}-->
					<!--		>-->
					<!--			{gen.main_region}-->
					<!--		</RadioItem>-->
					<!--	{/each}-->
					<!--</RadioGroup>-->
					<Genbox />
					<input
						class="input w-full select-none align-middle ml-2 mr-2"
						type="text"
						placeholder={lang != 'de' ? 'Search ' : 'Suche '}
						bind:value={searchString}
					/>
					<!--<RadioGroup-->
					<!--	class="align-middle select-none ml-2"-->
					<!--	active="variant-filled-primary"-->
					<!--	hover="hover:variant-soft-primary"-->
					<!-->-->
					<!--	<RadioItem-->
					<!--		bind:group={lang}-->
					<!--		name="justify"-->
					<!--		value={'en'}-->
					<!--		on:click={() => updateSearchParams('lang', 'en')}-->
					<!--	>-->
					<!--		<En />-->
					<!--	</RadioItem>-->
					<!--	<RadioItem-->
					<!--		bind:group={lang}-->
					<!--		name="justify"-->
					<!--		value={'de'}-->
					<!--		on:click={() => updateSearchParams('lang', 'de')}-->
					<!--	>-->
					<!--		<At />-->
					<!--	</RadioItem>-->
					<!--</RadioGroup>-->
					<Lanbox />
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch class="align-middle {screenSize < 600 ? '-ml-6' : '-ml-3'}" />
				{#if screenSize > 600}
					<a
						class="select-none align-middle"
						href="https://github.com/LiamKrenn"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	{#if genId != '0'}
		<div class="px-1 flex w-full flex-wrap flex-row justify-center m-1">
			{#each filteredMonsters as monster (monster.id)}
				<Monster {monster} {monClick} />
			{/each}
		</div>
	{:else}
		<div class="container h-full mx-auto flex justify-center items-center">
			<div class="space-y-10 text-center flex flex-col items-center">
				<h2
					class="select-none p-2 h1 bg-gradient-to-br from-primary-600 to-tertiary-600 bg-clip-text text-transparent box-decoration-clone"
				>
					{#if lang == 'de'}
						Willkommen bei Fancydex!
					{:else}
						Welcome to Fancydex!
					{/if}
				</h2>
				<p class="animate-pulse select-none text-xl text-surface-800-100-token">
					{#if lang == 'de'}
						Wähle eine Region links oben aus, um zu beginnen!
					{:else}
						Start of by choosing a region on the top left!
					{/if}
				</p>
			</div>
		</div>
	{/if}
</AppShell>
