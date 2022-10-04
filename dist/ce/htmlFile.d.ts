export declare class RemoteTemplate {
    url: string;
    private tpl;
    constructor(url: string);
    /**
     *
     * @return {Promise<HTMLTemplateElement>}
     */
    load(): Promise<HTMLElement>;
}
