"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customElement = void 0;
/**
 * Defines a customElement
 *
 * Usage as class decorator @customElement("some-tag")
 *
 * @param tagName
 */
function customElement(tagName) {
    return function (classOrDescriptor) {
        console.debug("registering custom element", classOrDescriptor, tagName);
        customElements.define(tagName, classOrDescriptor);
        return classOrDescriptor;
    };
}
exports.customElement = customElement;
