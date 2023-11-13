const {
    src,
    dest,
    watch
} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

function styles() {
    return src('app/scss/style.scss')
        .pipe(concat('style.min.css'))
        .pipe(scss({
            outputStyle: 'compressed'
        })) // call scss const + compression
        .pipe(dest('app/css'))
}

function scripts() {
    return src('app/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
}

function watching() {
    watch(['app/scss/style.scss'], styles) //chsnce in brakets - starts after comma 
    watch(['app/js/main.js'], scripts)
}



exports.styles = styles; //.gulp command = function
exports.scripts = scripts;
exports.watching = watching;