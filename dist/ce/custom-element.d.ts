export class KaCustomElement extends HTMLElement {
    constructor(props: any);
    /**
     *
     * @protected
     * @var {KaTemplate}
     */
    protected __tpl: KaTemplate;
    __isConnected: boolean;
    /**
     * The Template associated with this Element
     *
     * @return {KaTemplate}
     */
    get $tpl(): KaTemplate;
    isConnected(): () => any;
    /**
     * @abstract
     * @return {Promise<void>}
     */
    connected($tpl: any, $this: any): Promise<void>;
    connectedCallback(): Promise<void>;
}
import { KaTemplate } from "../tpl/template.js";
