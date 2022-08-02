import {KaToolsV1} from "../core/init";

/**
 *
 * @param url {string}
 * @return {Promise<HTMLTemplateElement>}
 */
export async function loadHtml (url) {
    let e = document.createElement("template");
    let result = await fetch(url);
    if ( ! result.ok) {
        console.error(`[loadHtml] failed to load '${url}'`);
        throw `[loadHtml] failed to load '${url}'`
    }
    let body = await result.text();
    e.innerHTML = body;
    return e;
}
