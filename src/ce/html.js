import {KaToolsV1} from "../core/init";

KaToolsV1.html = (htmlContent) => {
    let e = document.createElement("template");
    e.innerHTML = htmlContent;
    return e;
}
