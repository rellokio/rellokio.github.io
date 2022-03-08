<script lang="ts">
	import { page } from '$app/stores';

	const splitHref = $$props.href.split('/');

	$: splitUrl = $page.url.pathname.split('/');
	$: isActive = splitUrl === splitHref || splitUrl[1] === splitHref[1];
</script>

<a {...$$props} class:active={isActive}>
	<span><slot /></span>
</a>

<style lang="postcss">
	a {
		@apply py-6 inline-block;
	}

	a span {
		@apply px-4 py-2;
	}

	a.active span {
		@apply border-b border-black;
	}
</style>
