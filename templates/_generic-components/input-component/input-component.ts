export default class InputComponent extends HTMLElement {
    private input: HTMLInputElement;
    private errorEl: HTMLElement;

    constructor() {
        super();
        this.input = this.querySelector("input");
        const errorEl = document.createElement("p");
        errorEl.className = "error";
        this.appendChild(errorEl);
        this.errorEl = errorEl;
    }

    private hasValue = () => {
        if (this.input.value.length) {
            this.input.classList.add('has-value');
        }
        else {
            this.input.classList.remove('has-value');
        }
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

    private doValidation = () => {
        this.hasValue();

        if (this.input.required && this.input.value === "") {
            if (this.getAttribute("state") !== "invalid") {
                this.reportError("This field is required.");
            }
            return;
        }

        if (this.input.type === 'email') {
            if (new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).test(this.input.value)) {
                this.clearError();
            } else {
                if (this.getAttribute("state") !== "invalid") {
                    this.reportError("Invalid email format.");
                }
                return;
            }
        }

        if (this.input.type === 'tel') {
            const formattedValue = this.formatPhoneNumber(this.input.value);
            if (formattedValue) {
                this.input.value = formattedValue;
                this.clearError();
            } else {
                if (this.getAttribute("state") !== "invalid") {
                    this.reportError("Provide a valid US phone number.");
                    return;
                }
            }
        }

        if (this.input.type === 'url') {
            if (new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g).test(this.input.value)) {
                this.clearError();
            } else {
                if (this.getAttribute("state") !== "invalid") {
                    this.reportError("Invalid URL format.");
                }
                return;
            }
        }

        this.clearError();
    }

    /**
     * Formats phone number string (US)
     * @see https://stackoverflow.com/a/8358141
     * @license https://creativecommons.org/licenses/by-sa/4.0/
     */
    private formatPhoneNumber = (phoneNumber: string) => {
        var cleaned = ("" + phoneNumber).replace(/\D/g, "");
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = match[1] ? "+1 " : "";
            return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
        }
        return null;
    }

    private handleBlur: EventListener = () => {
        this.doValidation();
    }

    private handleInput: EventListener = this.clearError.bind(this);

    connectedCallback() {
        this.input.addEventListener("input", this.handleInput);
        this.input.addEventListener("blur", this.handleBlur);
    }
}