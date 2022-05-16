

KaToolsV1.ce_define = (elementName, controller, template=null, waitEvent=null) => {
    let ctrlClass = null;
    if ( KaToolsV1.is_constructor(controller)) {
        ctrlClass = controller;
    } else {
        ctrlClass = class extends KaToolsV1_CustomElement{};
        ctrlClass.prototype.connected = controller;
    }

    ctrlClass.__tpl = template;
    ctrlClass.__waitEvent = waitEvent;

    customElements.define(elementName, ctrlClass);

}
