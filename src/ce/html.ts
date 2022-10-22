
export function ka_html(htmlContent : string) : HTMLTemplateElement {
    let e = document.createElement("template");
    e.innerHTML = htmlContent;
    return e;
}
