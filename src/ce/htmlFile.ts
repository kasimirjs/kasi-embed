import {ka_load_html} from "./loadHtml";


export class RemoteTemplate {
    private  tpl: null | HTMLElement;
    constructor(
        public url : string
    ) {
        this.tpl = null;
    }

    /**
     *
     * @return {Promise<HTMLTemplateElement>}
     */
    async load() {
        if (this.tpl === null)
            this.tpl = await ka_load_html(this.url);
        return this.tpl;
    }
}


/**
 * Load the Template on usage from remote location
 *
 *
 * @param url {string}
 * @return {RemoteTemplate}
 */
function htmlUrl(url : string) : RemoteTemplate {
    return new RemoteTemplate(url);
}
