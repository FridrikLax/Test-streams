'use strict';
const assert = require('assert');
const LinerTransform = require('../components/LinerTransform');
const fs = require('fs');

describe('Liner', () => {
	let liner;

	beforeEach( () => {
		liner = new LinerTransform();
	});
	afterEach( () => {

	});

	it('should emit an error if....');
	it('should handle different newLine characters');
	it('should return the correct number of lines', (done) => {
		const source = fs.createReadStream('./logs/log_238.csv');
		let stream  = source.pipe(liner);

		let totalLines = 0;

		stream.on('readable', function () {
			let line;
			while (null !== (line = liner.read())) {
				totalLines += line.nrLines;
			}
		});

		stream.on('end', ()=>{
			assert.equal(totalLines, 238);
			done();
		});
	});
});