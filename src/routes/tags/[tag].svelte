<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/private';

	const allPosts = import.meta.glob('../posts/*.{md,svx}');

	let body = [];
	for (let path in allPosts) {
		body.push(
			allPosts[path]().then(({ metadata }) => {
				return { path, metadata };
			})
		);
	}

	export async function load({ params }: LoadInput): Promise<LoadOutput> {
		const posts = await Promise.all(body);
		const tag = params.tag;

		const filteredPosts = posts.filter((post) => {
			return post.metadata.tags.includes(tag);
		});

		const pathCorrectedPosts = filteredPosts.slice().map((post) => {
			post.path = post.path?.replace('./tags', '/').replace('.md', '').replace('.svx', '');

			return post;
		});

		const dateSortedPosts = pathCorrectedPosts.slice().sort((post1, post2) => {
			return new Date(post2.metadata.date).valueOf() - new Date(post1.metadata.date).valueOf();
		});

		return {
			props: {
				dateSortedPosts,
				tag
			}
		};
	}
</script>

<script lang="ts">
	import type { Post } from '../../types';

	export let dateSortedPosts: Post[];
	export let tag: string;
</script>

<svelte:head>
	<title>Tags | #{tag}</title>
</svelte:head>

<div class="wrapper">
	<h1>#{tag}</h1>

	<ul>
		{#each dateSortedPosts as { path, metadata: { title, tags, date } }}
			<li>
				<h2><a href="/posts/{path}">{title}</a></h2>

				<p class="date">{new Date(date).toDateString()}</p>

				<p class="tags">
					{#each tags as tag}
						<a class="tag" href="/tags/{tag}">#{tag}</a>
					{/each}
				</p>
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	.wrapper {
		@apply my-8;
	}

	h1 {
		@apply text-6xl mb-4 text-black;
	}

	li {
		@apply my-4;
	}

	h2 {
		@apply text-4xl text-black;
	}

	.date {
		@apply text-gray-600;
	}

	.tag {
		@apply text-cerulean-400;
	}
</style>
