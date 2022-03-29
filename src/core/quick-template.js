
class KaToolsV1_QuickTemplate {

    constructor(selector) {
        if (typeof selector === "string")
            selector = KaToolsV1.querySelector(selector);
        this.template = selector;
        if ( ! this.template instanceof HTMLTemplateElement) {
            let error = "KaToolsV1_QuickTemplate: Parameter 1 is no <template> element. Selector: " + selector + "Element:" + this.template
            console.warn(error);
            throw error;
        }
        this._tplElem = document.createElement("template");
    }


    appendTo(selector, $scope) {
        if (typeof selector === "string")
            selector = KaToolsV1.querySelector(selector);

        let outerHtml = this.template.innerHTML;
        this._tplElem.innerHTML = outerHtml.replaceAll(/\[\[(.*?)\]\]/ig, (matches, stmt)=>{
            try {
                return KaToolsV1.eval(stmt, $scope)
            } catch (e) {
                console.error(`KaToolsV1_QuickTemplate: Error evaling stmt '${stmt}' on element `, this.template, "$scope:", $scope, "Error:", e);
                throw e;
            }
        });

        selector.append(document.importNode(this._tplElem.content, true));
    }

}
