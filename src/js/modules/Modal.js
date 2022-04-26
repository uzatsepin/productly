// Если писать модалку под наш контент, это будет не универсально. Универсальным подходом будет
// сделать модалку которая генерирует сама себя у которой есть встроенные методы, умеет открываться, закрываться.
// В кот. мы просто передаем хэндлер , ивэнт хэндлер и даем команду открыться, а всю внутренню кухню, как она должна
// закрыться мы прописываем.Покажу как работает наследование(т.е модалку можно будет привязать к любому элементу на сайте)

export class Modal {
    constructor(classes) {
        this.classes = classes;
        this.modal = ''; // параметры которые мы не будем передавать, будем их генерировать с помощью buildModal(content)
        this.modalContent ='';
        this.modalCloseBtn ='';
        this.overlay ='';
    }

    buildModal(content) {
        //Overlay
        // this.overlay = document.createElement('element');
        // this.overlay.classList.add('overlay')
        // чтобы не дублировать код вынесем это в метод createDomNode
        this.overlay = this.createDomNode(this.overlay,'div','overlay','overlay--modal')

        //Modal
        this.modal = this.createDomNode(this.modal,'div','modal',this.classes);

        //Modal content
        this.modalContent = this.createDomNode(this.modalContent,'div','modal__content');

        //Close button
        this.modalCloseBtn = this.createDomNode(this.modalCloseBtn,'span','modal__close-icon');
        this.modalCloseBtn.innerHTML = '<svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M12.4239 10.5172L20.6009 2.33999C21.1331 1.80809 21.1331 0.948089 20.6009 0.416194C20.069 -0.115701 19.209 -0.115701 18.6771 0.416194L10.4999 8.59343L2.3229 0.416194C1.79076 -0.115701 0.931004 -0.115701 0.399108 0.416194C-0.133036 0.948089 -0.133036 1.80809 0.399108 2.33999L8.5761 10.5172L0.399108 18.6945C-0.133036 19.2263 -0.133036 20.0863 0.399108 20.6182C0.664184 20.8836 1.01272 21.0169 1.361 21.0169C1.70929 21.0169 2.05758 20.8836 2.3229 20.6182L10.4999 12.441L18.6771 20.6182C18.9425 20.8836 19.2907 21.0169 19.639 21.0169C19.9873 21.0169 20.3356 20.8836 20.6009 20.6182C21.1331 20.0863 21.1331 19.2263 20.6009 18.6945L12.4239 10.5172Z" fill="#2F281E"/>\n' +
            '</svg>\n'

        this.setContent(content);

        this.appendModalElements();

        //Bind Events
        this.bindEvents();
        //Open modal
        this.openModal();
    }
    createDomNode(node,element,...classes){
        node = document.createElement(element);
        node.classList.add(...classes);
        return node
    }

    setContent(content) {
        if(typeof content === 'string') {
            this.modalContent.innerHTML = content;
        } else {
            this.modalContent.innerHTML = '';
            this.modalContent.append(content);
        }
    }

    appendModalElements() {
        this.modal.append(this.modalCloseBtn);
        this.modal.append(this.modalContent);
        this.overlay.append(this.modal);
    }

    bindEvents() {
        this.modalCloseBtn.addEventListener('click', this.closeModal);
        this.overlay.addEventListener('click', this.closeModal);
    }

    openModal() {
        document.body.append(this.overlay);
    }

    closeModal(e) {
        let classes = e.target.classList;
        //чтобы при баблинге не закрывалась модалка(при клике по модалке)
        if(classes.contains('overlay') || classes.contains('modal__close-icon')) {
            document.querySelector('.overlay').remove();
        }
    }
}