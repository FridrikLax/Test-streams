'use strict';
const fs = require('fs');
const minimist = require('minimist');

const LinerTransform = require('./components/LinerTransform');
const AggregatorTransform = require('./components/AggregatorTransform');

let argv = minimist(process.argv.slice(2));
console.log(argv);

const source = fs.createReadStream('./logs/log_full.csv');
//const source = process.stdin;

const liner = new LinerTransform();
const aggregate = new AggregatorTransform();

source.pipe(liner).pipe(aggregate).pipe(process.stdout);


