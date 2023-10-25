export default class ImageSlider extends HTMLElement {
    private _slider: HTMLElement;
    private _slides: Array<HTMLElement>;
    private _isDragging: boolean = false;
    private _startPos: number = 0;
    private _currentTranslate: number = 0;
    private _prevTranslate: number = 0;
    private _animationId: number = 0;
    private _currentIndex: number = 0;

    constructor() {
        super();
        this._slider = this;
        this._slides = Array.from(this.querySelectorAll('.image-slide'));
    }

    private addEventListeners = (): void => {
        this._slides.forEach((slide, index) => {
            const slideImage = slide.querySelector('img')!;
            // disable default image drag
            slideImage.addEventListener('dragstart', (e) => e.preventDefault());
            // touch events 
            slide.addEventListener('touchstart', this.touchStart(index));
            slide.addEventListener('touchend', this.touchEnd);
            slide.addEventListener('touchmove', this.touchMove);
            // mouse events
            slide.addEventListener('mousedown', this.touchStart(index));
            slide.addEventListener('mouseup', this.touchEnd);
            slide.addEventListener('mousemove', this.touchMove);
            slide.addEventListener('mouseleave', this.touchEnd);

            this.calculateSlideWidth(slide);
        });

        window.addEventListener('resize', this.handleResize);

        this.classList.remove('loading');
    }

    private handleResize = (): void => {
        this._slides.forEach((slide) => {
            this.calculateSlideWidth(slide);
        });
    }

    private calculateSlideWidth = (slide: HTMLElement): void => {
        slide.style.minWidth = `${this.clientWidth}px`;
    }

    private getPositionX = (event: MouseEvent | TouchEvent) => {
        // @ts-ignore
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    // use a HOF so we have index in a closure
    private touchStart = (index: number) => {
        return (event: TouchEvent | MouseEvent) => {
            this._currentIndex = index;
            this._startPos = this.getPositionX(event);
            this._isDragging = true;
            this._animationId = requestAnimationFrame(this.animation);
            this._slider.classList.add('grabbing');
        }
    }

    private touchMove = (event: TouchEvent | MouseEvent) => {
        if (this._isDragging) {
            const currentPosition = this.getPositionX(event);
            this._currentTranslate = this._prevTranslate + currentPosition - this._startPos;
        }
    }

    private touchEnd = () => {
        cancelAnimationFrame(this._animationId);
        this._isDragging = false;
        const movedBy = this._currentTranslate - this._prevTranslate;
        const quarterOfSlideWidth = this._slides[0].offsetWidth * .25;

        // if moved enough negative then snap to next slide if there is one
        if (movedBy < -quarterOfSlideWidth && this._currentIndex < this._slides.length - 1) {
            this._currentIndex++;
        }

        // if moved enough positive then snap to previous slide if there is one
        if (movedBy > quarterOfSlideWidth && this._currentIndex > 0) {
            this._currentIndex--;
        }

        this.setPositionByIndex();

        this._slider.classList.remove('grabbing');
    }

    private animation = () => {
        this.setSliderPosition();
        if (this._isDragging) requestAnimationFrame(this.animation);
    }

    private setPositionByIndex = () => {
        this._currentTranslate = this._currentIndex * -this._slides[0].offsetWidth;
        this._prevTranslate = this._currentTranslate;
        this.setSliderPosition();
    }

    private setSliderPosition = () => {
        this._slider.style.transform = `translateX(${this._currentTranslate}px)`;
    }

    connectedCallback() {
        this.addEventListeners();
        window.addEventListener('resize', this.setPositionByIndex);
        window.oncontextmenu = (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }
}
