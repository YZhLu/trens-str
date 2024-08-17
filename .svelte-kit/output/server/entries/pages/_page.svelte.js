import { c as create_ssr_component, h as each, e as escape, a as add_attribute } from "../../chunks/ssr.js";
import { Semaphore } from "async-mutex";
import { w as writable } from "../../chunks/index.js";
const trainsStore = writable([
  {
    number: 1,
    speed: 1e3,
    position: 0,
    // Posição inicial
    path: [1, 2, 3, 4]
  },
  {
    number: 2,
    speed: 1e3,
    position: 0,
    // Posição inicial
    path: [5, 6, 7, 3]
  },
  {
    number: 3,
    speed: 1e3,
    position: 0,
    // Posição inicial
    path: [10, 8, 4, 9]
  },
  {
    number: 4,
    speed: 1e3,
    position: 0,
    // Posição inicial
    path: [11, 12, 9, 7]
  }
]);
new Semaphore(1);
new Semaphore(1);
new Semaphore(1);
new Semaphore(1);
new Semaphore(3);
function drawCircuit() {
  const size = 200;
  const offset = 50;
  return `
            <svg width="${size + offset * 2}" height="${size + offset * 2}">
                <rect x="${offset}" y="${offset}" width="${size}" height="${size}" stroke="black" fill="none" />
            </svg>
        `;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let trains = [];
  trainsStore.subscribe((value) => trains = value);
  return `  <h1 data-svelte-h="svelte-do0li1">Simulação de Trens</h1> <div><!-- HTML_TAG_START -->${drawCircuit()}<!-- HTML_TAG_END --></div> <h2 data-svelte-h="svelte-1kr2yex">Ajuste a Velocidade dos Trens</h2> <div>${each(trains, (train) => {
    return `<div><label for="${"speed-" + escape(train.number, true)}">Trem ${escape(train.number)} Velocidade:</label> <input id="${"speed-" + escape(train.number, true)}" type="number" min="100" max="5000"${add_attribute("value", train.speed, 0)}> </div>`;
  })}</div>`;
});
export {
  Page as default
};
