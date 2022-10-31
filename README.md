# CraftCMS-Boilerplate

#### Roadmap
- [x] CraftCMS 4 (requires php v8.0.2)
- [x] Vite ⚡
- [x] TypeScript | ES Modules
- [x] Tailwind | SCSS
- [x] Web Component/ LitElement Auto Loader
- [x] Generic Component Collection
- [ ] Dynamic Page Builder

#### Running on Dev
1. Update `.env` `CRAFT_ENVIRONMENT` to `dev`
2. `npm run dev`
3. Go to the `host` URL on local web server.

#### Previewing Production on Local
1. Update `.env` `CRAFT_ENVIRONMENT` to `production` or `staging`
2. Run `npm run build`
3. Go to the `host` URL on local web server.

#### Auto Loading Web Component/ LitElement

1. Create your custom element with the web-component `attribute`.
```html
<custom-element web-component></custom-element>
```

2. Create a corresponding `custom-element.ts` file for the Web Component or LitElement and export the default class.
```ts
export default class CustomElement extends HTMLElement {
    connectedCallback() {
        // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
    }
}
```
```ts
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export default class CustomElement extends LitElement {
    @property({
        hasChanged: (value: number, oldValue: number) => value !== oldValue,
    })
    private _count: number = 0;

    private increase(): void {
        this._count++;
    }

    private decrease(): void {
        this._count--;
    }

    render() {
        return html`
            <button @click="${this.decrease}"}>-</button>
            <span>Count: ${this._count}</span>
            <button @click="${this.increase}"}>+</button>
        `;
        // https://lit.dev/docs/components/overview/
    }
}
```

#### Creating new SCSS files
* Create `SCSS` files anywhere in `src/styles` and `templates`.
* `@import` `SCSS` files into the `src/styles/main.scss` and use Tailwind throughout the templates.
