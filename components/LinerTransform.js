'use strict';
const stream = require('stream');
const toMilliseconds = require('../utility/time').toMilliseconds;

class LinerTransform extends stream.Transform{
	constructor(opts, superOpt){
		// todo : merge superOpt with objectMode
		super({objectMode: true});
		this._time = process.hrtime();
		this._newLineChar = '\r\n';
		this._lastLineData = null;
	}
	_transform(chunk, nec, next){
		this._time = process.hrtime(this._time);
		let data = chunk.toString();
		if (this._lastLineData) data = this._lastLineData + data; // We pre-pend the last line from previous chunk

		let lines = data.split(this._newLineChar);
		this._lastLineData = lines.splice(lines.length - 1, 1)[0]; // We splice off the last line from current chunk

		this.push({
			elapsedTime: toMilliseconds(this._time),
			nrLines: lines.length,
			lines: lines
		});

		next();
	}
	_flush(done){
		if (this._lastLineData){
			let time = process.hrtime(this._time);
			this.push({
				elapsedTime: toMilliseconds(time),
				nrLines: 1,
				lines: [this._lastLineData]
			})
		}
		done();
	}
}

module.exports = LinerTransform;