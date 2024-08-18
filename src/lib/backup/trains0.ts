// src/lib/train.ts
import { Semaphore } from 'async-mutex';
import { writable } from 'svelte/store';

export const trainPositions = writable<{ number: number; position: number }[]>([]);

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

const v1 = 1000;
const v2 = 1000;
const v3 = 1000;
const v4 = 1000;

interface Train {
    number: number;
    speed: number;
    path: number[];
}

const trains: Train[] = [
    {
        number: 1,
        speed: v1,
        path: [1, 2, 3, 4]
    },
    {
        number: 2,
        speed: v2,
        path: [5, 6, 7, 3]
    },
    {
        number: 3,
        speed: v3,
        path: [10, 8, 4, 9]
    },
    {
        number: 4,
        speed: v4,
        path: [11, 12, 9, 7]
    }
];

let step = 0;

async function goAhead(train: Train, line: number, v: number) {
    console.log(`Step ${step} - train ${train.number} - Trilho ${line} - Velocidade ${v}`);
    step++;

    // Atualize a posição do trem no store
    trainPositions.update(positions => {
        const existingTrain = positions.find(t => t.number === train.number);
        if (existingTrain) {
            existingTrain.position = line;
        } else {
            positions.push({ number: train.number, position: line });
        }
        return [...positions];
    });

    await sleep(v);
}

async function move(train: Train) {
    while (true) {
        await goAhead(train, train.path[0], train.speed);
        await goAhead(train, train.path[1], train.speed);

        await semaphoreMaster.acquire();
        await semaphores[`${train.path[2]}`].acquire();
        console.log(`Linha ${train.path[2]} ocupada pelo trem ${train.number}`);
        await goAhead(train, train.path[2], train.speed);

        await semaphores[`${train.path[3]}`].acquire();
        semaphores[`${train.path[2]}`].release();
        console.log(`Linha ${train.path[3]} ocupada pelo trem ${train.number}`);
        console.log(`Linha ${train.path[2]} liberada`);
        await goAhead(train, train.path[3], train.speed);

        semaphores[`${train.path[3]}`].release();
        console.log(`Linha ${train.path[3]} liberada`);
        semaphoreMaster.release();
    }
}

export async function startTrains() {
    move(trains[0]);
    move(trains[1]);
    move(trains[2]);
    move(trains[3]);
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
