<script lang="ts">
	import Link from './link.svelte';
</script>

<nav aria-roledescription="Main Navigation">
	<a href="/" class="logo">Blog</a>

	<ul class="nav-list">
		<li><Link href="/">Home</Link></li>
		<li><Link href="/posts">Posts</Link></li>
	</ul>
</nav>

<style lang="postcss">
	nav {
		@apply flex justify-between items-center;
	}

	.nav-list {
		@apply flex items-center;
	}
</style>
