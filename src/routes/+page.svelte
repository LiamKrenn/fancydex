<script lang="ts">
	import {
		AppShell,
		AppBar,
		LightSwitch,
		type ModalSettings,
		getModalStore
	} from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import Monster from './Monster.svelte';
	import { page } from '$app/stores';
	import ModalMonster from './ModalMonster.svelte';

	import Genbox from './genbox.svelte';
	import Lanbox from './lanbox.svelte';

	import { langs } from './langs';

	const modalStore = getModalStore();

	$: lang = $page.url.searchParams.get('lang') || 'en';
	$: genId = $page.url.searchParams.get('gen-id') || '0';

	$: searchString = '';

	const genfromto = {
		0: [0, 0],
		1: [1, 151],
		2: [152, 251],
		3: [252, 386],
		4: [387, 493],
		5: [494, 649],
		6: [650, 721],
		7: [722, 809],
		8: [810, 905],
		9: [906, 1025]
	};

	$: from = genfromto[genId][0];
	$: to = genfromto[genId][1];
	$: count = to - from + 1;
	$: ids = Array.from({ length: count }, (_, i) => i + from);

	//$: filteredMonsters = allmons
	//	.filter((monster) => {
	//		if (monster == null) {return true;}
	//		return monster.names[lang].toLowerCase().includes(searchString.toLowerCase());
	//	})
	//.sort((ma, mb) => (ma.id > mb.id ? 1 : -1));

	const monClick = (cid: number) => {
		const modal: ModalSettings = {
			type: 'component',
			meta: { id: cid, lan: lang, genid: genId },
			component: { ref: ModalMonster }
		};
		modalStore.trigger(modal);
	};
</script>

<title>Fancydex</title>
<svelte:head>
	<meta name="description" property="description" content="Fancydex" />
</svelte:head>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar padding="p-0">
			<div class="flex p-4 items-center w-[100vw]">
				<a
					class="hidden sm:block sm:text-2xl sm:font-thin sm:cursor-pointer sm:select-none sm:align-middle"
					href="/?lang={lang}"
					on:click={() => {
						genId = '0';
					}}>Fancydex</a
				>
				<Genbox />
				<input
					class="input w-full select-none align-middle ml-2 mr-2 focus:border-tertiary-500"
					type="text"
					placeholder={langs[lang]['search']}
					bind:value={searchString}
				/>
				<Lanbox />
				<LightSwitch class="align-middle ml-3 sm:mr-3 -mr-1 w-12 min-w-12 shrink-0" />
				<a
					class="hidden sm:block select-none align-middle"
					href="https://github.com/LiamKrenn"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</div>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	{#if genId != '0'}
		<div class="px-1 flex w-full flex-wrap flex-row justify-center m-1 pixelated">
			{#each ids as id (id)}
				<Monster
					{id}
					{searchString}
					on:click={() => {
						monClick(id);
					}}
				/>
			{/each}
		</div>
	{:else}
		<div class="h-full mx-auto flex justify-center items-center">
			<div class="space-y-10 text-center flex flex-col items-center">
				<h2
					class="select-none p-2 h1 bg-gradient-to-br from-primary-600 to-tertiary-600 bg-clip-text text-transparent box-decoration-clone"
				>
					{langs[lang]['welcome']}
				</h2>
				<p class="animate-pulse select-none text-xl text-surface-800-100-token">
					{langs[lang]['region_hint']}
				</p>
			</div>
		</div>
	{/if}
</AppShell>

<style>
	.pixelated {
		image-rendering: pixelated;
	}
</style>
