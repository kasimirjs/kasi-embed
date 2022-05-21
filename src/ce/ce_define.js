/**
 * Define a new CustomElement
 *
 * @param elementName
 * @param controller
 * @param template
 * @param options
 * @returns {Promise<void>}
 */
KaToolsV1.ce_define = async (elementName, controller, template=null, options={waitEvent: null}) => {
    template = await template;
    let ctrlClass = null;
    if ( KaToolsV1.is_constructor(controller)) {
        ctrlClass = controller;
        ctrlClass.__callback = ctrlClass.prototype.connected;
    } else {
        ctrlClass = class extends KaToolsV1.CustomElement{};
        ctrlClass.__callback = controller;
    }

    ctrlClass.__tpl = template;
    ctrlClass.__options = options;

    customElements.define(elementName, ctrlClass);

}
