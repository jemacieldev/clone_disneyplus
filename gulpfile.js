const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fs = require('fs');

async function styles() {
    return gulp.src('./src/styles/*.scss')
       .pipe(sass({ outputStyle: 'compressed' }))
       .pipe(gulp.dest('./dist/css'));
}

async function images() {
    const imagemin = (await import('gulp-imagemin')).default;
    if (fs.existsSync('./src/images')) {
        const files = await new Promise((resolve, reject) => {
            gulp.src('./src/images/**/*')
                .pipe(imagemin())
                .pipe(gulp.dest('./dist/images'))
                .on('end', resolve)
                .on('error', reject);
        });
        console.log('Images processed.');
    } else {
        console.log('No images directory found, skipping images task.');
    }
}

exports.default = gulp.parallel(styles, images);

exports.watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles));
}




