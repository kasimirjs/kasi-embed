import { KaTemplate } from "../tpl/template";
export interface KaModalConfig {
    parentElement?: HTMLElement;
    zIndex?: number;
    styleBase?: string;
    styleBackdrop?: string;
    maxWidth?: number;
}
export declare class KaModal {
    #private;
    protected $tpl: KaTemplate;
    adjustWidth(modalConfig: KaModalConfig): void;
    constructor(tagName?: string, shadowRootInit?: ShadowRootInit | null, modalConfig?: KaModalConfig);
    render(scope?: any): void;
    protected resolve(...params: any): void;
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
    html: (element: KaModal) => string | Promise<HTMLTemplateElement | string> | HTMLTemplateElement | null;
}
