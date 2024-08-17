<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { trainsStore, startTrains, updateTrainSpeed, stopTrains } from '$lib/train';
	import type { Train } from '$lib/interfaces/Train';
	import { AppBar, AppShell, RangeSlider } from '@skeletonlabs/skeleton';
	//import { get } from 'svelte/store';
	import Animation from '$lib/Animation.svelte';

	const max = 101;
	const min = 1;
	const step = 10;

	export const size: number[] = [192, 192];
	export const tremLength: number = 36;

	let trains: Train[] = [];
	// let trains: Train[] = [
	// 	{
	// 		id: 1,
	// 		speed: 1000,
	// 		position: 0, // Posição inicial
	// 		path: [1, 2, 3, 4],
	// 		posX: -tremLength / 2,
	// 		posY: size[1] / 2,
	// 		color: 'bg-amber-500'
	// 	},
	// 	{
	// 		id: 2,
	// 		speed: 1000,
	// 		position: 0, // Posição inicial
	// 		path: [5, 6, 7, 3],
	// 		posX: -tremLength / 2 + size[1] / 2,
	// 		posY: -tremLength / 2,
	// 		color: 'bg-sky-400'
	// 	},
	// 	{
	// 		id: 3,
	// 		speed: 1000,
	// 		position: 0, // Posição inicial
	// 		path: [10, 8, 4, 9],
	// 		posX: -tremLength / 2 + size[1] / 2,
	// 		posY: size[1] - tremLength / 2,
	// 		color: 'bg-red-500'
	// 	},
	// 	{
	// 		id: 4,
	// 		speed: 1000,
	// 		position: 0, // Posição inicial
	// 		path: [11, 12, 9, 7],
	// 		posX: -tremLength / 2 + size[1],
	// 		posY: size[1] / 2 - tremLength / 2,
	// 		color: 'bg-green-500'
	// 	}
	// ];

	// Subscribe to the trainsStore to get the current state of all trains
	trainsStore.subscribe((value) => (trains = value));

	// Função para atualizar a velocidade do trem
	function handleSpeedChange(event: Event, trainNumber: number) {
		const newSpeed = parseInt((event.target as HTMLInputElement).value);
		updateTrainSpeed(trainNumber, newSpeed);
	}

	onMount(() => {
		//startTrains();
	});

	const start = () => {
		startTrains();
	};

	const stop = () => {
		stopTrains();
	};

	function reloadPage() {
		window.location.reload();
	}
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-violet-700">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase ">SRT Railway Stations</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn btn-sm variant-ghost-surface" on:click={start}> Start </button>
				<button class="btn btn-sm variant-ghost-surface" on:click={stop}> Stop </button>
				<button class="btn btn-sm variant-ghost-surface" on:click={reloadPage}> Reset </button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<main class="h-screen w-screen overflow-auto border bg-gray-100">
		<Animation trens={$trainsStore} />

		<div class="flex flex-col md:flex-row justify-center items-center gap-2 p-2 border">
			{#each $trainsStore as trem, i}
				<div class="py-4 px-6 w-full {trem.color}">
					<RangeSlider
						name="range-slider"
						bind:value={trem.speed}
						{max}
						{step}
						{min}
						ticked
						on:change={(event) => handleSpeedChange(event, trem.id)}
					>
						<div class="flex justify-between items-center">
							<div class="font-bold">Trem {i + 1}</div>
							<div class="text-xs">{trem.speed} / {max}</div>
						</div>
					</RangeSlider>
				</div>
			{/each}
		</div>
	</main>
</AppShell>
