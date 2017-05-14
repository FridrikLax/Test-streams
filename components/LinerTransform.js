'use strict';
const stream = require('stream');
const toMilliseconds = require('../utility/time').toMilliseconds;

class LinerTransform extends stream.Transform{
	constructor(){
		super({objectMode: true});
		this.time = process.hrtime();
		this.newLineChar = '\n';
	}
	_transform(chunk, nec, next){
		this.time = process.hrtime(this.time);
		const data = chunk.toString();
		const lines = data.split(this.newLineChar);

		this.push({
			elapsedTime: toMilliseconds(this.time),
			nrLines: lines.length,
			lines: lines
		});
//		this.push(chunk)

		next();
	}
	_flush(done){
		done();
	}
}

module.exports = LinerTransform;