// import * as flsFunctions from './modules/functions.js';
// flsFunctions.isWebp();

import {data} from "./data.js";
import {Article} from "./modules/Article.js";
import {Modal} from "./modules/Modal.js";
import {ArticleModal} from "./modules/ArticleModal.js";

window.onload = function () {
    //Render Articles
    if(data) {
        renderArticlesToDom();
    }
    //Tags
    addTagsClickHandler();
    addToolsClickHanlder();
}

const generateArticles = (data) => {
    let articles = [];
    data.forEach(article => {
        articles.push(new Article(article))
    });
    return articles;
}

const getStrategiesWrapper = () => {
    return document.querySelector('.strategy__wrapper');
}

const renderArticlesToDom = () => {
    let strategiesWrapper = getStrategiesWrapper();
    generateArticles(data).forEach(article => {
        strategiesWrapper.append(article.generateArticle())
    })
    addStrategyClickHandler();
}

const addToolsClickHandler = () => {
    document.querySelector('.tools__link').addEventListener('click', () => {
        generateToolsModal();
    })
}

const generateToolsModal = () => {
    renderModalWindow('Test content for modal window');
}

const renderModalWindow = (content) => {
    let modal = new Modal('tools-modal');
    modal.buildModal(content);
}

const addStrategyClickHandler = () => {
    document.querySelector('.strategy__wrapper').addEventListener('click', (e) => {
        if(e.target.closest('.strategy')) {
            let clickedStrategyId = e.target.closest('.strategy').getAttribute('data-id');
            let clickedStrategyData = getClickedData(clickedStrategyId);
            renderArticleModalWindow(clickedStrategyData)
        }
    })
}

const getClickedData = (id) => {
    return data.find(article => article.id === id);
}

const renderArticleModalWindow = (article) => {
    let modal = new ArticleModal('article-modal', article);
    modal.renderModal();
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
