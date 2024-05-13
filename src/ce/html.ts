
function replaceLineBreaksAndTrimHtmlTags(html: string): string {
    // This regular expression matches HTML tags and captures their content
    const regex = /<[^>]+>/g;

    // This function will be used in the replace method to process each match
    function cleanTag(match: string): string {
        // Replace all sequences of whitespace with a single space and trim trailing space before '>'
        return match.replace(/\s+/g, ' ').replace(/\s+>$/, '>');
    }

    // Replace line breaks within each tag and trim trailing spaces before '>'
    return html.replace(regex, cleanTag);
}
function returnFirstOriginalLineThatIsDifferent(original : string, generated : string) : string
{
    let originalLines = original.trim().split("\n");
    let generatedLines = generated.trim().split("\n");

    // trim all lines
    originalLines = originalLines.map((line) => line.trim());
    generatedLines = generatedLines.map((line) => line.trim());
    // Remove linebreaks whithin html attributes


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
    htmlContent = replaceLineBreaksAndTrimHtmlTags(htmlContent);
    if (e.innerHTML.split("\n").length !== htmlContent.split("\n").length)
        console.error("ka_html(): HTML Parsing Error (possibly due to invalid HTML in template) in " + returnFirstOriginalLineThatIsDifferent(htmlContent, e.innerHTML), htmlContent, e.innerHTML);

    return e;
}
