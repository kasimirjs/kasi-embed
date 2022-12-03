import {KaScope} from "../types";
import {bindScope, isset} from "../functions";
import {ka_templatify} from "../tpl/templatify";
import {ka_html} from "../ce/html";
import {KaTemplate} from "../tpl/template";


export class KaCustomFragment {
    private __scope : KaScope = null;
    private __html = "<div>No Template defined</div>"
    private tpl : HTMLElement

    public init<T extends KaScope>(scope : T) : T {
        // Check template set by customElement annotation
        if (isset(this.constructor["html"]))
            this.__html = this.constructor["html"];

        let tpl = ka_templatify(ka_html(this.__html));
        this.tpl = tpl;

        this.__scope = bindScope(scope, new KaTemplate(tpl));
        return scope;
    }

    setParentScope(scope : KaScope) {
        this.__scope.$parent = scope;
    }

    fragementConnectedCallback(parentElement : HTMLElement) {
        if (this.__scope === null)
            this.init({});
        parentElement.append(this.tpl);
    }

    fragmentDisconnectedCallback() {
        this.tpl.remove();
    }
}
