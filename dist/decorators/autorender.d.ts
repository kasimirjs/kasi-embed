/**
 * Defines a customElement
 *
 * Usage as class decorator @customElement("some-tag")
 *
 * @param tagName
 */
export declare function autorender(tagName: string): (classOrDescriptor: any) => void;
