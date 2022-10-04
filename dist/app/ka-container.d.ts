export declare class KaContainer {
    protected _services: any;
    /**
     *
     * @abstract
     * @return {KaContainer}
     */
    static getInstance(): KaContainer;
    /**
     * Get / wait for a value
     *
     * @param name
     * @param lateResolving {boolean}   Trigger no warning if the name is not yet resolvable (late resolving)
     * @returns {Promise<unknown>}
     */
    get(name: string, lateResolving?: boolean): Promise<any>;
    _resolve(name: string): Promise<void>;
    /**
     * Define a fixed value
     *
     * @param name {string}
     * @param value {any}
     */
    defineValue(name: string, value: any): void;
    /**
     * Define a service (callback to return the value)
     *
     * @param name {string}
     * @param callback {function}
     * @param params {object}
     */
    defineService(name: string, callback: any, params?: any): void;
}
export declare var container: KaContainer;
