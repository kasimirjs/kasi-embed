"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ka_eval = void 0;
function ka_eval(stmt, __scope, e, __refs) {
    if (stmt.endsWith(";"))
        stmt = stmt.slice(0, -1);
    const reserved = ["var", "null", "let", "const", "function", "class", "in", "of", "for", "true", "false", "await", "$this"];
    let r = "var $this = e;";
    for (let __name in __scope) {
        if (reserved.indexOf(__name) !== -1)
            continue;
        if (__name.indexOf("-") !== -1) {
            console.error(`Invalid scope key '${__name}': Cannot contain - in scope:`, __scope);
            throw `eval() failed: Invalid scope key: '${__name}': Cannot contain minus char '-'`;
        }
        r += `var ${__name} = __scope['${__name}'];`;
    }
    // If the scope was cloned, the original will be in $scope. This is important when
    // Using events [on.click], e.g.
    if (typeof __scope.$scope === "undefined") {
        r += "var $scope = __scope;";
    }
    try {
        // console.log(r + '(' + stmt + ')');
        return eval(r + '(' + stmt + ')');
    }
    catch (ex) {
        console.error("cannot eval() stmt: '" + stmt + "': " + ex, " on element ", e, ex, "(context:", __scope, ")");
        throw "eval('" + stmt + "') failed: " + ex;
    }
}
exports.ka_eval = ka_eval;
