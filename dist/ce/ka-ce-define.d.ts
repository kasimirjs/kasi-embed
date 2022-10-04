/**
 * Define a new CustomElement
 *
 * @param elementName {string}
 * @param controller {function($tpl: KaToolsV1.Template, $this: KaToolsV1.CustomElement, $container: KaToolsV1.Container)}
 * @param template {HTMLTemplateElement|Promise<HTMLTemplateElement>}
 * @param options
 * @returns {Promise<void>}
 */
export function ka_ce_define(elementName: string, controller: (arg0: $tpl, arg1: KaToolsV1.Template, arg2: $this, arg3: KaToolsV1.CustomElement, arg4: $container, arg5: KaToolsV1.Container) => any, template?: HTMLTemplateElement | Promise<HTMLTemplateElement>, options?: {
    waitEvent: any;
    shadowDom: boolean;
    shadowDomOptions: {
        mode: string;
    };
}): Promise<void>;
