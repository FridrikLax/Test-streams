'use strict';

function parseIntArgument(argv, argumentName, defaultValue){
	let argument = argv[argumentName] || defaultValue;
	argument = parseInt(argument, 10);
	if (!argument){
		console.log(argumentName + ' needs to be an integer ');
		process.exit(1);
	}
	return argument;
}

module.exports = {
	parseIntArgument: parseIntArgument
}