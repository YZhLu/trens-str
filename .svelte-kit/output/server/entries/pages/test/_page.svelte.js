import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { A as Animation } from "../../../chunks/Animation.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="h-screen w-screen overflow-auto bg-gray-100">${validate_component(Animation, "Animation").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
