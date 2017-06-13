/**
* Pass throough all environment variables that do not start with npm_
* those are not needed for our application
*/
const vars = Object.keys(process.env)
	.filter((key) => /^(?!npm_)/i.test(key))
	.reduce((acc, key) => {
		acc[key] = process.env[key];
		return acc;
	}, {});

module.exports = function () {
	return {
		'process.env': Object.keys(vars)
			.reduce((acc, key) => {
				acc[key] = (typeof process.env[key] === 'boolean' || typeof process.env[key] === 'number')
					? process.env[key]
					// strings must be stringified otherwise 'development' turns into development
					// and will evaluate to a variable
					: JSON.stringify(process.env[key]);
				return acc;
			}, {})
	};
};
