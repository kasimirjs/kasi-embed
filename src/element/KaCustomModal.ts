import {createScopeObject, KaScope} from "../types";
import {isset} from "../functions";
import {ka_templatify} from "../tpl/templatify";
import {ka_html} from "../ce/html";
import {KaModalConfig} from "./KaModalConfig";
import {ka_create_element} from "../core/create-element";
import {KaTemplate} from "../tpl/template";


export class KaCustomModal {
    protected readonly scope : KaScope = createScopeObject();
    protected __html = "<div>No Template defined</div>"
    private tplPrototype : HTMLElement
    private tpl : HTMLElement

    public element : HTMLElement;
    public backdrop: HTMLElement;
    #main : HTMLElement;
    #configDefaults : KaModalConfig = {
        parentElement: document.body,
        zIndex: 9999,
        styleBase: "position:fixed; top:0; bottom:0; left:0; right:0;",
        styleBackdrop: "background-color: #999;opacity:0.5;",
        maxWidth: 800,
    }

    #promise = {
        promise: null as Promise<any> | null,
        reject: null as (...params : any) => void | null,
        resolve: null as (...params : any) => void | null,
    }

    adjustWidth(modalConfig: KaModalConfig) {
        let w = window.innerWidth;
        if (w > modalConfig.maxWidth)
            w = modalConfig.maxWidth;
        this.#main.style.width = w + "px";
    }


    constructor(tagName : string = "ka-modal", shadowRootInit: ShadowRootInit | null = null, modalConfig : KaModalConfig = {}) {
        let config : KaModalConfig = this.#configDefaults;
        config = {
            ...config,
            ...modalConfig
        }
        this.element = ka_create_element(tagName, {hidden: "hidden"}, null, config.parentElement);
        this.backdrop = ka_create_element("div", {style: `${config.styleBase};${config.styleBackdrop};z-index:${config.zIndex};`}, null, this.element);
        let master = ka_create_element("div", {style: `position:fixed;left:0;right:0;top:0;bottom:0;display:flex;justify-content:center;z-index:${config.zIndex+1};`}, null, this.element);
        this.#main = ka_create_element("div", {style: `;max-height:100%;max-width:100%;`}, null, master);

        this.adjustWidth(config);

        this.#promise.promise = new Promise((resolve, reject) => {this.#promise.resolve = resolve; this.#promise.reject = reject})
    }


    public init<T extends KaScope>(scope : T) : T | KaScope {
        // Check template set by customElement annotation
        if (isset(this.constructor["html"]))
            this.__html = this.constructor["html"];

        if ( ! isset (this.tplPrototype))
            this.tplPrototype = ka_templatify(ka_html(this.__html));

        this.scope.init(scope);

        return this.scope;
    }


    setParentScope(scope : KaScope) {
        this.scope.$parent = scope;
    }

    setScope(scope : KaScope) {
        this.scope.importFrom(scope);
    }

    public resolve(value : any) : void {
        this.element.remove();
        this.#promise.resolve(value);
    }

    async show(...params: any[]) : Promise<any> {

        if ( ! this.scope.isInitialized()) {
           this.init({});
        }

        this.tpl = this.tplPrototype.cloneNode(true) as HTMLElement;
        this.scope.$tpl = new KaTemplate(this.tpl);
        this.#main.append(this.tpl);

        this.element.removeAttribute("hidden");
        this.scope.render();

        return this.#promise.promise;
    }

    fragmentDisconnectedCallback() {
        this.scope.$tpl.dispose();
    }
}
