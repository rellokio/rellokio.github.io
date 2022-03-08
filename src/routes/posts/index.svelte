<script lang="ts" context="module">
	import type { LoadOutput } from '@sveltejs/kit/types/private';

	const allPosts = import.meta.glob('./*.{md,svx}');

	let body = [];
	for (let path in allPosts) {
		body.push(
			allPosts[path]().then(({ metadata }) => {
				return { path, metadata };
			})
		);
	}

	export async function load(): Promise<LoadOutput> {
		const posts = await Promise.all(body);

		return {
			props: {
				posts
			}
		};
	}
</script>

<script lang="ts">
	import type { Post } from '../../types';

	export let posts: Post[];

	const pathCorrectedPosts = posts.slice().map((post) => {
		post.path = post.path?.replace('.md', '').replace('.svx', '');

		return post;
	});

	const dateSortedPosts = pathCorrectedPosts.slice().sort((post1, post2) => {
		return new Date(post2.metadata.date).valueOf() - new Date(post1.metadata.date).valueOf();
	});
</script>

<svelte:head>
	<title>Posts</title>
</svelte:head>

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

<style lang="postcss">
	ul {
		@apply my-8;
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
