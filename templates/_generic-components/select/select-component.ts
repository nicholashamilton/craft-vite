export default class SelectComponent extends HTMLElement {
    private select: HTMLSelectElement;
    private errorEl: HTMLElement;

    constructor() {
        super();
        this.select = this.querySelector("select")!;
        const errorEl = document.createElement("p");
        errorEl.className = "error";
        errorEl.style.display = "none";
        this.errorEl = errorEl;
        this.appendChild(this.errorEl);
    }

    private hasValue = () => {
        if (this.select.value.length) {
            this.select.classList.add('has-value');
        }
        else {
            this.select.classList.remove('has-value');
        }
    }

    public validate(): boolean {
        this.hasValue();
        let isValid = true;
        if (this.select.required) {
            if (this.select.value === "") {
                isValid = false;
                if (this.getAttribute("state") !== "invalid") {
                    this.reportError("This field is required.");
                }
            } else {
                this.clearError();
            }
        } else {
            this.clearError();
        }
        return isValid;
    }

    public reportError(error: string) {
        this.errorEl.innerHTML = error;
        this.errorEl.style.display = "block";
        this.setAttribute("state", "invalid");
    }

    public clearError() {
        this.errorEl.style.display = "none";
        this.setAttribute("state", "valid");
    }

    private handleBlur: EventListener = () => {
        this.validate();
    };

    private handleInput: EventListener = this.clearError.bind(this);

    connectedCallback() {
        this.select.addEventListener("change", this.handleInput);
        this.select.addEventListener("blur", this.handleBlur);
    }
}