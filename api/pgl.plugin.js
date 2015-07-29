

exports.for = function (API) {

	const SM_CONTRACT = require("../sm.contract");


	var exports = {};

	exports.resolve = function (resolver, config, previousResolvedConfig) {

		return resolver({}).then(function (resolvedConfig) {

// TODO: Only do contraction if we have a reason to do so (i.e. something has changed).
resolvedConfig.t = Date.now();

			return resolvedConfig;
		});
	}

	exports.turn = function (resolvedConfig) {

		return API.Q.when(SM_CONTRACT.api(module)(
			API.PATH.join(API.getPGSRootPath(), "package.json")
		));
	}

	return exports;
}

