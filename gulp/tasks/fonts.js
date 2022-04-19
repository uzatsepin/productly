import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    //ищем файлы шрифтов otf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ['woff']
        }))
        //Выгружаем в папку с результатом
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        //Ищем шрифты ttf
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        //конвертируем в woff2
        .pipe(ttf2woff2())
        //Выгружаем в папку с результатом
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}