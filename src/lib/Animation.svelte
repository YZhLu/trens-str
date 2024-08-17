<script lang="ts">
	import { onMount } from 'svelte';
	// import { RangeSlider } from '@skeletonlabs/skeleton';

	// export let max = 100;
	// export let min = 0.1;
	// export let step = 0.1;

	//export let tremLength = 36; // Comprimento dos lados do quadrado

	//export let size = [192, 192];

	// let trens = [
	// 	{ id: 1, posX: -tremLength / 2, posY: size[1] / 2, color: 'bg-amber-500', speed: 1 },
	// 	{ id: 2, posX: -tremLength/2 + size[1]/2, posY: -tremLength/2, color: 'bg-sky-400', speed: 1 },
	// 	{ id: 3, posX: -tremLength / 2 + size[1]/2, posY: size[1] -tremLength / 2, color: 'bg-red-500', speed: 1 },
	// 	{ id: 4, posX: -tremLength / 2 + size[1], posY: size[1]/2 -tremLength / 2 , color: 'bg-green-500', speed: 1 }
	// ];

	export let trens: { id: number; posX: number; posY: number; color: string; speed: number }[];

	const borderColors = ['border-amber-500', 'border-sky-400', 'border-red-500', 'border-green-500'];


	function animate() {
		// trens = trens.map((trem) => {
		// 	let newTrem = { ...trem };
            
		// 	// if (newTrem.posY <= -tremLength / 2) {
		// 	// 	newTrem.posX += newTrem.speed;
		// 	// }
		// 	// if (newTrem.posX >= size[0] - tremLength / 2) {
		// 	// 	newTrem.posX = size[0] - tremLength / 2;
		// 	// 	newTrem.posY += newTrem.speed;
		// 	// }
		// 	// if (newTrem.posY >= size[1] - tremLength / 2) {
		// 	// 	newTrem.posY = size[1] - tremLength / 2;
		// 	// 	newTrem.posX -= newTrem.speed;
		// 	// }
		// 	// if (newTrem.posX <= -tremLength / 2) {
		// 	// 	newTrem.posX = -tremLength / 2;
		// 	// 	newTrem.posY -= newTrem.speed;
		// 	// }

		// 	return newTrem;
		// });

		requestAnimationFrame(animate);
	}

	onMount(() => {
		animate();
	});
</script>

<!-- <div class="bg-amber-500">{(trens[0].posX)} {-tremLength / 2}</div> -->

<div class="overflow-auto max-h-screen">
	<div class="flex justify-center items-center p-10">
		<div class="size-[400px] grid grid-cols-2 grid-rows-2">
			{#each trens as trem, i}
				<div class="size-48 border {borderColors[i]}">
					<div
						class="flex justify-center items-center relative h-9 w-9 {trem.color}"
						style:transform={`translate(${trem.posX}px, ${trem.posY}px)`}
					>
						{trem.id}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- <div class="flex flex-col md:flex-row justify-center items-center gap-2 p-2 border">
		{#each trens as trem, i}
			<div class="py-4 px-6 w-full {trem.color}">
				<RangeSlider name="range-slider" bind:value={trem.speed} {max} {step} {min} ticked>
					<div class="flex justify-between items-center">
						<div class="font-bold">Trem {i + 1}</div>
						<div class="text-xs">{trem.speed} / {max}</div>
					</div>
				</RangeSlider>
			</div>
		{/each}
	</div> -->
</div>
