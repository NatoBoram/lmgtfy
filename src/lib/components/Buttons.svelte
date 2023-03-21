<script lang="ts">
	export let btnI: HTMLInputElement | undefined = undefined
	export let btnK: HTMLInputElement | undefined = undefined
</script>

<div class="flex flex-row gap-4 align-middle">
	<input
		bind:this={btnK}
		aria-label="Google Search"
		class="rounded border border-transparent bg-zinc-100 py-2 px-4 dark:bg-zinc-700 hover:dark:border-zinc-500"
		name="btnK"
		tabindex="0"
		type="submit"
		value="Google Search"
	/>

	<input
		bind:this={btnI}
		aria-label="I'm Feeling Lucky"
		class="rounded border border-transparent bg-zinc-100 py-2 px-4 dark:bg-zinc-700 hover:dark:border-zinc-500"
		name="btnI"
		type="submit"
		value="I'm Feeling Lucky"
	/>
</div>
