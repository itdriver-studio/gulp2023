const {
    src,
    dest
} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

function styles() {
    return src('app/scss/style.scss')
        .pipe(concat('style.min.css'))
        .pipe(scss({
            outputStyle: 'compressed'
        })) // call scss const + compression
        .pipe(dest('app/css'))
}

exports.styles = styles;
exports.styles = styles;