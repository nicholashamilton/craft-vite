import Swiper, { Pagination, } from 'swiper';

export default class SwiperCardSlider extends HTMLElement {
    private _swiper: Swiper;

    constructor() {
        super();
    }

    private initSwiper = () => {
        this._swiper = new Swiper(this, {
            centeredSlides: false,
            pagination: {
                el: '.pagination',
                clickable: true,
            },
            spaceBetween: 16,
            slidesPerView: 1,
            breakpoints: {
                500: {
                    slidesPerView: 2,
                },
                775: {
                    slidesPerView: 3,
                },
            },
        });
    }

    connectedCallback() {
        Swiper.use([Pagination]);
        this.initSwiper();
    }
}