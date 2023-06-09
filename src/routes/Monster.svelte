<script lang="ts">
	import type { IndexMonster } from './+page';
	import { page } from '$app/stores';

	export let monster: IndexMonster;
	export let updateSearchParams: (key: string, value: string) => void;
	export let isInteractive: boolean = false;
	let loaded = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="card card-hover m-1 cursor-pointer select-none">
	<div on:click={() => (isInteractive ? updateSearchParams('id', monster.id) : () => {})}>
		<div class="relative top-1 left-2 text-surface-300-600-token">
			#{monster.id}
		</div>
		<div class="mx-3 justify-center">
			<img
				on:load={() => {
					loaded = true;
				}}
				src={monster.image}
				alt={monster.name}
			/>
			{#if !loaded }
				<div class="card animate-pulse variant-soft h-24 w-24" />
			{/if}
		</div>
		<div class="mx-2 mb-4 text-center text-surface-800-100-token">
			{monster.name}
		</div>
	</div>
</div>
