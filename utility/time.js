'use strict';

/**
 *
 * @param timeArray - high-resolution time in [seconds, nanoseconds] tuple Array
 * @returns {number} - the time in milliseconds
 */
function toMilliseconds(timeArray){
	return (timeArray[0] * 1e3) + (timeArray[1]/1e6);
}

module.exports = {
	toMilliseconds: toMilliseconds
};