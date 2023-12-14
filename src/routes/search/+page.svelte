<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Form from '$lib/components/Form.svelte'
	import { ArrowUpLeft } from '@natoboram/heroicons.svelte/20/solid'
	import { onMount } from 'svelte'
	import Step1 from './Step1.svelte'
	import Step2 from './Step2.svelte'
	import Step3 from './Step3.svelte'

	onMount(async () => {
		const btnI = $page.url.searchParams.get('btnI')
		const btnK = $page.url.searchParams.get('btnK')
		const q = $page.url.searchParams.get('q')
		const btn = btnK ? search : btnI ? lucky : undefined
		if (!q || !btn) return goto('/')
		button = btn

		await move(cursor, input)
		input.focus()
		await write(q)
		await new Promise(resolve => setTimeout(resolve, 1000))

		step++
		await move(cursor, button)
		button.focus()
		await new Promise(resolve => setTimeout(resolve, 1000))

		step++
		await new Promise(resolve => setTimeout(resolve, 1000))
		button.click()
	})

	/** Move the cursor to the targeted element */
	async function move(cursor: HTMLDivElement, target: HTMLElement) {
		return new Promise(resolve => {
			const diffX =
				target.getBoundingClientRect().left +
				target.clientWidth / 2 -
				cursor.getBoundingClientRect().left
			const diffY =
				target.getBoundingClientRect().top +
				target.clientHeight / 2 -
				cursor.getBoundingClientRect().top

			const steps = 60
			const stepX = diffX / steps
			const stepY = diffY / steps

			let step = 0
			const interval = setInterval(frame, 1000 / 60)

			function frame() {
				if (step >= steps) {
					clearInterval(interval)
					resolve(undefined)
				} else {
					step++
					cursor.style.top = (parseFloat(cursor.style.top) || 0) + stepY + 'px'
					cursor.style.left = (parseFloat(cursor.style.left) || 0) + stepX + 'px'
				}
			}
		})
	}

	async function write(text: string) {
		for (const letter of text) {
			await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))
			input.value += letter
			input.scrollLeft = input.scrollWidth
		}
	}

	let button: HTMLInputElement
	let cursor: HTMLDivElement
	let input: HTMLInputElement
	let lucky: HTMLInputElement
	let search: HTMLInputElement
	let step = 0
</script>

<div bind:this={cursor} class="absolute left-0 top-0">
	<ArrowUpLeft />
</div>

<div class="flex w-full flex-col items-center gap-4">
	<Form
		class="w-full"
		action="https://google.com/search"
		bind:btnI={lucky}
		bind:btnK={search}
		bind:input
		for="input"
	/>

	{#if step === 0}
		<Step1 class="w-full max-w-xl rounded bg-blue-100 p-4 text-blue-800 dark:bg-blue-200" />
	{:else if step === 1}
		<Step2
			{button}
			class="w-full max-w-xl rounded bg-blue-100 p-4 text-blue-800 dark:bg-blue-200"
		/>
	{:else if step === 2}
		<Step3 class="w-full max-w-xl rounded bg-green-100 p-4 text-green-800 dark:bg-green-200" />
	{/if}
</div>
