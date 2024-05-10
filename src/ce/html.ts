

function returnFirstOriginalLineThatIsDifferent(original : string, generated : string) : string
{
    let originalLines = original.split("\n");
    let generatedLines = generated.split("\n");

    for (let i = 0; i < originalLines.length; i++) {
        if (originalLines[i] !== generatedLines[i]) {
            return "Line `" + (i + 1) + ": " + originalLines[i].trim() + "`";
        }
    }
    return null;
}

export function ka_html(htmlContent : string | HTMLTemplateElement) : HTMLTemplateElement {
    if (htmlContent instanceof HTMLTemplateElement) {
        return htmlContent;
    }
    let e = document.createElement("template");

    e.innerHTML = htmlContent;
    if (e.innerHTML !== htmlContent)
        console.error("ka_html(): HTML Parsing Error (possibly due to invalid HTML in template) in " + returnFirstOriginalLineThatIsDifferent(htmlContent, e.innerHTML), htmlContent);

    return e;
}
