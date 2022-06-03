import { LitElement, html, css } from 'lit';

export default class LitComponent extends LitElement {
    private _count: number = 0;

    static styles = css`
    :host {
        display: inline-flex;
        align-items: center;
        background: rgba(0, 0, 0, .05);
        padding: 1rem;
    }
    
    :host span {
        margin: .5rem;
    }`;

    private increaseCount(): void {
        this._count = this._count + 1;
        this.requestUpdate();
    }

    private decreaseCount(): void {
        this._count = this._count - 1;
        this.requestUpdate();
    }

    render() {
        return html`
            <button @click="${this.decreaseCount}"}>-</button>
            <span>Count: ${this._count}</span>
            <button @click="${this.increaseCount}"}>+</button>
        `;
    }
}