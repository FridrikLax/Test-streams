'use strict';
const fs = require('fs');
const minimist = require('minimist');

const LinerTransform = require('./components/LinerTransform');

let argv = minimist(process.argv.slice(2));
console.log(argv);

const source = fs.createReadStream('./logs/log_full.csv');
//const source = process.stdin;

//source.pipe(process.stdout);



const liner = new LinerTransform();

source.pipe(liner);


liner.on('readable', function () {
	let line;
	while (null !== (line = liner.read())) {
		console.log(line);
	}
});
