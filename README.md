# CraftCMS-Boilerplate

#### Boilerplate Features ⚡
- [x] Vite ⚡
- [x] TypeScript
- [x] Tailwind & SCSS
- [x] Web Component Auto Loader

#### Running on Dev
1. Update `.env` `CRAFT_ENVIRONMENT` to `dev`
2. `npm run dev`

#### Previewing Production on Local
1. Update `.env` `CRAFT_ENVIRONMENT` to `production`
2. Run `npm run build`
3. Go to the `host` URL on local web server.

#### Auto Loading Web Component's

1. Create your custom element with the web-component `attribute`.
```html
<!-- Auto load Web Components in the /templates directory by tagging custom elements with the web-component attribute. -->
<custom-element web-component></custom-element>
```

2. Create a corresponding `custom-element.ts` file for the Web Component and export the default class.
```ts
export default class CustomElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
    }
}
```