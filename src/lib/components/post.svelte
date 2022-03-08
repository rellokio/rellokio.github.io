<script>
	// TODO: Change this to TypeScript once MDsveX is 1.0
	import Giscus from '$lib/giscus/giscus.svelte';

	export let title;
	export let date;
	export let tags;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="wrapper">
	<div class="metadata">
		<h1>{title}</h1>
		<p class="date">{new Date(date).toDateString()}</p>
		<p class="tags">
			{#each tags as tag}
				<a class="tag" href="/tags/{tag}">#{tag}</a>
			{/each}
		</p>
	</div>

	<slot />
</div>

<Giscus
	repo="rellokio/blog"
	repoId="R_kgDOG97Nxw"
	category="Posts"
	categoryId="DIC_kwDOG97Nx84COAgK"
	mapping="title"
	inputPosition="top"
/>

<style lang="postcss">
	.wrapper {
		@apply my-8;
	}

	.metadata {
		@apply mb-4;
	}

	h1 {
		@apply text-4xl text-black;
	}

	.date {
		@apply text-gray-600;
	}

	.tag {
		@apply text-cerulean-400;
	}
</style>
