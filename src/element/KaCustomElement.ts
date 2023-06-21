import {createScopeObject, KaScope, KaScopeType} from "../types";
import {isset} from "../functions";
import {ka_templatify} from "../tpl/templatify";
import {ka_html} from "../ce/html";
import {KaTemplate} from "../tpl/template";
import {KaCustomFragment} from "./KaCustomFragment";
import {KaCustomWrapper} from "./KaCustomWrapper";


export class KaCustomElement extends HTMLElement {
    private html : string = "Undefined Template";
    protected readonly scope : KaScope = createScopeObject();
    protected tplPrototype : HTMLElement = null;
    protected wrapper : KaCustomWrapper = null;
    private tpl : HTMLElement

    public init<T extends KaScope>(scope : T) : KaScopeType | T | KaScope  {


        this.scope.init(scope);
        return this.scope;
    }

    protected wrap(fragment : KaCustomWrapper) {
        this.wrapper = fragment;
    }


    setParentScope(scope : KaScope) {
        this.scope.$parent = scope;
    }

    async connectedCallback() {
        if ( ! this.scope.isInitialized())
            this.init({});

        // Check template set by customElement annotation
        // Cannot be done in constructor because of async behavior
        if (isset (this.constructor["html"])) {
            this.html = this.constructor["html"];
        }

        if (this.tplPrototype === null) {
            this.tplPrototype = ka_templatify(ka_html(this.html));
        }

        this.tpl = this.tplPrototype.cloneNode(true) as HTMLElement;
        this.scope.$tpl = new KaTemplate(this.tpl);

        if (this.wrapper !== null) {

            await this.wrapper.fragmentConnectedCallback();
            this.append(this.wrapper.wrapTemplate(this.tpl));
            this.wrapper.wrapFinish();
        } else {
            this.append(this.tpl);
        }

        this.scope.render();

    }

    disconnectedCallback() {
        if (this.scope.$tpl !== undefined)
            this.scope.$tpl.dispose();
    }
}
