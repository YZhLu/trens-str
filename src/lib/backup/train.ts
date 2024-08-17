// src/lib/train.ts
import { Semaphore } from 'async-mutex';
import { writable, get } from 'svelte/store';

interface Train {
    number: number;
    speed: number;
    position: number;
    path: number[];
}

// Define o comprimento do trilho em metros (ajuste conforme necessário)
const trackLength = 1000; // Substitua este valor pelo comprimento real do trilho


export const trainsStore = writable<Train[]>([
    {
        number: 1,
        speed: 1000,
        position: 0,  // Posição inicial
        path: [1, 2, 3, 4]
    },
    {
        number: 2,
        speed: 1000,
        position: 0,  // Posição inicial
        path: [5, 6, 7, 3]
    },
    {
        number: 3,
        speed: 1000,
        position: 0,  // Posição inicial
        path: [10, 8, 4, 9]
    },
    {
        number: 4,
        speed: 1000,
        position: 0,  // Posição inicial
        path: [11, 12, 9, 7]
    }
]);

const semaphore7 = new Semaphore(1);
const semaphore9 = new Semaphore(1);
const semaphore3 = new Semaphore(1);
const semaphore4 = new Semaphore(1);
const semaphoreMaster = new Semaphore(3);

const semaphores: Record<string, Semaphore> = {
    "7": semaphore7,
    "9": semaphore9,
    "3": semaphore3,
    "4": semaphore4
};

let step = 0;

async function goAhead(train: Train, line: number) {
    // Obtém a velocidade atual do trem
    const speed = get(trainsStore).find(t => t.number === train.number)?.speed || 1000;
    
    
    // Calcula o tempo necessário para atravessar o trilho com a velocidade atual
    const timeToCrossTrack = (trackLength / speed) * 1000; // Convertendo para milissegundos

    console.log(`Step ${step} - train ${train.number} - Trilho ${line} - Velocidade ${speed} m/s`);
    step++;

    const interval = 50; // Intervalo de tempo em milissegundos
    let elapsedTime = 0;

    while (elapsedTime < timeToCrossTrack) {
        // Atualiza a posição do trem na store
        trainsStore.update(trains => {
            const existingTrain = trains.find(t => t.number === train.number);
            if (existingTrain) {
                existingTrain.position = line; // Atualiza a posição do trem
            }
            return [...trains];
        });

        // Espera pelo intervalo de tempo antes de continuar
        await sleep(interval);

        // Atualiza o tempo decorrido
        elapsedTime += interval;
    }

    // Após a travessia, log a conclusão
    console.log(`Trem ${train.number} concluiu a travessia do trilho ${line}`);
}



async function move(train: Train) {
    while (true) {

        await goAhead(train, train.path[0]);
        await goAhead(train, train.path[1]);

        await semaphoreMaster.acquire();
        await semaphores[`${train.path[2]}`].acquire();
        console.log(`Linha ${train.path[2]} ocupada pelo trem ${train.number}`);
        await goAhead(train, train.path[2]);

        await semaphores[`${train.path[3]}`].acquire();
        semaphores[`${train.path[2]}`].release();
        console.log(`Linha ${train.path[3]} ocupada pelo trem ${train.number}`);
        console.log(`Linha ${train.path[2]} liberada`);
        await goAhead(train, train.path[3]);

        semaphores[`${train.path[3]}`].release();
        console.log(`Linha ${train.path[3]} liberada`);
        semaphoreMaster.release();
    }
}

export async function startTrains() {
    const trains = get(trainsStore);
    for (const train of trains) {
        move(train);
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function updateTrainSpeed(trainNumber: number, speed: number) {
    trainsStore.update(trains => {
        const train = trains.find(t => t.number === trainNumber);
        if (train) {
            train.speed = speed;
        }
        return [...trains];
    });
}
