const {
    src,
    dest,
    watch,
    parallel
} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function styles() {
    return src(
            'app/scss/style.scss'
        )
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version']
        }))
        .pipe(concat('style.min.css'))
        .pipe(scss({
            outputStyle: 'compressed'
        })) // call scss const + compression
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
            'app/js/*.js',
            '!app/js/main.min.js'
        ])

        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['app/scss/style.scss'], styles) //chsnce in brakets - starts after comma 
    watch(['app/js/main.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload)
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}



exports.styles = styles; //.gulp command = function
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(styles, scripts, browsersync, watching);