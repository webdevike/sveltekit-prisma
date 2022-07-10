<script context="module" lang="ts">
	import { authGuard } from '$lib/guards';
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

	export async function load({ url, fetch }: LoadEvent): Promise<LoadOutput> {
		const res = await fetch('/api/product');
    // console.log("🚀 ~ file: index.svelte ~ line 7 ~ load ~ res", res)
		// await authGuard({ url });
		const products = await res.json();

		return {
			status: res.status,
			props: {
				products: res.ok && products.allProducts
			}
		};
	}
</script>

<script lang="ts">
	import type { Product } from '@prisma/client';
	// import { get } from '$lib/api';

	export let products: Product[] = [];
</script>

<ul>
	{#each products as product}
		<img class="product-image" src={product.image} alt={product.name} />
	{/each}
</ul>

<style>
	.product-image {
		max-width: 1200px;
		width: 100%;
	}
</style>
