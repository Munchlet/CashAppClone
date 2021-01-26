module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["./src"],
					alias: {
						util: "./util",
					},
					extensions: [".js", ".jsx", ".es", ".es6", ".mjs", ".ts", ".tsx"],
				},
			],
		],
	};
};
