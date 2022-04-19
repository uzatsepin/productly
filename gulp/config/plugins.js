import replace from 'gulp-replace';  //Find and replace
import plumber from 'gulp-plumber'; //Errors
import notify from 'gulp-notify'; //Notification erros
import browsersync from 'browser-sync';
import newer from 'gulp-newer'; //Проверка обновлений картинок
import ifPlugin from 'gulp-if' //Условное ветвление

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    ifPlugin: ifPlugin,
}