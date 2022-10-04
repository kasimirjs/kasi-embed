export function ka_html(htmlContent) {
    let e = document.createElement("template");
    e.innerHTML = htmlContent;
    return e;
}
