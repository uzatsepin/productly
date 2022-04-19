import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; //Сжатие
import webpcss from 'gulp-webpcss'; //Вывод webP
import autoprefixer from 'gulp-autoprefixer'; //Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; //группировка медиа запросов

const sass = gulpSass(dartSass)

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %"
            })
        ))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(groupCssMediaQueries())
        .pipe(app.plugins.ifPlugin(
            app.isBuild,
            webpcss({
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            })
        ))
        .pipe(app.plugins.ifPlugin(
            app.isBuild,
            autoprefixer({
                grid: true,
                overrideBrowsersList: ["last 3 versions"],
                cascade: true
            })
        ))
        //Раскомментировать если нужен сжатый дубль файла
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.ifPlugin(
            app.isBuild,
            cleanCss()
        ))
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}