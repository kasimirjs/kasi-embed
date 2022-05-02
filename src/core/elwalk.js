/**
 *
 * @param {HTMLElement} elem
 * @param fn
 * @param recursive
 */
KaToolsV1.elwalk = (elem, fn, recursive=false, includeTemplates=false) => {
    if (Array.isArray(elem))
        elem.children = elem;
    if (typeof elem.children === "undefined")
        return;
    if (includeTemplates) {
        if (elem instanceof HTMLTemplateElement)
            child = elem.content
    }
    for(let child of elem.children) {
        let ret = fn(child);
        if (ret === false)
            continue; // No recursiion

        if (recursive && typeof child.children !== "undefined")
            KaToolsV1.elwalk(child, fn, recursive);

    }
}
