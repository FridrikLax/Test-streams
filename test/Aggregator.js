'use strict';
//const assert = require('assert');
const AggregatorTransform = require('../components/AggregatorTransform');
const LinerTransform = require('../components/LinerTransform');
const fs = require('fs');
var assert = require('chai').assert;;

describe('Aggregator', () => {

	// todo : mock dependency on LinerTransform
	it('the total size of the packages should equal the size of the original file, after accounting for missing newline characters', ( done ) => {
		let liner = new LinerTransform();
		let aggregator = new AggregatorTransform();


		const source = fs.createReadStream('./logs/log_238.csv');
		const stats = fs.statSync('./logs/log_238.csv');
		let stream = source.pipe(liner).pipe(aggregator);

		let totalBytes = 0;

		stream = stream;

		stream.on('readable', function () {
			console.log('inside readable');
			let obj;
			while ( null !== (obj = aggregator.read()) ) {
			}
		});

		stream.on('end', ()=> {
			const nrNewLineChar = 238-1;
			const expectedSize = stats.size - (nrNewLineChar * 2);

			assert.equal(aggregator._nrBytes, expectedSize);
			done();
		});

	});

	// todo : mock dependency on LinerTransform
	it('should return a string', ( done ) => {
		let liner = new LinerTransform();
		let aggregator = new AggregatorTransform();

		const source = fs.createReadStream('./logs/log_238.csv');
		let stream = source.pipe(liner).pipe(aggregator);

		stream = stream;

		stream.on('readable', function () {
			console.log('inside readable');
			let result;
			while ( null !== (result = aggregator.read()) ) {
				assert.isString(result);
			}
		});

		stream.on('end', ()=> {
			done();
		});
	})
});