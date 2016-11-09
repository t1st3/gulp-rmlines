'use strict';

const concatStream = require('concat-stream');
const rmlines = require('rmlines');
const intoStream = require('into-stream');
const through = require('through2');

const self = {};

const transfromStream = function (file, enc, cb) {
	if (file.isNull()) {
		return cb(null, file);
	}

	if (file.isBuffer()) {
		const stream = intoStream(file.contents);
		stream.pipe(rmlines(self.lines, self.opts)).pipe(concatStream(data => {
			file.contents = new Buffer(data);
			cb(null, file);
		}));
		return;
	}

	if (file.isStream()) {
		file.contents = file.contents.pipe(rmlines(self.lines, self.opts));
		return cb(null, file);
	}

	return cb(null, file);
};

const endStream = function (cb) {
	cb();
};

module.exports = function (lines, opts) {
	self.lines = (lines) ? lines : [];
	self.opts = (opts) ? opts : {};
	return through.obj(transfromStream, endStream);
};
