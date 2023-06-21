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
	import { generations } from './generations';
	inject({ mode: dev ? 'development' : 'production' });
	
	import { langs } from './langs';


	

	$: lang = $page.url.searchParams.get('lang') || 'en';
	$: genId = $page.url.searchParams.get('gen-id') || '0';

	$: searchString = '';	
	
	export let data: PageData;
	$: ids = data.ids


	//$: filteredMonsters = allmons
	//	.filter((monster) => {
	//		if (monster == null) {return true;}
	//		return monster.names[lang].toLowerCase().includes(searchString.toLowerCase());
	//	})
		//.sort((ma, mb) => (ma.id > mb.id ? 1 : -1));

	const monClick = (m: number) => {
		const modal: ModalSettings = {
			type: 'component',
			meta: { mon: m, lan: lang },
			component: { ref: ModalMonster }
		};
		modalStore.trigger(modal);
	};
</script>

<meta name=Description content="Fancydex"/>

<Modal />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a
					class="hidden sm:block sm:text-2xl sm:font-thin sm:cursor-pointer sm:select-none sm:align-middle"
					href="/?lang={lang}"
					on:click={() => {
						genId = '0';
					}}>Fancydex</a
				>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<div class="flex w-full -ml-5 sm:-ml-2">
					<Genbox />
					<input
						class="input w-full select-none align-middle ml-2 mr-2 focus:border-tertiary-500"
						type="text"
						placeholder={langs[lang]["search"]}
						bind:value={searchString}
					/>
					<Lanbox />
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch class="align-middle -ml-6 sm:-ml-3" />
				<a
					class="hidden sm:block select-none align-middle"
					href="https://github.com/LiamKrenn"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	{#if genId != '0'}
		<div class="px-1 flex w-full flex-wrap flex-row justify-center m-1">
			{#each data.ids as id (id)}
				<Monster {id} {monClick} />
			{/each}
		</div>
	{:else}
		<div class="container h-full mx-auto flex justify-center items-center">
			<div class="space-y-10 text-center flex flex-col items-center">
				<h2
					class="select-none p-2 h1 bg-gradient-to-br from-primary-600 to-tertiary-600 bg-clip-text text-transparent box-decoration-clone"
				>
					{langs[lang]["welcome"]}

				</h2>
				<p class="animate-pulse select-none text-xl text-surface-800-100-token">
					{langs[lang]["region_hint"]}
				</p>
			</div>
		</div>
	{/if}
</AppShell>