<script lang="ts">
	export let trens: { id: number; posX: number; posY: number; color: string; speed: number }[];
	const borderColors = ['border-amber-500', 'border-sky-400', 'border-red-500', 'border-green-500'];
</script>

<div class="overflow-auto max-h-screen  bg-primary-900-50-token border border-red-700">
	<div class="flex justify-center items-center pt-8 w-[600px] m-auto">
		<div class="size-[500px] grid grid-cols-2 grid-rows-2">
			{#each trens as trem, i}
				<div class="size-[200px] border {borderColors[i]}">
					<div
						class="flex justify-center items-center relative size-[40px] {trem.color}"
						style:transform={`translate(${trem.posX}px, ${trem.posY}px)`}
					>
						{trem.id}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
