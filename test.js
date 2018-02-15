/* global describe,it */

'use strict';

const strictEqual = require('assert').strictEqual;
const fs = require('fs');
const concatStream = require('concat-stream');
const Vinyl = require('vinyl');
const gulpRmlines = require('.');

describe('gulpRmlines', () => {
	it('pipes correctly when file.contents is a buffer', done => {
		const expected = 'abc\njkl\nmno\n';
		const stream = gulpRmlines([2, 3]);
		stream.on('data', file => {
			strictEqual(file.contents.toString(), expected);
			done();
		});
		stream.write(new Vinyl({
			cwd: './',
			base: '/',
			path: '/fixture.txt',
			contents: fs.readFileSync('fixture.txt')
		}));
		stream.end();
	});

	it('pipes correctly when file.contents is a stream', done => {
		const expected = 'abc\njkl\nmno\n';
		const stream = gulpRmlines([2, 3]);
		stream.on('data', file => {
			file.contents.pipe(concatStream(data => {
				strictEqual(data.toString(), expected);
				done();
			}));
		});
		stream.write(new Vinyl({
			cwd: './',
			base: '/',
			path: '/fixture.txt',
			contents: fs.createReadStream('fixture.txt')
		}));
		stream.end();
	});

	it('pipes correctly when file.contents is null', done => {
		const stream = gulpRmlines([2, 3]);
		stream.on('data', file => {
			strictEqual(file.contents, null);
			done();
		});
		stream.write(new Vinyl({}));
		stream.end();
	});

	it('pipes correctly when file.contents is something else', done => {
		const expected = 'abc';
		const stream = gulpRmlines([2, 3]);
		stream.on('data', file => {
			strictEqual(file.contents.toString(), expected);
			done();
		});
		const v = {
			contents: 'abc',
			isNull: () => {
				return false;
			},
			isBuffer: () => {
				return false;
			},
			isStream: () => {
				return false;
			}
		};
		stream.write(v);
		stream.end();
	});

	it('handles options', done => {
		const expected = 'abc\ndef\njkl\nmno\n';
		const stream = gulpRmlines(3, {maxLength: 30});
		stream.on('data', file => {
			file.contents.pipe(concatStream(data => {
				strictEqual(data.toString(), expected);
				done();
			}));
		});
		stream.write(new Vinyl({
			cwd: './',
			base: '/',
			path: '/fixture.txt',
			contents: fs.createReadStream('fixture.txt')
		}));
		stream.end();
	});

	it('handles no line numbers', done => {
		const expected = 'abc\ndef\nghi\njkl\nmno\n';
		const stream = gulpRmlines();
		stream.on('data', file => {
			file.contents.pipe(concatStream(data => {
				strictEqual(data.toString(), expected);
				done();
			}));
		});
		stream.write(new Vinyl({
			cwd: './',
			base: '/',
			path: '/fixture.txt',
			contents: fs.createReadStream('fixture.txt')
		}));
		stream.end();
	});
});
