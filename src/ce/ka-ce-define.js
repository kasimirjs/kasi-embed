import {ka_is_constructor} from "../core/is-constructor";

import {KaCustomElement} from "./custom-element";

/**
 * Define a new CustomElement
 *
 * @param elementName {string}
 * @param controller {function($tpl: KaToolsV1.Template, $this: KaToolsV1.CustomElement, $container: KaToolsV1.Container)}
 * @param template {HTMLTemplateElement|Promise<HTMLTemplateElement>}
 * @param options
 * @returns {Promise<void>}
 */
export async function ka_ce_define(elementName, controller, template=null, options={waitEvent: null, shadowDom: false, shadowDomOptions: {mode: 'open'}}) {
    let opts = {
        waitEvent: null,
        shadowDom: false,
        shadowDomOptions: {mode: 'open'},
        ...options
    }

    template = await template;
    let ctrlClass = null;
    if (ka_is_constructor(controller)) {
        ctrlClass = controller;
        ctrlClass.__callback = null;
    } else {
        ctrlClass = class extends KaCustomElement{};
        ctrlClass.__callback = controller;
    }

    ctrlClass.__tpl = template;
    ctrlClass.__options = opts;

    customElements.define(elementName, ctrlClass);

}
