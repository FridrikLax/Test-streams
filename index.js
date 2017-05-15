'use strict';
const fs = require('fs');
const minimist = require('minimist');
const {parseIntArgument} = require('./utility/cli');

const LinerTransform = require('./components/LinerTransform');
const AggregatorTransform = require('./components/AggregatorTransform');

let argv = minimist(process.argv.slice(2),{
	boolean: ['verbose'],
	string: ['chunksize'],
	unknown: (arg) => {console.log('Invalid argument: ' + arg); process.exit(1)}
});

let chunksize = parseIntArgument(argv, 'chunksize', 1024 * 64); // default 64 kb

delete argv['_'];
const options = argv;

//const source = fs.createReadStream('./logs/log_full.csv', {highWaterMark: chunksize });
const source = process.stdin;
const sink = process.stdout;
// todo : Control chunksize --> only working when reading from file
source._readableState.highWaterMark = chunksize;

const liner = new LinerTransform();
const aggregate = new AggregatorTransform(options);

source.pipe(liner).pipe(aggregate).pipe(sink);

