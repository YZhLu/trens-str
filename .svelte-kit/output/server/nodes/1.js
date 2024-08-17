

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.D9lvcbYX.js","_app/immutable/chunks/scheduler.D8z-aaqU.js","_app/immutable/chunks/index.Cp-pqOvB.js","_app/immutable/chunks/entry.Bbn5q4Py.js","_app/immutable/chunks/index.DeJYhIJ1.js"];
export const stylesheets = [];
export const fonts = [];
