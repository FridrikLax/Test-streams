'use strict';
const fs = require('fs');
const minimist = require('minimist')

let argv = minimist(process.argv.slice(2));
console.log(argv);

//const source = fs.createReadStream('./logs/log_15.csv');
const source = process.stdin;

source.pipe(process.stdout);