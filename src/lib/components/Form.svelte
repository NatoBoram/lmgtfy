<script lang="ts">
	import Buttons from '$lib/components/Buttons.svelte'
	import Google from '$lib/components/Google.svelte'
	import Search from '$lib/components/Search.svelte'

	let f: string
	export { f as for }

	let className: string | undefined = undefined
	export { className as class }

	export let action: string
	export let btnI: HTMLInputElement | undefined = undefined
	export let btnK: HTMLInputElement | undefined = undefined
	export let input: HTMLInputElement | undefined = undefined
</script>

<form
	{action}
	autocomplete="off"
	class="flex flex-col items-center gap-4 px-4 {className}"
	method="GET"
	role="search"
>
	<Google for={f} />
	<Search id={f} bind:input />
	<Buttons bind:btnK bind:btnI />
</form>
