/**
 * Transform any input to CamelCase
 *
 * Example: some-class => someClass
 *
 * @param str {string}
 * @return {string}
 */
KaToolsV1.strToCamelCase = function (str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
