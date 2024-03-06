import {createScopeObject, KaScope, KaScopeType} from "../types";
import {isset} from "../functions";
import {ka_templatify} from "../tpl/templatify";
import {ka_html} from "../ce/html";
import {KaTemplate} from "../tpl/template";
import {KaCustomFragment} from "./KaCustomFragment";
import {KaCustomWrapper} from "./KaCustomWrapper";
import {ka_create_element} from "../core/create-element";


export type ShadowRootConfig = {
    mode? : null | "open" | "closed"; // Default null: No shadowRoot
    stylesheets? : string[] | null;
}

export class KaCustomElement extends HTMLElement {
    public __ka_stop_render : true = true; // Stop rendering if this element is reached

    protected shadowRootConfig : ShadowRootConfig = {}; // Activate shadowRoot
    private html : string = "Undefined Template";
    protected readonly scope : KaScope = createScopeObject();
    protected tplPrototype : HTMLElement = null;
    protected wrapper : KaCustomWrapper = null;
    private tpl : HTMLElement = null;

    public init<T extends KaScope>(scope : T, autorender : boolean = true) : KaScopeType | T | KaScope  {


        this.scope.init(scope);
        return this.scope;
    }

    protected wrap(fragment : KaCustomWrapper) {
        this.wrapper = fragment;
    }


    setParentScope(scope : KaScope) {
        this.scope.$parent = scope;
    }

    // @ts-nocheck
    async connectedCallback() {
        if ( ! this.scope.isInitialized())
            this.init({});

        // Check template set by customElement annotation
        // Cannot be done in constructor because of async behavior
        if (isset (this.constructor["html"])) {
            this.html = this.constructor["html"] as string;
        }
        if (isset(this.constructor["shadowRootConfig"])) {
            this.shadowRootConfig = this.constructor["shadowRootConfig"] as ShadowRootConfig;
        }

        if (this.tplPrototype === null) {
            this.tplPrototype = ka_templatify(ka_html(this.html));
        }

        if (this.tpl !== null) {
            // Already rendered (reconnected element)
            return;

        }
        this.tpl = this.tplPrototype.cloneNode(true) as HTMLElement;
        this.scope.$tpl = new KaTemplate(this.tpl);

        // Adding Shadow Root
        let domRoot : any = this;
        if (this.shadowRootConfig.mode !== null && this.shadowRootConfig.mode !== undefined) {
            domRoot = this.attachShadow({mode: this.shadowRootConfig.mode});
            this.shadowRootConfig.stylesheets?.forEach((stylesheet) => {
                ka_create_element("link", {rel: "stylesheet", href: stylesheet}, null, domRoot);
            });
        }

        if (this.wrapper !== null) {

            await this.wrapper.fragmentConnectedCallback();
            domRoot.append(this.wrapper.wrapTemplate(this.tpl));
            this.wrapper.wrapFinish();
        } else {
            domRoot.append(this.tpl);
        }

        this.scope.render();

    }

    disconnectedCallback() {
        if (this.scope.$tpl !== undefined)
            this.scope.$tpl.dispose();
    }
}
