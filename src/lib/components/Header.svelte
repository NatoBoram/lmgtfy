<script lang="ts">
	import { Brightness, brightness, toggleBrightness } from '$lib/stores/brightness.js'
	import { Moon, Sun } from '@natoboram/heroicons.svelte/24/solid'

	const icons = {
		[Brightness.dark]: Sun,
		[Brightness.light]: Moon,
	}
</script>

<header class="flex flex-row justify-end gap-4 p-2">
	<button
		on:click={() => {
			toggleBrightness($brightness)
		}}
		class="rounded-full p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
	>
		<svelte:component this={icons[$brightness]} />
	</button>
</header>
