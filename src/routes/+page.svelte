<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">

    <img class="pixelated w-[50%] select-none" src={"/images/pikathink.gif"} alt="Relaxo" height="100%" width="100%" />

		<h2
			class="select-none h1 bg-tertiary-800-100-token bg-clip-text text-transparent "
		>
			We are currently in maintenance!
		</h2>
    <h3 class="select-none h3 text-surface-800-100-token bg-clip-text text-transparent ">
      Try again later!
    </h3>
	</div>
</div>

<style>
	.pixelated {
		image-rendering: pixelated;
	}
</style>
