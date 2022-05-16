<?php

namespace KasimirJS;

class KasimirLoader
{


    const MAP = [
        "core/init.js",
        "core/dom-ready.js",
        "core/query-select.js",
        "core/debounce.js",
        "core/sleep.js",
        "core/eval.js",
        "core/quick-template.js",
        "core/apply.js",
        "core/elwalk.js",
        "core/is-constructor.js",

        "tpl/templatify.js",
        "tpl/renderer.js",

        "app/getArgs.js",
        "app/provider.js",

        "ce/ce_define.js",
        "ce/html.js",
        "ce/kaelement.js",

        "core/autostart.js",
        "core/router.js",
    ];


    public static function Load()
    {
        $output = "/* KasimirJS EMBED - documentation: https://kasimirjs.infracamp.org - Author: Matthias Leuffen <m@tth.es>*/\n";
        foreach (self::MAP as $value) {
            $output .= "\n/* from $value */\n";
            $output .= file_get_contents(__DIR__ . "/" . $value);
        }
        return $output;
    }

}
