import {KaTemplate} from "../tpl/template";
import {ka_create_element} from "../core/create-element";
import {ka_html} from "../ce/html.js";
import {ka_templatify} from "../tpl/templatify.js";
import {KaModalConfig} from "./KaModalConfig";



export class KaModal {
    public element : HTMLElement;
    public backdrop: HTMLElement;
    #main : HTMLElement;

    protected $tpl : KaTemplate = null;

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

    public render(scope : any = null) {
        if (this.$tpl === null) {
            let html = this.html as unknown;
            if (typeof html === "string") {
                html = ka_html(html);
            }

            let elem = ka_templatify(html as HTMLTemplateElement);
            this.#main.appendChild(elem);
            this.$tpl = new KaTemplate(elem);
        }
        console.log("render", this);

        this.$tpl.render(scope);
    }

    public resolve(value : any) : void {
        this.element.remove();
        this.#promise.resolve(value);
    }

    public show(...params) : Promise<any> {
        this.element.removeAttribute("hidden");
        return this.#promise.promise;
    }

    /**
     * The HTML Template to define for this Element
     *
     * <example>
     *     html = (element: KaHtmlElement) => `<div ka.for...></div>`;
     *     html = `<div ka.for="let e of element"></div>`
     * </example>
     *
     */
    // language=html
    public html : ((element: KaModal)=> string) | string | Promise<HTMLTemplateElement|string> | HTMLTemplateElement | null;



}



