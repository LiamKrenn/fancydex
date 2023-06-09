<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { IndexMonster } from './+page';

	const monster: IndexMonster = $modalStore[0].meta?.mon;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="card m-1 cursor-pointer select-none">
	<div>
		<div class="relative top-2 left-2 text-surface-300-600-token">
			#{monster.id}
		</div>
		<div class="mx-3 justify-center">
			<img src={monster.image} alt={monster.name} />
		</div>
		<div class="mx-2 mb-4 text-center text-surface-50-850">
			{monster.name}
		</div>
	</div>
</div>
