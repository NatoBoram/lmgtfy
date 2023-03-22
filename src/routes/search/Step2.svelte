<script lang="ts">
	export let button: HTMLInputElement

	let className: string | undefined = undefined
	export { className as class }
</script>

<div class={className}>
	<h1 class="text-xl font-semibold">Step 2</h1>
	<p>Click on the <em>{button.value}</em> button</p>
</div>
