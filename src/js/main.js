// import * as flsFunctions from './modules/functions.js';
// flsFunctions.isWebp();

import {strategiesItems} from "./strategies-items.js";


const strategyWrapper = document.querySelector('.strategy__wrapper');


strategiesItems.forEach(elem => {
    const {title, urlToImage, tags} = elem;
    let strategyTags = '';
    for(let i = 0; i < tags.length; i++) {
        strategyTags += `<span class="tag tag--filled" >${tags[i]}</span>`
    }
    const strategy = document.createElement('article');
    strategy.classList.add('strategy', 'block-shadowed')
    strategy.innerHTML = `
        <img class="strategy__img" src=${urlToImage} alt="strategy-img">
        <h4 class="strategy__title">${title}</h4>
        <div class="strategy__tags">${strategyTags}</div>
    `
    strategyWrapper.appendChild(strategy);
});
