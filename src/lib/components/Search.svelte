<script lang="ts">
	import { MagnifyingGlass } from '@natoboram/heroicons.svelte/20/solid'

	export let id: string
	export let input: HTMLInputElement | undefined = undefined
	export let value = ''
</script>

<div
	class="flex w-full max-w-xl flex-row items-center gap-4 rounded-full border border-zinc-200 p-2
			focus-within:border-transparent
			focus-within:shadow-md
			hover:border-transparent
			hover:shadow-md
			dark:border-zinc-500
			focus-within:dark:border-transparent
			focus-within:dark:bg-zinc-700
			hover:dark:border-transparent
			hover:dark:bg-zinc-700
		"
>
	<MagnifyingGlass />
	<input
		{id}
		aria-label="Search"
		autocapitalize="none"
		autocomplete="off"
		autocorrect="off"
		bind:this={input}
		bind:value
		class="w-full bg-transparent outline-none"
		maxlength="2048"
		name="q"
		spellcheck="false"
		title="Search"
		type="text"
	/>
</div>
