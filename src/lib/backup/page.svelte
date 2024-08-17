<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { trainsStore, startTrains, updateTrainSpeed } from '$lib/train_bkp';

    let trains = [];

    // Subscribe to the trainsStore to get the current state of all trains
    trainsStore.subscribe(value => trains = value);

    // Função para atualizar a velocidade do trem
    function handleSpeedChange(event: Event, trainNumber: number) {
        const newSpeed = parseInt((event.target as HTMLInputElement).value);
        updateTrainSpeed(trainNumber, newSpeed);
    }

    onMount(() => {
        startTrains();
    });
</script>

<h1>Controle de Trens</h1>

<ul>
    {#each trains as train}
        <li>Trem {train.number} está na linha {train.position}</li>
    {/each}
</ul>

<h2>Ajuste a Velocidade dos Trens</h2>
<div>
    {#each trains as train}
        <div>
            <label for="speed-{train.number}">Trem {train.number} Velocidade:</label>
            <input id="speed-{train.number}" type="number" min="100" max="5000" bind:value={train.speed} on:change={(event) => handleSpeedChange(event, train.number)} />
        </div>
    {/each}
</div>
