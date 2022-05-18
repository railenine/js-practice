import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    moveBtns() {
        this.slides.forEach((slide, i) => {
            if (slide.tagName === "BUTTON") {
                this.container.appendChild(this.slides[i]);
            }
        });
    }

    nextSlide() {
        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();
        this.moveBtns();
    }

    autoplayStoppedStarted() {
        let auto = setInterval(() => {
            this.nextSlide();
        }, 5000);

        this.slides[0].parentNode.addEventListener('mouseenter', () => {
            clearInterval(auto);
        });

        this.next.forEach(item => {
            item.addEventListener('mouseenter', () => {
                clearInterval(auto);
            });
        });

        this.prev.forEach(item => {
            item.addEventListener('mouseenter', () => {
                clearInterval(auto);
            });
        });
    }

    bindTriggers() {
        this.next.forEach(item => {
            item.addEventListener('click', () => {
                this.nextSlide();
            });
        });

        this.prev.forEach(item => {
            item.addEventListener('click', () => {
                let active;
    
                if (this.slides[this.slides.length - 1].tagName == 'BUTTON') {
                    active = this.slides[this.slides.length - 3];
                } else {
                    active = this.slides[this.slides.length - 1];
                }
    
                this.container.insertBefore(active, this.slides[0]);
                this.decorizeSlides();
            }); 
        });
    }

    init() {
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();

            if (this.autoplay) {
                this.autoplayStoppedStarted();

                this.slides[0].parentNode.addEventListener('mouseleave', () => {
                    this.autoplayStoppedStarted();
                });

                this.next.forEach(item => {
                    item.addEventListener('mouseleave', () => {
                        this.autoplayStoppedStarted();
                    });
                });

                this.prev.forEach(item => {
                    item.addEventListener('mouseleave', () => {
                        this.autoplayStoppedStarted();
                    });
                });
            }
        } catch(e) {}
    }
}