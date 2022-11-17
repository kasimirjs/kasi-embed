import { AbstractElement } from "./AbstractElement";
import { KaTemplate } from "../tpl/template";
export declare abstract class KaHtmlElement extends HTMLElement implements AbstractElement {
    protected shadowRootInit: ShadowRootInit | null;
    constructor(shadowRootInit?: ShadowRootInit | null);
    abstract connected(): Promise<void>;
    abstract disconnected(): Promise<void>;
    /**
     * The HTML Template to define for this Element
     *
     * <example>
     *     html = (element: KaHtmlElement) => `<div ka.for...></div>`;
     *     html = `<div ka.for="let e of element"></div>`
     * </example>
     *
     */
    abstract html: ((element: KaHtmlElement) => Promise<HTMLTemplateElement | string>) | HTMLTemplateElement | string | null;
    protected $tpl: KaTemplate;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): Promise<void>;
}
