# gulp-rmlines [![Build Status Travis](https://travis-ci.org/t1st3/gulp-rmlines.svg?branch=master)](https://travis-ci.org/t1st3/gulp-rmlines) [![codecov](https://codecov.io/gh/t1st3/gulp-rmlines/badge.svg?branch=master)](https://codecov.io/gh/t1st3/gulp-rmlines?branch=master)

> A line-remover plugin for [`gulp`](http://gulpjs.com/)

Thin wrapper around [`rmlines`](https://github.com/t1st3/rmlines) to make it a gulp plugin.

Also available as a [Grunt](https://github.com/t1st3/grunt-rmlines) plugin.


## Install

```
$ npm install --save gulp-rmlines
```


## Usage

```js
const gulp = require('gulp');
const muxml = require('gulp-rmlines');

gulp.task('default', () => {
    return gulp.src('src/example.txt')
        .pipe(rmlines([4, 61, 729])
        .pipe(gulp.dest('dist'));
});
```


## API

Supports [streaming mode](https://github.com/gulpjs/gulp/blob/master/docs/API.md#optionsbuffer).

### gulpRmlines(lines, [options])

#### lines

Type: `integer|array`

The number(s) of the line(s) that must be removed.

#### options

Type: `object`<br>
See [`rmlines`'s options](https://github.com/t1st3/rmlines#options), which are all supported.


## Related

* [rmlines](https://github.com/t1st3/rmlines) | API for rmlines
* [rmlines-cli](https://github.com/t1st3/rmlines-cli) | CLI for rmlines
* [gulp-rmlines](https://github.com/t1st3/grunt-rmlines) | rmlines as a [`Grunt`](http://gruntjs.com/) plugin


## License

MIT © [t1st3](https://t1st3.com)
