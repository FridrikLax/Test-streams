'use strict';
const stream = require('stream');
const toMilliseconds = require('../utility/time').toMilliseconds;
const numeral = require('numeral');


class Aggregator extends stream.Transform {
	constructor () {
		super({objectMode: true});
		this.startTime = null;
		this.nrBytes = 0;
		this.nrChunks = 0;
	}

	_transform ( chunk, enc, next ) {
		if(this.startTime === null) this.startTime = process.hrtime();

		this.nrChunks += 1;
		this.nrBytes += chunk.nrBytes;
		next();
	}

	_flush ( done ) {
		let diff = process.hrtime(this.startTime);
		const time = toMilliseconds(diff);
		const throughput = this.nrBytes / (1024 * time);

		const summary = 'Throughput: ' + numeral(throughput).format('0,0.00') + ' kB/ms \n';
		this.push(summary);
		done();
	}


}

module.exports = Aggregator;



