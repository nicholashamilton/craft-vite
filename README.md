# CraftCMS-Boilerplate

#### Boilerplate Features ⚡
- [x] Vite ⚡
- [x] TypeScript
- [x] Tailwind & SCSS
- [x] Web Component Auto Loader

#### Auto Load Web Component's

1. Create your custom element with the web-component `attribute`.
```html
<!-- Auto load Web Components in the /templates directory by tagging custom elements with the web-component attribute. -->
<custom-element web-component></custom-element>
```

2. Create a corresponding `.ts` file for the Web Component and export the default class.
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