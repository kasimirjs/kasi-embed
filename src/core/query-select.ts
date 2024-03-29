
/**
 * Query a Element or trigger an Exception
 *
 * @param query
 * @param parent
 * @param exception
 * @return {HTMLElement}
 */
export function ka_query_selector (query : string, parent : HTMLElement | Document | DocumentFragment  = null, exception : any = null) : HTMLElement{
    if (typeof exception === "undefined" || exception === null)
        exception = `querySelector '${query}' not found`
    if (typeof parent === "undefined" || parent === null)
        parent = document;
    let e = parent.querySelectorAll(query);
    if (e.length === 0) {
        console.warn(exception, "on parent: ", parent);
        throw exception;
    }
    return e[0] as HTMLElement;
}
