import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export default class LitComponent extends LitElement {
    @property({
        type: Number,
        hasChanged: (value?: number, oldValue?: number) => {
            return value !== oldValue;
        },
    })
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
        }

        :host button {
            cursor: pointer;
        }
    `;

    private increaseCount(): void {
        this._count++;
    }

    private decreaseCount(): void {
        this._count--;
    }

    render() {
        return html`
            <button @click="${this.decreaseCount}"}>-</button>
            <span>Count: ${this._count}</span>
            <button @click="${this.increaseCount}"}>+</button>
        `;
    }
}