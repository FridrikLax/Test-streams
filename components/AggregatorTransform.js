'use strict';


class Aggregator extends Stream.Transform {
	constructor () {

	}

	_transform ( chunk, enc, next ) {
		next();
	}

	_flush ( done ) {
		done();
	}


}

module.exports = Aggregator;



