import {AbstractElement} from "./AbstractElement";
import {KaTemplate} from "../tpl/template";
import {ka_templatify} from "../tpl/templatify";
import {ka_html} from "../ce/html";


export abstract class KaHtmlElement extends HTMLElement implements AbstractElement  {

    constructor(
        protected shadowRootInit: ShadowRootInit | null = null
    ) {
        super();
        this.addEventListener("load", (e) => console.log(e));
    }

    abstract connected() : Promise<void>;
    abstract disconnected() : Promise<void>;

    /**
     * The HTML Template to define for this Element
     *
     * <example>
     *     html = (element: KaHtmlElement) => `<div ka.for...></div>`;
     *     html = `<div ka.for="let e of element"></div>`
     * </example>
     *
     */
    abstract html : ((element: KaHtmlElement)=>Promise<HTMLTemplateElement|string>) | HTMLTemplateElement | string | null;

    protected $tpl : KaTemplate;

    public async connectedCallback() {
        let htmlTpl : any = null;
        if (typeof this.html === "function") {
            let fn = this.html as (element: KaHtmlElement)=>Promise<HTMLTemplateElement|string>;
            htmlTpl = await fn(this);
        } else {
            htmlTpl = this.html;
        }

        if (typeof htmlTpl === "string")
            htmlTpl = ka_html(htmlTpl);

        let attachTo: ShadowRoot|HTMLElement = this;
        if (this.shadowRootInit !== null) {
            attachTo = this.attachShadow(this.shadowRootInit);
        }

        if (htmlTpl !== null) {
            let tpl = ka_templatify(htmlTpl);
            this.$tpl = new KaTemplate(tpl);
            attachTo.appendChild(tpl);
        }

        this.connected()
    }

    public async disconnectedCallback() {
        this.disconnected();
    }
}
