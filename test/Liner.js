'use strict';
const LinerTransform = require('../components/LinerTransform');
const fs = require('fs');
var assert = require('chai').assert;;


describe('Liner', () => {
	let liner;

	beforeEach(() => {
		liner = new LinerTransform();
	});
	afterEach(() => {

	});

	it('the total size of the packages should equal the size of the original file (after accounting for missing newline characters)', ( done ) => {

		const source = fs.createReadStream('./logs/log_238.csv');
		const stats = fs.statSync('./logs/log_238.csv');
		let stream = source.pipe(liner);

		let totalBytes = 0;

		stream.on('readable', function () {
			let line;
			while ( null !== (line = liner.read()) ) {
				totalBytes += line.nrBytes;
			}
		});

		stream.on('end', ()=> {
			const nrNewLineChar = 238-1;
			const expectedSize = stats.size - (nrNewLineChar * 2);

			assert.equal(totalBytes, expectedSize);
			done();
		});
	});
	it('should emit an error if....');
	it('should handle different newLine characters - this case \\r\\n', ( done ) => {
		const source = fs.createReadStream('./logs/log_full.csv'); // uses \r\n
		let stream = source.pipe(liner);

		let totalLines = 0;

		stream.on('readable', function () {
			let line;
			while ( null !== (line = liner.read()) ) {
				totalLines += line.nrLines;
			}
		});

		stream.on('end', ()=> {
			assert.equal(totalLines, 9946);
			done();
		});
	});
	it('should return the correct number of lines', ( done ) => {
		const source = fs.createReadStream('./logs/log_238.csv');
		let stream = source.pipe(liner);

		let totalLines = 0;

		stream.on('readable', function () {
			let line;
			while ( null !== (line = liner.read()) ) {
				totalLines += line.nrLines;
			}
		});

		stream.on('end', ()=> {
			assert.equal(totalLines, 238);
			done();
		});
	});
	it('should never return an object with zero lines', ( done ) => {
		const source = fs.createReadStream('./logs/log_238.csv');
		let stream = source.pipe(liner);

		stream.on('readable', function () {
			let line;
			while ( null !== (line = liner.read()) ) {
				assert.notEqual(line.nrLines, 0);
			}
		});
		stream.on('end', ()=> {
			done();
		});
	})

});