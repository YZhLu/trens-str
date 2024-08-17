

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BZPBxRd4.js","_app/immutable/chunks/scheduler.D8z-aaqU.js","_app/immutable/chunks/index.Cp-pqOvB.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/index.DeJYhIJ1.js"];
export const stylesheets = [];
export const fonts = [];
