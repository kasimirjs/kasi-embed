import { KaTemplate } from "../tpl/template";
import { KaModalConfig } from "./KaModalConfig";
export declare class KaModal {
    #private;
    protected element: HTMLElement;
    protected backdrop: HTMLElement;
    protected $tpl: KaTemplate;
    adjustWidth(modalConfig: KaModalConfig): void;
    constructor(tagName?: string, shadowRootInit?: ShadowRootInit | null, modalConfig?: KaModalConfig);
    render(scope?: any): void;
    resolve(...params: any): void;
    show(): Promise<any>;
    /**
     * The HTML Template to define for this Element
     *
     * <example>
     *     html = (element: KaHtmlElement) => `<div ka.for...></div>`;
     *     html = `<div ka.for="let e of element"></div>`
     * </example>
     *
     */
    html: ((element: KaModal) => string) | string | Promise<HTMLTemplateElement | string> | HTMLTemplateElement | null;
}
