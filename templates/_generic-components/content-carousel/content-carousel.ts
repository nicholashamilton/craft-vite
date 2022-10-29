export default class ContentCarousel extends HTMLElement {
    private _carouselSlides: Array<HTMLElement>;
    private _currentSlideIndex: number = 0;
    private _carouselControls: Array<HTMLButtonElement>;
    private _carouselContainer: HTMLElement;
    private _isTransitioning: boolean = false;

    // Auto Timer
    private _isTimerPaused: boolean = false;
    private _callback: Function;
    private _timer: number;
    private _time: number;
    private _slideDuration: number = 6; // seconds

    // Swipe Gestures
    private _swipeThreshold: number = 28; //required min distance traveled to be considered swipe
    private _swipeRestraint: number = 200; // maximum distance allowed at the same time in perpendicular direction
    private _allowedSwipeTime: number = 2500; // ms
    private _swipeCounter: number;
    private _swipeStartX: number;
    private _swipeStartY: number;
    private _swipeStartTime: number;
    private _isMouseDown: boolean;

    constructor() {
        super();
        this._carouselSlides = Array.from(this.querySelectorAll("carousel-slide"));
        this._carouselControls = Array.from(this.querySelectorAll("button.control"));
        this._carouselContainer = this.querySelector('carousel-container');
    }

    private handleControlClick: EventListener = (e: Event): void => {
        if (this._isTransitioning) return;
        if (!this._isTimerPaused) this._isTimerPaused = true;
        this._isTransitioning = true;
        const controlButton = e.currentTarget as HTMLButtonElement;
        const prevSlideIndex: number = this._currentSlideIndex;

        const direction: number = parseInt(controlButton.getAttribute("control-direction"));
        let newSlideIndex: number = prevSlideIndex + direction;
        if (newSlideIndex < 0) {
            newSlideIndex = this._carouselSlides.length - 1;
        } else if (newSlideIndex > this._carouselSlides.length - 1) {
            newSlideIndex = 0;
        }

        if (prevSlideIndex === newSlideIndex) {
            return;
        }

        this._currentSlideIndex = newSlideIndex;

        this.transitionSlides(prevSlideIndex, newSlideIndex, direction);
    };

    private transitionSlides = (prevSlideIndex: number, newSlideIndex: number, direction: number): void => {
        // Position new slide to transition in
        this._carouselSlides[newSlideIndex].style.transform = `translate3d(${100 * direction}%, 0, 0)`;
        this._carouselSlides[newSlideIndex].style.display = "flex";
        // Trigger css reflow
        const reflow = this._carouselSlides[newSlideIndex].offsetHeight;
        // Transition both slides
        this._carouselSlides[prevSlideIndex].style.transform = `translate3d(${100 * (direction * -1)}%, 0, 0)`;
        this._carouselSlides[newSlideIndex].style.transform = `translate3d(0, 0, 0)`;
        this._carouselContainer.style.height = `${this._carouselSlides[newSlideIndex].querySelector('slide-content').scrollHeight}px`;

        // Transition Complete
        setTimeout(() => {
            this._carouselSlides[prevSlideIndex].style.display = "none";
            this._isTransitioning = false;
        }, 500);
    };

    private nextSlide = (): void => {
        this._isTransitioning = true;
        const prevSlideIndex: number = this._currentSlideIndex;
        let newSlideIndex: number = prevSlideIndex + 1;
        if (newSlideIndex < 0) {
            newSlideIndex = this._carouselSlides.length - 1;
        } else if (newSlideIndex > this._carouselSlides.length - 1) {
            newSlideIndex = 0;
        }
        this._currentSlideIndex = newSlideIndex;
        this.transitionSlides(prevSlideIndex, newSlideIndex, 1);
    };

    private callbackLoop = (): void => {
        const newTime = performance.now();
        const deltaTime = (newTime - this._time) / 1000;
        this._time = newTime;
        this._timer -= deltaTime;
        if (this._timer <= 0 && !this._isTransitioning && !this._isTimerPaused && document.hasFocus()) {
            this.nextSlide();
            this._timer = this._slideDuration;
        }
        window.requestAnimationFrame(this.callbackLoop);
    };

    connectedCallback() {
        this._carouselControls.forEach((control) => {
            control.addEventListener("click", this.handleControlClick);
        });

        if (this._carouselSlides.length > 1) {
            this._time = performance.now();
            this._callback = this.callbackLoop;
            this._timer = this._slideDuration;
            this._callback();

            // Add Touch Gestures
            this.addSwipeGestures();
        }
    }

    /*
     * Swipe Logic Below
     * -----------------
     */
    private addSwipeGestures(): void {
        this.addEventListener("touchstart", this.handleTouchStart, { passive: true });
        this.addEventListener("touchmove", this.handleTouchMove, { passive: true });
        this.addEventListener("touchend", this.handleTouchEnd, { passive: true });
        this.addEventListener("mousedown", this.handleMouseDownStart, { passive: true });
        this.addEventListener("mousemove", this.handleMouseMove, { passive: true });
        this.addEventListener("mouseup", this.handleMouseUp, { passive: true });
    }

    private handleTouchStart = (e: TouchEvent): void => {
        const touchData = e.changedTouches[0];
        this._swipeCounter = 0;
        this._swipeStartX = touchData.pageX;
        this._swipeStartY = touchData.pageY;
        this._swipeStartTime = performance.now();
    };

    private handleTouchMove = (): void => {
        if (this._swipeCounter === 0) {
            this._swipeCounter = this._swipeCounter + 1;
        }
    };

    private calculateSwipeDirection(distX: number, distY: number): "left-swipe" | "right-swipe" | null {
        let swipeDirection: null | "left-swipe" | "right-swipe" = null;
        if (Math.abs(distX) >= this._swipeThreshold && Math.abs(distY) <= this._swipeRestraint) {
            swipeDirection = distX < 0 ? "left-swipe" : "right-swipe";
        }
        return swipeDirection;
    }

    private handleTouchEnd = (e: TouchEvent): void => {
        if (this._swipeCounter === 1) {
            const touchData = e.changedTouches[0];
            const distX = touchData.pageX - this._swipeStartX;
            const distY = touchData.pageY - this._swipeStartY;
            const elapsedTime = performance.now() - this._swipeStartTime;
            if (elapsedTime <= this._allowedSwipeTime) {
                const swipeDirection = this.calculateSwipeDirection(distX, distY);
                if (swipeDirection && !this._isTransitioning) {
                    this._isTransitioning = true;
                    if (!this._isTimerPaused) this._isTimerPaused = true;

                    let direction = 1;
                    if (swipeDirection === "left-swipe") {
                        direction = 1;
                    } else {
                        direction = -1;
                    }

                    const prevSlideIndex = this._currentSlideIndex;
                    let newSlideIndex = this._currentSlideIndex + direction;
                    if (newSlideIndex < 0) {
                        newSlideIndex = this._carouselSlides.length - 1;
                    } else if (newSlideIndex > this._carouselSlides.length - 1) {
                        newSlideIndex = 0;
                    }

                    this._currentSlideIndex = newSlideIndex;
                    this.transitionSlides(prevSlideIndex, newSlideIndex, direction);
                }
            }
        }
        this._swipeCounter = 0;
    };

    private handleMouseDownStart(e: MouseEvent): void {
        this._isMouseDown = true;
        this._swipeCounter = 0;
        this._swipeStartX = e.clientX;
        this._swipeStartY = e.clientY;
        this._swipeStartTime = performance.now();
        this.style.cursor = "grabbing";
    }
    private handleMouseMove(): void {
        if (this._isMouseDown && this._swipeCounter === 0) {
            this._swipeCounter = this._swipeCounter + 1;
        }
    }
    private handleMouseUp(e: MouseEvent): void {
        this._isMouseDown = false;
        if (this._swipeCounter === 1) {
            const distX = Math.abs(this._swipeStartX / e.clientX);
            const distXPixel = 100 * (1 - distX);
            const distY = Math.abs(this._swipeStartY / e.clientY);
            const distYPixel = 100 * (1 - distY);
            const elapsedTime = performance.now() - this._swipeStartTime;
            if (elapsedTime <= this._allowedSwipeTime) {
                const swipeDirection = this.calculateSwipeDirection(distXPixel, distYPixel);
                if (swipeDirection && !this._isTransitioning) {
                    this._isTransitioning = true;
                    if (!this._isTimerPaused) this._isTimerPaused = true;

                    let direction = 1;
                    if (swipeDirection === "left-swipe") {
                        direction = 1;
                    } else {
                        direction = -1;
                    }

                    const prevSlideIndex = this._currentSlideIndex;
                    let newSlideIndex = this._currentSlideIndex + direction;
                    if (newSlideIndex < 0) {
                        newSlideIndex = this._carouselSlides.length - 1;
                    } else if (newSlideIndex > this._carouselSlides.length - 1) {
                        newSlideIndex = 0;
                    }

                    this._currentSlideIndex = newSlideIndex;
                    this.transitionSlides(prevSlideIndex, newSlideIndex, direction);
                }
            }
        }
        this.style.cursor = "grab";
        this._swipeCounter = 0;
    }
}
