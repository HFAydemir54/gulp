const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");

gulp.task("browser-sync", () => {
    browserSync.init({
        notify: true,
        server: {
            baseDir: "./",
        },
    });
});
gulp.task("watch", function() {
    gulp.watch("./*.scss", gulp.series("sass"));
    gulp.watch("./*.html").on("change", browserSync.reload);
});
gulp.task("sass", function() {
    return gulp
        .src("./*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(concat("all.css"))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("./assets/css/"))
        .pipe(browserSync.stream());
});
exports.default = gulp.parallel("browser-sync", "watch");