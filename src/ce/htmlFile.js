import {KaToolsV1} from "../core/init";

KaToolsV1.RemoteTemplate = class {
    constructor(url) {
        this.url = url;
        this.tpl = null;
    }

    /**
     *
     * @return {Promise<HTMLTemplateElement>}
     */
    async load() {
        if (this.tpl === null)
            this.tpl = await KaToolsV1.loadHtml(this.url);
        return this.tpl;
    }
}


/**
 * Load the Template on usage from remote location
 *
 *
 * @param url {string}
 * @return {KaToolsV1.RemoteTemplate}
 */
KaToolsV1.htmlUrl = (url) => new KaToolsV1.RemoteTemplate(url);
