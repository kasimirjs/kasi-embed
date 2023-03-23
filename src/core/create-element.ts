
/**
 * Create a new Element
 *
 * @param tagName {string}      The Tag Name
 * @param attributes {string<string>}   Attributes to set initially
 * @param appendToElement {HTMLElement}
 * @param children {HTMLElement[]}
 * @return HTMLElement
 */
export function ka_create_element (tagName : string, attributes : any = null,  children : HTMLElement[] | NodeListOf<Node> = null, appendToElement : HTMLElement = null) : HTMLElement{
    let e = document.createElement(tagName);
    if (attributes === null)
        attributes = {}

    for(let attName in attributes) {
        e.setAttribute(attName, attributes[attName]);
    }

    if (Array.isArray(children) || children instanceof NodeList) {
        for(let ce of children)
            e.appendChild(ce);
    }

    if (appendToElement !== null) {
        appendToElement.appendChild(e);
    }
    return e;
}
