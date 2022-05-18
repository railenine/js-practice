export default class ShowInfo {
    constructor(btns) {
        this.btns = document.querySelectorAll(btns);
    }

    openContent() {
        this.btns.forEach(btn => {
            let check = false;
            btn.addEventListener('click', () => {
                if (!check) {
                    btn.parentNode.nextElementSibling.classList.add('animated', 'fadeInDown');
                    btn.parentNode.nextElementSibling.style.display = 'block';
                    check = true;
                } else {
                    btn.parentNode.nextElementSibling.style.display = 'none';
                    check = false;
                }

                //const sibling = btn.closest('.module__info-show').nextElementSibling;
                //sibling.classList.toggle('msg');
                //sibling.style.marginTop = '20px';
            });
        });
    }

    init() {
        this.openContent();
    }
}