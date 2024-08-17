export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.BY2ARYqz.js","app":"_app/immutable/entry/app.GPhAR7pm.js","imports":["_app/immutable/entry/start.BY2ARYqz.js","_app/immutable/chunks/entry.Bbn5q4Py.js","_app/immutable/chunks/scheduler.D8z-aaqU.js","_app/immutable/chunks/index.DeJYhIJ1.js","_app/immutable/entry/app.GPhAR7pm.js","_app/immutable/chunks/scheduler.D8z-aaqU.js","_app/immutable/chunks/index.Cp-pqOvB.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/tela",
				pattern: /^\/tela\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/test",
				pattern: /^\/test\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
