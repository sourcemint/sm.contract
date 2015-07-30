

exports.for = function (API) {

	const SM_CONTRACT = require("../sm.contract");


	var exports = {};

	exports.resolve = function (resolver, config, previousResolvedConfig) {

		return resolver({}).then(function (resolvedConfig) {

			return API.Q.when(SM_CONTRACT.api(module)(
				API.PATH.join(API.getPGSRootPath(), "package.json")
			)).then(function (info) {

				resolvedConfig.sources = info.sources;
				resolvedConfig.mappings = info.mappings;

				// Pull in path so it serializes.
				for (var sourceId in info.sources) {
					for (var branchId in info.sources[sourceId]) {
						info.sources[sourceId][branchId].path = API.PATH.join(API.getPGSRootPath(), "..", info.sources[sourceId][branchId].path);
					}
				}

				return resolvedConfig;
			});
		});
	}

	return exports;
}

