<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { trainsStore, startTrains, updateTrainSpeed, stopTrains, sizeStore } from '$lib/train';
	import { AppBar, AppShell, RangeSlider } from '@skeletonlabs/skeleton';
	import Animation from '$lib/Animation.svelte';

	const max = 20;
	const min = 0;
	const step = 1;

	function handleSpeedChange(event: Event, trainNumber: number) {
		const newSpeed = parseInt((event.target as HTMLInputElement).value);
		updateTrainSpeed(trainNumber, newSpeed);
	}

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

<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-violet-700">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">SRT Railway Stations </strong>
				<a href="/" class="btn" data-sveltekit-preload-data="hover">Safe</a>
				<a href="/turbo" class="btn" data-sveltekit-preload-data="hover">Turbo</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn btn-sm variant-ghost-surface" on:click={start}> Start </button>
				<!-- <button class="btn btn-sm variant-ghost-surface" on:click={stop}> Stop </button> -->
				<LightSwitch></LightSwitch>
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
