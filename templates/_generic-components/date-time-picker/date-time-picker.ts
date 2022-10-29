import flatpickr from "flatpickr";

export default class DateTimePicker extends HTMLElement {
    constructor() {
        super();
        const dateEl = this.querySelector('#date') as HTMLInputElement;
        const timeEl = this.querySelector('#time') as HTMLInputElement;
        const dateOutput = document.body.querySelector('#date-output') as HTMLSpanElement;
        const timeOutput = document.body.querySelector('#time-output') as HTMLSpanElement;
        dateOutput.innerHTML = (dateEl.type === 'date').toString();
        timeOutput.innerHTML = (timeEl.type === 'time').toString();

        flatpickr(dateEl, {
            enableTime: true,
            altInput: true,
            altFormat: "F j, Y H:i",
            dateFormat: "Y-m-d",
        });
    }
}