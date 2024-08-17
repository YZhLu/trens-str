import { c as create_ssr_component, i as compute_rest_props, e as escape, a as add_attribute, j as spread, k as escape_attribute_value, l as escape_object, h as each, b as compute_slots, d as add_styles, v as validate_component } from "./ssr.js";
import "./ProgressBar.svelte_svelte_type_style_lang.js";
const cBase = "space-y-2";
const cBaseLabel = "";
const cBaseContent = "flex justify-center py-2";
const cBaseInput = "w-full h-2";
const RangeSlider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesInput;
  let $$restProps = compute_rest_props($$props, ["name", "id", "value", "min", "max", "step", "ticked", "accent", "label"]);
  let $$slots = compute_slots(slots);
  let { name } = $$props;
  let { id = String(Math.random()) } = $$props;
  let { value = 0 } = $$props;
  let { min: min2 = 0 } = $$props;
  let { max: max2 = 100 } = $$props;
  let { step: step2 = 1 } = $$props;
  let { ticked = false } = $$props;
  let { accent = "accent-surface-900 dark:accent-surface-50" } = $$props;
  let { label = "" } = $$props;
  let tickmarks;
  function setTicks() {
    if (ticked == false) return;
    tickmarks = Array.from({ length: max2 - min2 + 1 }, (_, i) => i + min2);
  }
  if (ticked) setTicks();
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.min === void 0 && $$bindings.min && min2 !== void 0) $$bindings.min(min2);
  if ($$props.max === void 0 && $$bindings.max && max2 !== void 0) $$bindings.max(max2);
  if ($$props.step === void 0 && $$bindings.step && step2 !== void 0) $$bindings.step(step2);
  if ($$props.ticked === void 0 && $$bindings.ticked && ticked !== void 0) $$bindings.ticked(ticked);
  if ($$props.accent === void 0 && $$bindings.accent && accent !== void 0) $$bindings.accent(accent);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  classesBase = `${cBase} ${$$props.class ?? ""}`;
  classesInput = `${cBaseInput} ${accent}`;
  return `<div class="${"range-slider " + escape(classesBase, true)}" data-testid="range-slider"> ${$$slots.default ? `<label class="${"range-slider-label " + escape(cBaseLabel, true)}"${add_attribute("for", id, 0)}>${slots.default ? slots.default({}) : ``}</label>` : ``}  <div class="${"range-content " + escape(cBaseContent, true)}"> <input${spread(
    [
      { type: "range" },
      { id: escape_attribute_value(id) },
      { name: escape_attribute_value(name) },
      {
        class: "range-slider-input " + escape(classesInput, true)
      },
      { list: "tickmarks-" + escape(id, true) },
      {
        "aria-label": escape_attribute_value(label)
      },
      { min: escape_attribute_value(min2) },
      { max: escape_attribute_value(max2) },
      { step: escape_attribute_value(step2) },
      escape_object(prunedRestProps())
    ],
    {}
  )}${add_attribute("value", value, 0)}>  ${ticked && tickmarks && tickmarks.length ? `<datalist id="${"tickmarks-" + escape(id, true)}" class="range-slider-ticks">${each(tickmarks, (tm) => {
    return `<option${add_attribute("value", tm, 0)}${add_attribute("label", tm, 0)}></option>`;
  })}</datalist>` : ``}</div>  ${$$slots.trail ? `<div class="range-slider-trail">${slots.trail ? slots.trail({}) : ``}</div>` : ``}</div>`;
});
let max = 100;
let min = 0.1;
let step = 0.1;
const tremLength = 36;
const Animation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let trens = [
    {
      id: 1,
      posX: -tremLength / 2,
      posY: 0,
      color: "amber-500",
      speed: 1
    },
    {
      id: 2,
      posX: -tremLength / 2,
      posY: 0,
      color: "sky-400",
      speed: 1
    },
    {
      id: 3,
      posX: -tremLength / 2,
      posY: 0,
      color: "red-500",
      speed: 1
    },
    {
      id: 4,
      posX: -tremLength / 2,
      posY: 0,
      color: "green-500",
      speed: 1
    }
  ];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex justify-center items-center p-10"><div class="size-[400px] grid grid-cols-2 grid-rows-2">${each(trens, (trem) => {
      return `<div class="${"size-48 border border-" + escape(trem.color, true)}"><div class="${"flex justify-center items-center relative h-9 w-9 bg-" + escape(trem.color, true)}"${add_styles({
        "transform": `translate(${trem.posX}px, ${trem.posY}px)`
      })}>${escape(trem.id)}</div> </div>`;
    })}</div></div> <div class="flex flex-col md:flex-row justify-center items-center gap-2 p-2 border">${each(trens, (trem, i) => {
      return `<div class="${"py-4 px-6 w-full bg-" + escape(trem.color, true)}">${validate_component(RangeSlider, "RangeSlider").$$render(
        $$result,
        {
          name: "range-slider",
          max,
          step,
          min,
          ticked: true,
          value: trem.speed
        },
        {
          value: ($$value) => {
            trem.speed = $$value;
            $$settled = false;
          }
        },
        {
          default: () => {
            return `<div class="flex justify-between items-center"><div class="font-bold">Trem ${escape(i + 1)}</div> <div class="text-xs">${escape(trem.speed)} / ${escape(max)}</div></div> `;
          }
        }
      )} </div>`;
    })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Animation as A
};
