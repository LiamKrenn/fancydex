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
		type ModalComponent,
		type ModalSettings,
		modalStore,
		Modal,
		TabGroup,
		Tab
	} from '@skeletonlabs/skeleton';

	import Monster from './Monster.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import type { IndexMonster } from './+page';
	import { generations } from './generations';
	import { goto } from '$app/navigation';
	import ModalMonster from './ModalMonster.svelte';

	export let data: PageData;

	$: genId = $page.url.searchParams.get('gen-id') || 0;

	$: searchString = '';
	$: filteredMonsters = data.monsters.filter((monster) => {
		return monster.name.toLowerCase().includes(searchString.toLowerCase());
	});

	//$: monsterId = $page.url.searchParams.get('id') || '';
	//$: monster = data.monsters.find((monster) => monster.id === monsterId);

	const updateSearchParams = (key: string, value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);
		goto(`?${searchParams.toString()}`);
	};

	//const modal: ModalSettings = {
	//	type: 'component',
	//	meta: { mon: monster },
	//	component: { ref: ModalMonster }
	//};
	// modalStore.trigger(modal):
</script>

<Modal />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a class="text-2xl font-thin cursor-pointer select-none align-middle" href="/" on:click={() => {genId=0}}>Fancydex</a>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<div class="flex w-full">
					<RadioGroup
						class="align-middle select-none"
						active="variant-filled-primary"
						hover="hover:variant-soft-primary"
					>
						{#each generations as gen (gen.id)}
							<RadioItem
								bind:group={genId}
								name="justify"
								value={gen.id}
								on:click={() => updateSearchParams('gen-id', gen.id.toString())}
							>
								{gen.main_region}
							</RadioItem>
						{/each}
					</RadioGroup>
					<input
						class="input w-full select-none align-middle ml-2"
						type="text"
						placeholder="Search "
						bind:value={searchString}
					/>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch class=" align-middle" />

				<a
					class="select-none align-middle"
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

	{#if genId != 0}
	<div class=" flex flex-wrap flex-row justify-center m-1">
		{#each filteredMonsters as monster (monster.id)}
			<Monster {monster} updateSearchParams={() => {}} isInteractive={true} />
		{/each}
	</div>
	{:else}
	<div class="container h-full mx-auto flex justify-center items-center">
		<div class="space-y-10 text-center flex flex-col items-center">
			<h2 class="select-none p-2 h1 bg-gradient-to-br from-primary-600 to-tertiary-600 bg-clip-text text-transparent box-decoration-clone">Welcome to Fancydex!</h2>
			<p class="animate-pulse select-none text-xl text-surface-800-100-token">Start of by choosing a region on the top left!</p>
		</div>
	</div>
	{/if}
	

	
</AppShell>
