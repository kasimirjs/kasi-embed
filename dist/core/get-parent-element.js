"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ka_get_parent_element = void 0;
/**
 * Find and return the parent Element of element in parameter 2
 * matching the selector or element in parameter 1
 *
 * return null if not found
 *
 * @param selector {HTMLElement|string}    The Element or a css selector
 * @param element {HTMLElement}
 * @return {HTMLElement|null}
 */
function ka_get_parent_element(selector, element) {
    if (element === null)
        return null;
    if (selector instanceof HTMLElement) {
        if (selector === element) {
            return element;
        }
    }
    else {
        if (element.matches(selector))
            return element;
    }
    if (element.parentElement === null)
        return null;
    return ka_get_parent_element(selector, element.parentElement);
}
exports.ka_get_parent_element = ka_get_parent_element;