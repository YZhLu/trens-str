import { Semaphore } from 'async-mutex';
import { writable, get } from 'svelte/store';

export const size: number[] = [192, 192];
export const tremLength: number = 36;

interface Train {
	speed: number; // Velocidade em pixels por segundo
	position: number;
	path: number[];
	id: number;
	posX: number;
	posY: number;
	color: string;
	stopFlag: boolean; // Flag para parar o trem
}

// Comprimento do trilho em pixels (ajuste conforme necessário)
const trackLength = size[0];
const initialTrains: Train[] = [
	{
		id: 1,
		speed: 10,
		position: 0,
		path: [1, 2, 3, 4],
		posX: -tremLength / 2,
		posY: size[1], // / 2,
		color: 'bg-amber-500',
		stopFlag: false
	},
	{
		id: 2,
		speed: 10,
		position: 0,
		path: [5, 6, 7, 3],
		posX: -tremLength / 2, //+ size[1] / 2,
		posY: -tremLength / 2,
		color: 'bg-sky-400',
		stopFlag: false
	},
	{
		id: 3,
		speed: 10,
		position: 0,
		path: [10, 8, 4, 9],
		posX: -tremLength / 2 + size[1], // / 2,
		posY: size[1] - tremLength / 2,
		color: 'bg-red-500',
		stopFlag: false
	},
	{
		id: 4,
		speed: 10,
		position: 0,
		path: [11, 12, 9, 7],
		posX: -tremLength / 2 + size[1],
		posY: -tremLength / 2, //+ size[1] / 2,
		color: 'bg-green-500',
		stopFlag: false
	}
];

export const trainsStore = writable<Train[]>(initialTrains);

const semaphore7 = new Semaphore(1);
const semaphore9 = new Semaphore(1);
const semaphore3 = new Semaphore(1);
const semaphore4 = new Semaphore(1);
const semaphoreMaster = new Semaphore(3);

const semaphores: Record<string, Semaphore> = {
	'7': semaphore7,
	'9': semaphore9,
	'3': semaphore3,
	'4': semaphore4
};

async function goAhead(train: Train, line: number) {
	const interval = 1; // Intervalo de tempo em milissegundos
	const trains = get(trainsStore);
	const existingTrain = trains.find((t) => t.id === train.id);

	if (!existingTrain) return;

	let elapsedTime = 0;

	while (elapsedTime < (trackLength / existingTrain.speed) * 100) {
		if (train.stopFlag) {
			console.log(`Trem ${train.id} foi parado.`);
			return; // Interrompe a função se o trem foi sinalizado para parar
		}

		const distance = (existingTrain.speed / 100) * interval; // Distância percorrida em cada intervalo

		// Atualiza a posição X ou Y do trem
		trainsStore.update((trains) => {
			const trainToUpdate = trains.find((t) => t.id === train.id);
			if (trainToUpdate) {
				if (trainToUpdate.id === 1) console.log(trainToUpdate.id, distance);
				if (trainToUpdate.posY <= -tremLength / 2) {
					trainToUpdate.posX += distance; //trainToUpdate.speed;
				}
				if (trainToUpdate.posX >= size[0] - tremLength / 2) {
					trainToUpdate.posX = size[0] - tremLength / 2;
					trainToUpdate.posY += distance; //trainToUpdate.speed;
				}
				if (trainToUpdate.posY >= size[1] - tremLength / 2) {
					trainToUpdate.posY = size[1] - tremLength / 2;
					trainToUpdate.posX -= distance; //trainToUpdate.speed;
				}
				if (trainToUpdate.posX <= -tremLength / 2) {
					trainToUpdate.posX = -tremLength / 2;
					trainToUpdate.posY -= distance; //trainToUpdate.speed;
				}
			}
			return [...trains];
		});

		// Espera pelo intervalo de tempo antes de continuar
		await sleep(interval);

		// Atualiza o tempo decorrido
		elapsedTime += interval;
	}

	console.log(`Trem ${train.id} concluiu a travessia do trilho ${line}`);
}

async function move(train: Train) {
	while (true) {
		if (train.stopFlag) {
			console.log(`Trem ${train.id} foi parado.`);
			return; // Interrompe o loop se o trem foi sinalizado para parar
		}

		await goAhead(train, train.path[0]);
		await goAhead(train, train.path[1]);

		await semaphoreMaster.acquire();
		await semaphores[`${train.path[2]}`].acquire();
		console.log(`Linha ${train.path[2]} ocupada pelo trem ${train.id}`);
		await goAhead(train, train.path[2]);

		await semaphores[`${train.path[3]}`].acquire();
		semaphores[`${train.path[2]}`].release();
		console.log(`Linha ${train.path[3]} ocupada pelo trem ${train.id}`);
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
		train.stopFlag = false; // Reseta o flag de parada
		move(train);
	}
}

// Função para resetar os trens
export function stopTrains() {
	// Sinaliza para todos os trens pararem
	trainsStore.update(trains => {
		trains.forEach(train => {
			train.stopFlag = true; // Sinaliza para cada trem parar
		});
		return [...trains];
	});

	// Aguarda um breve momento para garantir que todos os trens foram parados
	// setTimeout(() => {
	// 	// Redefine o estado inicial dos trens
	// 	trainsStore.set(initialTrains);
	// }, 100); // 100 ms é um tempo arbitrário para garantir que os trens pararam antes de resetar
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function updateTrainSpeed(trainId: number, speed: number) {
	trainsStore.update((trains) => {
		const train = trains.find((t) => t.id === trainId);
		if (train) {
			train.speed = speed;
		}
		return [...trains];
	});
}
