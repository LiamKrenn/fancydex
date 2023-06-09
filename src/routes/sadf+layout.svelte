<script lang="ts">
	import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-2xl font-thin">Cleandex</strong>
			</svelte:fragment>
			<svelte:fragment slot="default">
					<input class="input w-1/4" type="text" placeholder="Search" />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch/>
				<a
					class="btn btn-sm variant-ghost-surface"
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
</AppShell>
