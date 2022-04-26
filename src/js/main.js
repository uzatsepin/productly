import {Article} from "./modules/Article.js";
import {ArticleModal} from "./modules/ArticleModal.js";
import {Modal} from "./modules/Modal.js";
import {data} from "./data.js";

import Swiper from 'swiper';

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Пишем используя single responsibility principle js

window.onload = function () {
    // Render Articles
    if(data) {
        renderArticlesToDom();
    }
    //Tags
    addTagsClickHandler();
    //Generate Base Modal from Class
    addToolsClickHandler();
}

const addTagsClickHandler = () => {
    document.querySelector('.strategies__tags').addEventListener('click', (e) => {
        if (e.target.classList.contains('tag')) {   // проверяем нажали ли мы именно на tag
            let clickedTag = e.target // записываем в переменную, т.к. это более производительно, чем обращаться к ивенту
            removeSelectedTags() //убрали класс selected
            selectClickedTag(clickedTag) //добавили класс selected в нажатый тег
            if (clickedTag.innerText === 'All') {
                showAllStrategies()
            } else {
                filterStrategiesBySelectedTag(clickedTag.innerText)
            }
        }
    })
}

const removeSelectedTags = () => {
    let tags = document.querySelectorAll('.strategies__tags .tag')
    tags.forEach(tag => {
        tag.classList.remove('tag--selected')
        tag.classList.add('tag--bordered')  //можно было просто удалять selected
    })
}

const selectClickedTag = (clickedTag) => {
    clickedTag.classList.add('tag--selected')
    clickedTag.classList.remove('tag--bordered')
}

const showAllStrategies = () => {
    let strategies = document.querySelectorAll('.strategy__wrapper .strategy')
    strategies.forEach(strategy => {
        strategy.classList.remove('strategy__hidden')
    })
}

const filterStrategiesBySelectedTag = (selectedTag) => {
    let strategies = document.querySelectorAll('.strategy__wrapper .strategy')
    strategies.forEach(strategy => {
        strategy.classList.add('strategy__hidden');
        strategy.querySelectorAll('.tag').forEach(tag => {
            if(tag.innerText === selectedTag) {
                strategy.classList.remove('strategy__hidden')
            }
        })
    })
}

const renderArticlesToDom = () => {
    let strategiesWrapper = getStrategiesWrapper();
    generateArticles(data).forEach(article => {
        strategiesWrapper.append(article.generateArticle())
    })

    addStrategyClickHandler(); //добавляем, эдивентлистенер на каждый сгенерированный Article
}

const getStrategiesWrapper = () => {
    const strategiesContainer = document.querySelector('.strategy__wrapper');
    strategiesContainer.innerHTML = '';
    return strategiesContainer;
}

const generateArticles = (data) => {
    let articles = [];
    data.forEach(article => {
        articles.push(new Article(article))
    });
    return articles;
}

// для теста модалки вешаем обработчик на кнопку sing up Now
const addToolsClickHandler = () => {
    document.querySelector('.tools__link').addEventListener('click', () => {
        generateToolsModal();
    })
}

const generateToolsModal = () => {
    renderModalWindow('Test content for modal window')
}

const renderModalWindow = (content) => {   //общий метод для всех модалок
    let modal = new Modal ('tools-modal');
    modal.buildModal(content)
}

//Метод Element.closest() возвращает ближайший родительский эл. (или сам эл.), который соотв.
// заданному селектору или null, если эл.  нет.
const addStrategyClickHandler = () => {
    document.querySelector('.strategy__wrapper').addEventListener('click', (e) => {
        if (e.target.closest('.strategy')) {
            let clickedStrategyId = e.target.closest('.strategy').getAttribute('data-id');
            let clickedStrategyData = getClickedData(clickedStrategyId);
            renderArticleModalWindow(clickedStrategyData);
        }
    })
}

const getClickedData = (id) => {
    return data.find(article => article.id == id)
}

const renderArticleModalWindow = (article) => {
    let modal =  new ArticleModal ('article-modal', article);
    modal.renderModal();
}