<script>
	import Animation from '$lib/Animation.svelte';
	const tremLength = 36; // Comprimento dos lados do quadrado
	const size = [192, 192];
	let trens = [
		{ id: 1, posX: -tremLength / 2, posY: size[1] / 2, color: 'bg-amber-500', speed: 1 },
		{
			id: 2,
			posX: -tremLength / 2 + size[1] / 2,
			posY: -tremLength / 2,
			color: 'bg-sky-400',
			speed: 1
		},
		{
			id: 3,
			posX: -tremLength / 2 + size[1] / 2,
			posY: size[1] - tremLength / 2,
			color: 'bg-red-500',
			speed: 1
		},
		{
			id: 4,
			posX: -tremLength / 2 + size[1],
			posY: size[1] / 2 - tremLength / 2,
			color: 'bg-green-500',
			speed: 1
		}
	];
</script>

<main class="h-screen w-screen overflow-auto bg-gray-100">
	<Animation {trens} />
</main>
