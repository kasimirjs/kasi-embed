/**
 * Execute scirpt tag imported from a template or remote location
 *
 * @param node {HTMLElement}
 * @param src {string}      The source filename (for debugging)
 */
export function ka_execImportedScriptTags(node, src = "undefined file") {
    let chels = node instanceof HTMLTemplateElement ? node.content.childNodes : node.childNodes;
    for (let s of chels) {
        if (s.tagName !== "SCRIPT") {
            ka_execImportedScriptTags(s, src);
            continue;
        }
        let n = document.createElement("script");
        for (let attName of s.getAttributeNames())
            n.setAttribute(attName, s.getAttribute(attName));
        n.innerHTML = s.innerHTML;
        try {
            let handler = onerror;
            window.onerror = (msg, url, line) => {
                console.error(`[ka-include]: Script error in '${src}': ${msg} in line ${line}:\n>>>>>>>>\n`, n.innerHTML.split("\n")[line - 1], "\n<<<<<<<<\n", n.innerHTML);
            };
            s.replaceWith(n);
            window.onerror = handler;
        }
        catch (e) {
            console.error(`[ka-include]: Script error in '${src}': ${e}`, e);
            throw e;
        }
    }
}
