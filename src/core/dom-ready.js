

/**
 * Wait for DomContentLoaded or resolve immediate
 *
 * <example>
 * await MicxToolsVx.domReady();
 * </example>
 *
 * @return {Promise<string>}
 */
export async function ka_dom_ready () {
    return new Promise((resolve) => {
        if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive")
            return resolve("loaded");
        document.addEventListener("DOMContentLoaded", ()=>resolve('DOMContentLoaded'));
    });
}
