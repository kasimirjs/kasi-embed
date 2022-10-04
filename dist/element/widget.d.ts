/**
 * @abstract
 * @class
 */
export class KaWidget {
    /**
     * @abstract
     * @interface
     * @return {{shadowDom: {boolean}, elementName: {string}, shadowDomOptions: {mode: 'open'}}}
     */
    static get options(): {
        shadowDom: {
            boolean;
        };
        elementName: {
            string;
        };
        shadowDomOptions: {
            mode: 'open';
        };
    };
    /**
     *  Await the ready instance
     *
     * @static
     * @public
     * @return {Promise<this>}
     */
    public static Load(): Promise<this>;
    /**
     * Return the HTMLTemplate
     *
     * @abstract
     * @return {HTMLTemplateElement}
     */
    static getTemplate(): HTMLTemplateElement;
    /**
     * Don't call this directly
     *
     * call await Widget.show() instead
     *
     * @private
     * @deprecated Use Widget.show() instead of constructor
     * @param autoAppendToElement
     */
    private constructor();
    /**
     *
     * @type {HTMLElement}
     */
    $element: HTMLElement;
    /**
     *
     * @type {KaToolsV1.Template}
     */
    $tpl: KaToolsV1.Template;
    _globalClickEventHandler: (e: any) => void;
    readyPromise: Promise<any>;
    /**
     * Called after initialization is complete (Template loaded etc)
     *
     * @abstract
     * @return {Promise<void>}
     */
    __init(): Promise<void>;
    ready(): Promise<any>;
    destroy(): Promise<void>;
}
