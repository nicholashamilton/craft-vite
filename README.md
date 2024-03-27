# CraftCMS + Vite Boilerplate

### Roadmap
- [x] CraftCMS 4 + PHP 8.0
- [x] Vite ⚡
- [x] TypeScript | ES Modules
- [x] Tailwind | SCSS
- [x] Web Component/ LitElement Auto Loader
- [x] React/ Preact `optional`
- [x] Generic Component Collection
- [ ] Dynamic Page Builder

---

### Running on Dev
1. Update `.env` `CRAFT_ENVIRONMENT` to `dev`
2. `npm run dev`
3. Go to the `host` URL on local web server.

### Previewing Production on Local
1. Update `.env` `CRAFT_ENVIRONMENT` to `production` or `staging`
2. Run `npm run build`
3. Go to the `host` URL on local web server.

---

### Auto Loading Web Component/ LitElement

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

---

### Creating new SCSS files
* Create `SCSS` files anywhere in `src/styles` and `templates`.
* `@import` `SCSS` files into the `src/styles/main.scss` and use Tailwind throughout the templates.

---

### PreviewMate Plugin
This project comes installed with the PreviewMate plugin.
Configuration file can be found in [config/preview-mate.php](https://github.com/nicholashamilton/craft-vite/blob/main/config/preview-mate.php).
An example utilizing the `blocksBuilder` matrix field is included in [templates/pages/_entry.twig](https://github.com/nicholashamilton/craft-vite/blob/main/templates/pages/_entry.twig).
Plugin documentation can be found [here](https://github.com/nicholashamilton/craft-preview-mate).

---

### Using React `optional`

React has not been installed or configured yet. 

To do so install the following dependencies: 

```
npm i react react-dom @types/react @types/react-dom @vitejs/plugin-react
```

Add react `input` and `plugin` to `vite.config.ts` 

```ts
import react from '@vitejs/plugin-react';

// ...
   build: {
        rollupOptions: {
            input: {
                react: './src/react/index.tsx',
            },
        },
    },
// ...
    plugins: [
        react(),
    ],
// ...
```

Add react input file 

`src/react/index.tsx` 

```ts
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.querySelector('#root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

function App() {
    return (
        <h1>App</h1>
    );
}
```

Enable the react refresh shim in `config/vite.php`

```php
// ...
    'includeReactRefreshShim' => true,
// ...
```

Add mounting element and app bundle in a twig file 

```twig
<div id="root"></div>
{{ craft.vite.script("src/react/index.tsx") }}
```

### Choose a framework. 

Follow the [Vite framework templates](https://vitejs.dev/guide/#trying-vite-online) for complete set up instructions. `react`, `preact`, `lit`, `svelte`, `vue`, `solid`, `qwik`