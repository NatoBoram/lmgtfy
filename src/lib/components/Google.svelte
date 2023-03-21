<script lang="ts">
	export let f: string
	export { f as for }
</script>

<label class="font-['Open_Sans'] text-8xl font-normal" for={f}>
	<span class="text-blue-500 dark:text-blue-400">L</span><span
		class="text-red-500 dark:text-red-400">m</span
	><span class="text-amber-500 dark:text-amber-400">g</span><span
		class="text-blue-500 dark:text-blue-400">t</span
	><span class="text-green-500 dark:text-green-400">f</span><span
		class="text-red-500 dark:text-red-400">y</span
	>
</label>

<label for={f}><small>Let me Google that for you</small></label>
