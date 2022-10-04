"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ka_query_selector = void 0;
/**
 * Query a Element or trigger an Exception
 *
 * @param query
 * @param parent
 * @param exception
 * @return {HTMLElement}
 */
function ka_query_selector(query, parent, exception) {
    if (typeof exception === "undefined")
        exception = `querySelector '${query}' not found`;
    if (typeof parent === "undefined" || parent === null)
        parent = document;
    let e = parent.querySelectorAll(query);
    if (e.length === 0) {
        console.warn(exception, "on parent: ", parent);
        throw exception;
    }
    return e[0];
}
exports.ka_query_selector = ka_query_selector;
