'use strict';
const fs = require('fs');
const stream = require('stream');
const minimist = require('minimist');

let argv = minimist(process.argv.slice(2));
console.log(argv);

const source = fs.createReadStream('./logs/log_15.csv');
//const source = process.stdin;

//source.pipe(process.stdout);

class LinerTransform extends stream.Transform{
	constructor(){
		super()
	}
	_transform(chunk, nec, next){
		this.push(chunk);
		next();
	}
	_flush(done){
		done();
	}
}

const liner = new LinerTransform();

source.pipe(liner).pipe(process.stdout);