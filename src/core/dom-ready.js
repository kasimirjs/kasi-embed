/**
 * Wait for DomContentLoaded or resolve immediate
 *
 * <example>
 * await MicxToolsVx.domReady();
 * </example>
 *
 * @return {Promise<string>}
 */
KaToolsV1.domReady = async ()=> {
    return new Promise((resolve) => {
        if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive")
            return resolve("loaded");
        document.addEventListener("DOMContentLoaded", ()=>resolve('DOMContentLoaded'));
    });
}
