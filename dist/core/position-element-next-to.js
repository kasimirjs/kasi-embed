"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ka_position_element_next_to = void 0;
/**
 * Set the position of the floating (inner) Element to a event or
 * a target Element
 *
 * @param element {HTMLElement}          The Element to apply the position to
 * @param nextTo {PointerEvent|HTMLElement}     The PointerEvent or other Element to
 */
function ka_position_element_next_to(element, nextTo) {
    let x, y = null;
    let elemRect = element.getBoundingClientRect();
    if (nextTo instanceof Event) {
        x = nextTo.clientX;
        y = nextTo.clientY;
        if (y + elemRect.height > window.innerHeight)
            y = y - elemRect.height + "px";
        if (x + elemRect.width > window.innerWidth)
            y = x - elemRect.width + "px";
    }
    else if (nextTo instanceof HTMLElement) {
        let bb = nextTo.getBoundingClientRect();
        y = bb.top + bb.height;
        x = bb.left;
        // If right side of the screen
        if (bb.left > window.innerHeight / 2) {
            x = bb.left + bb.width - elemRect.width;
        }
        if (y + bb.height > window.innerHeight)
            y = bb.top - elemRect.height;
    }
    else {
        throw "Invalid paramter 1. Expected HTMLElement or PointerEvent";
    }
    element.style.top = y + "px";
    element.style.left = x + "px";
}
exports.ka_position_element_next_to = ka_position_element_next_to;
