

/**
 *
 * @param url {string}
 * @return {Promise<HTMLTemplateElement>}
 */
KaToolsV1.loadHtml = async (url) => {
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
