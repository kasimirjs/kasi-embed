<?php

namespace KasimirJS;

class KasimirLoader
{


    const MAP = [
        "core/init.js",
        "core/dom-ready.js",
        "core/query-select.js",
        "core/debounce.js",
        "core/eval.js",
        "core/quick-template.js",
        "tpl/template-element.js",
        "tpl/template.js",
        "tpl/template-attrs.js",
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
