<script lang="ts">
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import '../app.postcss'
</script>

<svelte:head>
	<title>Let me Google that for you</title>
</svelte:head>

<div class="flex h-screen flex-col text-zinc-900 dark:text-zinc-50">
	<Header />

	<div class="grow-[1]" />

	<main class="container mx-auto">
		<slot />
	</main>

	<div class="grow-[2]" />

	<Footer />
</div>
