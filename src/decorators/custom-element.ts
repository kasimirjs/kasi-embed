/**
 * Defines a customElement
 *
 * Usage as class decorator @customElement("some-tag")
 *
 * @param tagName
 */
export function customElement(tagName : string) {
    return function (classOrDescriptor: any) : void {
        console.debug("registering custom element", classOrDescriptor, tagName);
        customElements.define(tagName, classOrDescriptor);
        return classOrDescriptor;
    }
}
