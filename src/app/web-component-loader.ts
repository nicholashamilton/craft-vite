interface WebComponentLoaderInterface {
    initModules: () => void;
}

interface ModuleDictionaryItem {
    module: () => Promise<any>,
    path: string;
    tagName: string;
}

class WebComponentLoader implements WebComponentLoaderInterface {
    private _modules: Record<string, () => Promise<{
        [key: string]: any;
    }>>;
    private _webComponentTagNames: Array<string>;
    private _modulesDictionary: Record<string, ModuleDictionaryItem>;

    constructor() {
        this._modules = import.meta.glob('../../templates/**/*.ts');
        this._modulesDictionary = this.getModulesDictionary();
        this._webComponentTagNames = this.getActiveWebComponentTagNames();
    }

    public initModules() {
        this.mountWebComponents();
    }

    private getModulesDictionary(): Record<string, ModuleDictionaryItem> {
        const modulesDictionary: Record<string, ModuleDictionaryItem> = {};
        for (const path in this._modules) {
            const filePathNoExtenstion = path.split('.').slice(0, -1).join('.');
            const filePathSegmentArr = filePathNoExtenstion.split('/');
            const componentName = filePathNoExtenstion.split('/')[filePathSegmentArr.length - 1];
            modulesDictionary[componentName] = {
                'module': this._modules[path],
                'path': path,
                'tagName': componentName,
            }
        }
        return modulesDictionary;
    }

    private getActiveWebComponentTagNames() {
        const webComponentElements = Array.from(document.querySelectorAll('[web-component]'));
        const tagNames = [...new Set(webComponentElements.map((webComponent) => webComponent.localName))];
        return tagNames;
    }

    private async mountWebComponents() {
        for (let i = 0; i < this._webComponentTagNames.length; i++) {
            this.mountWebComponent(this._webComponentTagNames[i]);
        }
    }

    private async mountWebComponent(tagName: string) {
        try {
            const currModule = this._modulesDictionary[tagName];
            if (!customElements.get(currModule.tagName)) {
                let module = await currModule.module();
                if (!module?.default) {
                    const key = Object.keys(module)?.[0] ?? null;
                    if (!key) {
                        throw 'ES Module is exporting an empty object.';
                    }
                    module = Object.assign({
                        default: module[key],
                    }, module);
                }
                customElements.define(currModule.tagName, module.default);
            }
        } catch (error) {
            console.error(error);
            console.error(`Failed to import module: ${tagName}`);
        }
    }
}

const webComponentLoader = new WebComponentLoader();
const initModules: () => void = webComponentLoader.initModules.bind(webComponentLoader);
export { initModules };
