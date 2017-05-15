'use strict';
const stream = require('stream');
const toMilliseconds = require('../utility/time').toMilliseconds;

class LinerTransform extends stream.Transform {
	constructor ( opts, superOpt ) {
		// todo : merge superOpt with objectMode
		super({ objectMode: true });
		this._time = null;
		this._newLineRegex = /[^\r\n]+/g;
		this._lastLineData = null;
	}

	_countBytes ( lines ) {
		return lines.reduce(( total, line ) => {
			return total + Buffer.byteLength(line, 'utf-8');
		}, 0);
	}

	// todo : check assumptions for time
	_updateTime () {
		let diff = process.hrtime(this._time);
		this._time = process.hrtime();
		return diff
	}

	_transform ( chunk, nec, next ) {
		if ( !this._time ) this._time = process.hrtime();
		let data = chunk.toString();
		if ( this._lastLineData ) data = this._lastLineData + data; // We pre-pend the last line from previous chunk

		let lines = data.match(this._newLineRegex);
		this._lastLineData = (lines.length > 1) ? lines.splice(lines.length - 1, 1)[0] : null; // We splice off the last line from current chunk if there is more than one line

		this.push({
			elapsedTime: toMilliseconds(this._updateTime()),
			nrLines: lines.length,
			lines: lines,
			nrBytes: this._countBytes(lines)
		});

		next();
	}

	_flush ( done ) {
		if ( this._lastLineData ) {
			let time = process.hrtime(this._time);
			this.push({
				elapsedTime: toMilliseconds(time),
				nrLines: 1,
				lines: [this._lastLineData],
				nrBytes: this._countBytes([this._lastLineData])
			})
		}
		done();
	}
}

module.exports = LinerTransform;