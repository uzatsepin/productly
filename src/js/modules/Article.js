export class Article {
    constructor({id,title,urlToImage,tags, ...rest}) {
        this.id = id;
        this.title = title;
        this.urlToImage = urlToImage;
        this.tags = tags;
    }
    //Article generator(фабрика) суть использования модулей, в реюзабельности(в нашем случае будетпереиспользоваться для модалки)
    generateArticle() {
        let template = '';
        let article = document.createElement('article');
        article.className = 'strategy block-shadowed';
        article.setAttribute('data-id', this.id); // для того хэндлить по какому id кликнули

        this.urlToImage &&
        (template += `<img class="strategy__image" src=${this.urlToImage} alt="strategy">`)

        if(this.title || this.tags) { // проверка передаются ли нам данные, для дива контент
            template += `<div class="strategy__content">`

            this.title &&
            (template += `<h3 class="strategy__name">${this.title}</h3>`)

            if(this.tags) {
                template += `<div class="strategy__tags tags">`

                this.tags.map(tag => { // map идеален для рендеренкга, данных в массиве(как и в реакте)
                    template += `<span class="tag tag--colored">${tag}</span>`
                })

                template += `</div>`
            }

            template += `</div>`
        }

        article.innerHTML = template;
        return article;
    }
}