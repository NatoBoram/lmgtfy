<script lang="ts">
	import { base } from '$app/paths'
	import Form from '$lib/components/Form.svelte'

	export let btnI: HTMLInputElement | undefined = undefined
	export let btnK: HTMLInputElement | undefined = undefined
	export let input: HTMLInputElement | undefined = undefined
</script>

<Form action="{base}/search" bind:btnI bind:btnK bind:input for="input" />
