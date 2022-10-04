import "reflect-metadata";
/**
 * Inject a
 * @param name
 */
export declare function inject(name?: string): any;
/**
 * Instanciate a new Object and inject all Properties
 *
 * @param type
 * @param map
 */
export declare function di_instanciate<T>(type: {
    new (...args: any): T;
}, map?: {}): Promise<T>;
