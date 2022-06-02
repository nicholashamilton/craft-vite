export default class InputRange extends HTMLElement {
    private _slider: HTMLInputElement;
    private _rangeMarker: HTMLElement;
    private _activeClass: string = 'is-active';

    constructor() {
        super();
        this._slider = this.querySelector('input[type="range"]');
        this._rangeMarker = this.querySelector('#range-marker');
    }

    public connectedCallback(): void {
        const [value, min, max] = this.getRangeValues();
        this.updateRangeMarker(value, min, max);

        this._slider.addEventListener('input', this.handleRangeInput);
        this._slider.addEventListener('change', this.handleRangeChange);
    }

    private updateRangeMarker(value: number, min: number, max: number): void {
        const valueEl = this.querySelector('#value');
        valueEl.innerHTML = this._slider.value;

        const newValue = Number((value - min) * 100 / (max - min));
        const newPosition = 10 - (newValue * 0.2);
        this._rangeMarker.style.left = `calc(${newValue}% + (${newPosition}px))`;
    }

    private handleRangeInput = (): void => {
        this._rangeMarker.classList.add(this._activeClass);

        const [value, min, max] = this.getRangeValues();
        this.updateRangeMarker(value, min, max);
    }

    private handleRangeChange = (): void => {
        this._rangeMarker.classList.remove(this._activeClass);
    }

    private getRangeValues(): [number, number, number] {
        const value = parseInt(this._slider.value);
        const min = parseInt(this._slider.min);
        const max = parseInt(this._slider.max);

        return [value, min, max];
    }
}