<script>
	import '../app.css';

	import Nav from '$lib/components/nav.svelte';
</script>

<div class="wrapper">
	<Nav />

	<slot />
</div>

<style lang="postcss">
	:global(body) {
		@apply text-blackolive bg-whitesmoke;
	}

	.wrapper {
		@apply mx-auto w-full max-w-screen-lg;
	}
</style>
