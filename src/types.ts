import {KaTemplate} from "./tpl/template";

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

export interface KaScope {
    $fn?: Map<string, ()=>any>
    $ref?: Map<string, HTMLElement>
    $on?: KaScopeOn
    $tpl?: KaTemplate
    $parent?: KaScope
    render?: () => this
    [x: string] : any
}
