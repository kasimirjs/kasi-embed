
KaToolsV1._ka_el_idx = 0;
/**
 *
 * @param {HTMLElement} elem
 * @return {HTMLTemplateElement}
 */
KaToolsV1.templatify = (elem, returnMode=true) => {

    if (returnMode) {
        let returnTpl = document.createElement("template");
        returnTpl.setAttribute("_kaidx", (KaToolsV1._ka_el_idx++).toString())
        /* @var {HTMLTemplateElement} returnTpl */
        returnTpl.innerHTML = elem.innerHTML;
        KaToolsV1.templatify(returnTpl.content, false);
        return returnTpl;
    }

    if (elem instanceof HTMLTemplateElement)
        elem = elem.content;

    let wrapElem = (el, attName, attVal) => {
        let tpl = document.createElement("template");
        tpl.setAttribute("_kaidx", (KaToolsV1._ka_el_idx++).toString())
        let clonedEl = el.cloneNode(true);
        clonedEl.removeAttribute(attName);
        tpl.content.append(clonedEl);
        tpl.setAttribute(attName, attVal);
        el.replaceWith(tpl);
        return tpl;
    }

    KaToolsV1.elwalk(elem, (el) => {
        console.log(el);
        if ( ! el instanceof HTMLElement)
            return;
        let tpl = null;
        for (let attrName of el.getAttributeNames()) {
            if (attrName === "ka:for") {
                tpl = wrapElem(el, "ka:for", el.getAttribute("ka:for"));
                KaToolsV1.templatify(tpl, false);
                break;
            }
            if (attrName === "ka:if") {
                tpl = wrapElem(el, "ka:if", el.getAttribute("ka:if"));
                KaToolsV1.templatify(tpl, false);
                break;
            }
        }
    }, true, false);
}
