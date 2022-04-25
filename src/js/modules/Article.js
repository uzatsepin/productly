export class Article {
    constructor({id, title, urlToImage, tags}) {
    this.id = id;
    this.title = title;
    this.urlToImage = urlToImage;
    this.tags = tags;
    }
    generateArticle() {
        let template = '';
        let article = document.createElement('article');
        article.className = 'strategy block-shadowed';
        article.setAttribute('data-id', this.id);

        this.urlToImage && (template += `<img class="strategy__img" src=${this.urlToImage} alt="strategy">`)

        if(this.title || this.tags) {
            template += `<div class="strategy__content">`

            this.title && (template += `<h4 class="strategy__title">${this.title}</h4>`)

            if(this.tags) {
                template += `<div class="strategy__tags tags">`

                this.tags.map(tag => {
                    template += `<span class="tag tag--filled">${tag}</span>`
                })
            template += `</div>`
            }
            template += `</div>`
        }
        article.innerText = template;
        return article;
    }
}