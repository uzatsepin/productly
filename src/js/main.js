// import * as flsFunctions from './modules/functions.js';
// flsFunctions.isWebp();

// import {strategiesItems} from "./strategies-items.js";
//
// const strategyWrapper = document.querySelector('.strategy__wrapper');
//
// strategiesItems.forEach(elem => {
//     const {title, urlToImage, tags} = elem;
//     let strategyTags = '';
//     for(let i = 0; i < tags.length; i++) {
//         strategyTags += `<span class="tag tag--filled" >${tags[i]}</span>`
//     }
//     const strategy = document.createElement('article');
//     strategy.classList.add('strategy', 'block-shadowed')
//     strategy.innerHTML = `
//         <img class="strategy__img" src=${urlToImage} alt="strategy-img">
//         <h4 class="strategy__title">${title}</h4>
//         <div class="strategy__tags">${strategyTags}</div>
//     `
//     strategyWrapper.appendChild(strategy);
// });


window.onload = function () {
    addTagsClickHandler();
}

const addTagsClickHandler = () => {
    document.querySelector('.strategies__tags').addEventListener('click', (e) => {
        if(e.target.classList.contains('tag')) { //проверяем нажатие на тэг
            let clickedTag = e.target; //записываем в переменную значение
            removeSelectedTags(); //убрали класс selected
            selectClickedTag(clickedTag); //добавили класс selected в нажатый тэг
            if(clickedTag.innerText === 'All') {
                showAllStrategies();
            } else {
                filterStrategiesBySelected(clickedTag.innerText);
            }
        }
    })
}

const showAllStrategies = () => {
    let strategies = document.querySelectorAll('.strategy__wrapper .strategy');
    strategies.forEach(strategy => {
        strategy.classList.remove('strategy__hidden')
    })
}

const filterStrategiesBySelected = (selectedTag) => {
    let strategies = document.querySelectorAll('.strategy__wrapper .strategy');
    strategies.forEach(strategy => {
        strategy.classList.add('strategy__hidden');
        strategy.querySelectorAll('.tag').forEach(tag => {
            if(tag.innerText === selectedTag) {
                strategy.classList.remove('strategy__hidden')
            }
        })
    })
}

const removeSelectedTags = () => {
    let  tags = document.querySelectorAll('.strategies__tags .tag');
    tags.forEach(tag => {
        tag.classList.remove('tag--selected');
        tag.classList.add('tag--bordered')
    })
}

const selectClickedTag = (clickedTag) => {
    clickedTag.classList.add('tag--selected');
    clickedTag.classList.remove('tag--bordered');
}

const hamburderBtn = document.querySelector('.hamburger');

hamburderBtn.addEventListener('click', () => {
    document.querySelector('.menu__list').classList.toggle('menu__list-active');
})