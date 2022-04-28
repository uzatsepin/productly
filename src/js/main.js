import {Article} from "./modules/Article.js";
import {ArticleModal} from "./modules/ArticleModal.js";
import {Modal} from "./modules/Modal.js";
import {data, dataUa} from "./data.js";

import {langArr, i18Obj} from "./languages.js";

import tippy from 'tippy.js';

import Swiper, {Pagination} from 'swiper';

const swiper = new Swiper('.swiper', {
    modules: [Pagination],
    centeredSlides: true,
    spaceBetween: 60,
    centeredSlidesBounds: true,
    direction: 'horizontal',
    loop: false,
    pagination: {
        el: '.about__dots',
        type: 'bullets',
        bulletClass: 'dot',
        bulletActiveClass: 'dot--active',
        bulletElement: 'div',
        clickable: true,
    },
    breakpoints: {
        1366: {
            enabled: false,
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        600: {
            slidesPerView: 1.5,
        },
        375: {
            slidesPerView: 1,
            enabled: true,
        }
    },
});

tippy('.contact__form-name', {
  content: "Enter Your Name",
  trigger: 'focus',
  duration: 500,
  animation: 'fade',
});
tippy('.contact__form-email', {
  content: "Enter Your Email",
  trigger: 'focus',
  duration: 500,
  animation: 'fade',
});
tippy('.contact__form-textarea', {
  content: "Please, enter your question",
  trigger: 'focus',
  duration: 500,
  animation: 'fade',
});

const select = document.querySelector('select');

function dataSelect() {
  if(select.value === 'ua') {
    return dataUa;
  } else {
    return data;
  }
}

dataSelect()

// Пишем используя single responsibility principle js

window.onload = function () {
    // Render Articles
    if(dataSelect()) {
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
    generateArticles(dataSelect()).forEach(article => {
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
    return dataSelect().find(article => article.id == id)
}

const renderArticleModalWindow = (article) => {
    let modal =  new ArticleModal ('article-modal', article);
    modal.renderModal();
}


select.addEventListener('change', changeUrlLanguage);
const allLang = ['en', 'ua']

function changeUrlLanguage() {
  let lang = select.value;
  location.href = window.location.pathname + '#' + lang;
  location.reload();
}

function changeLanguage() {
  let hash = window.location.hash;
  hash = hash.substring(1);
  if(!allLang.includes(hash)) {
    location.href = window.location.pathname + '#ua';
    location.reload();
  }
  select.value = hash;
  document.querySelector('title').innerHTML = langArr['title'][hash];
  for(let key in langArr) {
    document.querySelectorAll('.menu__list-link').innerHTML = langArr[key][hash];
  }
}
changeLanguage()

function getTranslate() {
  let elemsForTranslate = [...document.querySelectorAll('[data-lng]')];
  let lang = select.value;
  let formTranslate = document.querySelectorAll('input');
  let textarea = document.querySelector('.contact__form-textarea');

  if(lang === 'ua') {
    textarea.placeholder = i18Obj['ua']['input-ask'];
  } else if (lang === 'en') {
    textarea.placeholder = i18Obj['en']['input-ask'];
  }

      elemsForTranslate.forEach((el) => {
        el.textContent = i18Obj[lang][el.dataset.lng]
      });

      formTranslate.forEach((el) => {
        el.placeholder = i18Obj[lang][el.dataset.lng];
      })

  }

getTranslate();

