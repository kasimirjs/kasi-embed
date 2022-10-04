/**
 * Defines a customElement
 *
 * Usage as class decorator @customElement("some-tag")
 *
 * @param tagName
 */
export function customElement(tagName) {
    return function (classOrDescriptor) {
        console.debug("registering custom element", classOrDescriptor, tagName);
        customElements.define(tagName, classOrDescriptor);
        return classOrDescriptor;
    };
}
