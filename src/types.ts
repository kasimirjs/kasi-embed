import {KaTemplate} from "./tpl/template";
import {ka_debounce} from "./core/debounce";
import {isset} from "./functions";
import {Debouncer} from "./core/debouncer";

export type KaScopeOn = {
    /**
     * Called whenever a bind value changes
     *
     * @param e
     */
    change?: (e : Event) => any

    /**
     * Called before Rendering starts
     *
     * @param e
     */
    onBeforeRender?: (e : Event) => any
}

export type KaScopeType = {
    $__scope_orig: any
    $fn: {[x : string] : (...param : any[])=>any}
    $ref: Map<string, HTMLElement>
    $on: KaScopeOn
    $tpl: KaTemplate
    $parent: KaScope
    [x: string] : any
    render: () => KaScope
    importFrom(scope : any) : void;
    init(scopeDef : any) : void;
    isInitialized() : boolean;
    raw() : KaScope;
    dump() : any;
}

export interface KaScope {
    $__scope_orig?: any
    $fn?: {[x : string] : (...param : any[])=>any}
    $ref?: Map<string, HTMLElement>
    $on?: KaScopeOn
    $tpl?: KaTemplate
    $parent?: KaScope
    [x: string] : any

    render?: () => KaScope
    importFrom?(scope : any) : void;
    init?(scopeDef : any) : void;
    isInitialized?() : boolean;
    raw?() : KaScope;
    dump?() : any;
}


class KaDefaultScope implements KaScope {
    private __isInitialized = false;
    isInitialized(): boolean {
        return this.__isInitialized;
    }

    async render() {
        this.$tpl.render(this);

    }

    raw() : KaScope {
        return this.$__scope_orig;
    }

    importFrom(scope : any) {
        for(let key of Object.keys(scope)) {
            if (key.startsWith("$") || key.startsWith("__"))
                continue;
            this["$__scope_orig"][key] = scope[key];
        }
    }

    dump() : any {
        return {...this}
    }

    init(scopeDef : any) {
        if (this.isInitialized())
            throw "Scope is already initalized";
        this.__isInitialized = true;
        for(let key of Object.keys(scopeDef)) {
            this[key] = scopeDef[key];
        }
    }
    [x: string] : any
}

export function createScopeObject<T extends KaScope>(init : T = null) : T | KaScope {
    let scopeDef = new KaDefaultScope();
    scopeDef["$__scope_orig"] = scopeDef;
    let proxy = new Proxy(scopeDef, {
        get(target : any, prop : string, receiver: RTCRtpReceiver) {
            if (prop.startsWith("$"))
                return target[prop];
            return target[prop];
        },
        set(target: any, p: string, value: any, receiver: any) : boolean {
            if (target[p] === value)
                return true; // Nothing changed

            target[p] = value;

            let debouncer = new Debouncer(50, 50);
            if (p.startsWith("$") || p.startsWith("__"))
                return true;

            if (isset (scopeDef.$tpl))
                scopeDef.$tpl.render();
            (async() => {
                await debouncer.debounce();

            })()
            return true;
        }
    });
    if (init !== null)
        scopeDef.init(init);
    return proxy as T;
}
