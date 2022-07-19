/**
 * Define a new CustomElement
 *
 * @param elementName
 * @param controller
 * @param template
 * @param options
 * @returns {Promise<void>}
 */
KaToolsV1.ce_define = async (elementName, controller, template=null, options={waitEvent: null, shadowDom: false, shadowDomOptions: {mode: 'open'}}) => {
    let opts = {
        waitEvent: null,
        shadowDom: false,
        shadowDomOptions: {mode: 'open'},
        ...options
    }

    template = await template;
    let ctrlClass = null;
    if ( KaToolsV1.is_constructor(controller)) {
        ctrlClass = controller;
        ctrlClass.__callback = null;
    } else {
        ctrlClass = class extends KaToolsV1.CustomElement{};
        ctrlClass.__callback = controller;
    }

    ctrlClass.__tpl = template;
    ctrlClass.__options = opts;

    customElements.define(elementName, ctrlClass);

}
