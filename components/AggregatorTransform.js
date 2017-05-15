'use strict';
const stream = require('stream');
const {toMilliseconds} = require('../utility/time');
const numeral = require('numeral');


class Aggregator extends stream.Transform {
	constructor (options) {
		options = options || {};

		super({objectMode: true});
		this._startTime = null;
		this._nrBytes = 0;
		this._nrChunks = 0;
		this._verbose = options.verbose;
	}

	_transform ( chunk, enc, next ) {
		if(this._startTime === null) this._startTime = process.hrtime();
		this._nrChunks += 1;
		this._nrBytes += chunk.nrBytes;
		if(this._verbose) console.log(chunk);
		next();
	}

	_flush ( done ) {
		let diff = process.hrtime(this._startTime);
		const time = toMilliseconds(diff);
		const throughput = this._nrBytes / (1024 * time);
		const summary = 'Throughput: ' + numeral(throughput).format('0,0.00') + ' kB/ms \n';
		this.push(summary);
		done();
	}


}

module.exports = Aggregator;



