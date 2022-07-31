import {KaToolsV1} from "../core/init";
(async ()=>{
    await KaToolsV1.domReady();

    // Unescape entities replaced by jekyll template engine
    for (let e of document.querySelectorAll("template[ka-unescape]")) {
        let data = e.innerHTML;
        e.innerHTML = data.replaceAll("&lt;", "<")
            .replaceAll("&amp;", "&")
            .replaceAll("&gt;", ">");
    }

    for (let e of document.querySelectorAll("template[ka-autostart]")) {
        let ne = document.importNode(KaToolsV1.querySelector("script", e.content), true).cloneNode(true);
        KaSelf = ne;
        if (e.nextElementSibling === null) {
            ne.parentNode.append(ne);
            continue;
        }
        e.parentNode.insertBefore(ne, e.nextElementSibling);
    }
})()
