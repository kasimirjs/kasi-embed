
KaToolsV1.apply = (selector, scope, recursive=false) => {
    if (typeof selector === "string")
        selector = KaToolsV1.querySelector(selector);

    let attMap = {
        "textcontent": "textContent",
        "htmlcontent": "htmlContent"
    }

    for(let attName of selector.getAttributeNames()) {
        //console.log(attName);
        if ( ! attName.startsWith("ka.")) {
            continue;
        }

        let attVal = selector.getAttribute(attName);

        let attType = attName.split(".")[1];
        let attSelector = attName.split(".")[2];
        if (typeof attSelector === "undefined")
            attSelector = null;


        let registerEventHandler = function(element, action, callbackOrCode, scope) {
            if (typeof element._ka_on === "undefined")
                element._ka_on = {};

            if (typeof element._ka_on[action] === "undefined")
                element.addEventListener(action, (e) => element._ka_on[action](e));

            element._ka_on[action] = async(e) => {
                scope["$event"] = e;
                if (typeof callbackOrCode === "function") {
                    return callbackOrCode(... await KaToolsV1.provider.arguments(callbackOrCode, {
                        ...scope,
                        "$event": e,
                        "$this": element,
                        "$scope": scope
                    }));
                } else {
                    return KaToolsV1.eval(callbackOrCode, scope, element);
                }
            };
        }

        if (attType === "on") {
            let attScope = {$scope: scope, ...scope}
            if (attSelector !== null) {
                registerEventHandler(selector, attSelector, attVal, attScope);
            } else {
                let callBackMap = KaToolsV1.eval(attVal, attScope, selector);
                for(let curAction in callBackMap) {
                    registerEventHandler(selector, curAction, callBackMap[curAction], attScope);
                }

            }
            continue;
        }

        let r = null;
        if (typeof attVal !== "undefined" && typeof attVal !== null && attVal !== "")
            r = KaToolsV1.eval(attVal, scope, selector);

        switch (attType) {
            case "ref":
                if (typeof scope.$ref === "undefined")
                    scope.$ref = {};
                // Allow ref without parameter to use $ref.$last
                if (r !== null)
                    scope.$ref[r] = selector;
                scope.$ref.$last = selector;
                break;

            case "classlist":
                if (attSelector  !== null) {
                    if (r === true) {
                        selector.classList.add(attSelector)
                    } else {
                        selector.classList.remove(attSelector)
                    }
                    break;
                }
                for (let cname in r) {
                    if (r[cname] === true) {
                        selector.classList.add(cname);
                    } else {
                        selector.classList.remove(cname);
                    }
                }
                break;

            case "style":
                if (attSelector  !== null) {
                    let val = r;
                    if (typeof val === "number" && ["left", "top", "height", "width", "bottom", "right", "line-height", "font-size"].indexOf(attSelector) !== -1)
                        val = val + "px";
                    selector.style[KaToolsV1.strToCamelCase(attSelector)] = val;
                    break;
                }
                for (let cname in r) {
                    let val = r[cname];
                    if (typeof val === "number" && ["left", "top", "height", "width", "bottom", "right", "line-height", "font-size"].indexOf(cname) !== -1)
                        val = val + "px";
                    selector.style[KaToolsV1.strToCamelCase(cname)] = val;
                }
                break;

            case "bindarray":
                if (attSelector === "default")
                    continue;
                if (typeof r === "undefined") {
                    // Bind default values
                    if (selector.hasAttribute("ka.bind.default")) {
                        scope = {$scope: scope, ...scope};
                        scope = {$scope: scope, ...scope, __curVal: KaToolsV1.eval(selector.getAttribute("ka.bind.default"), scope, selector)}
                        KaToolsV1.eval(`${attVal} = __curVal`, scope, selector);
                        r = scope.__curVal;
                    }
                }
                if ( ! Array.isArray(r)) {
                    console.error("kap:bindarr: Not an array!", r, selector);
                    return;
                }
                if (r.indexOf(selector.value) === -1)
                    selector.checked = false;
                else
                    selector.checked = true;

                if (typeof selector._kap_bind === "undefined") {
                    selector.addEventListener("change", (event) => {

                        let arr = KaToolsV1.eval(attVal, scope, selector);

                        if (arr.indexOf(selector.value) === -1 && selector.checked)
                            arr.push(selector.value);
                        if (arr.indexOf(selector.value) !== -1 && ! selector.checked)
                            arr = arr.filter((e) => e !== selector.value);
                        scope = {$scope: scope, ...scope, __curVal: arr};
                        KaToolsV1.eval(`${attVal} = __curVal`, scope, selector);
                        if (scope.$on && scope.$on.change)
                            scope.$on.change(event);
                    })
                    selector._kap_bind = true;
                }
                break;

            case "bind":
                if (attSelector === "default")
                    continue;
                if (typeof r === "undefined") {
                    // Bind default values
                    if (selector.hasAttribute("ka.bind.default")) {
                        scope = {$scope: scope, ...scope};
                        scope = {$scope: scope, ...scope, __curVal: KaToolsV1.eval(selector.getAttribute("ka.bind.default"), scope, selector)}
                        KaToolsV1.eval(`${attVal} = __curVal`, scope, selector);
                        r = scope.__curVal;
                    }
                }
                if (selector.type === "checkbox" || selector.type === "radio") {
                    if (selector.hasAttribute("value")) {
                        if (r === selector.getAttribute("value"))
                            selector.checked = true;
                        else
                            selector.checked = false;
                    } else {
                        if (r === true)
                            selector.checked = true;
                        else
                            selector.checked = false;
                    }
                } else {
                    selector.value = typeof r !== "undefined" ? r : "";
                }

                if (typeof selector._kap_bind === "undefined") {
                    selector.addEventListener("change", (event) => {

                        let value = null;
                        if (selector.type === "checkbox" || selector.type === "radio") {
                            if (selector.hasAttribute("value")) {
                                if (selector.checked === false)
                                    return;
                                value = selector.getAttribute("value");
                            } else {
                                value = selector.checked
                            }
                        } else {
                            value = selector.value
                        }
                        scope = {$scope: scope, ...scope, __curVal: value}
                        KaToolsV1.eval(`${attVal} = __curVal`, scope, selector);
                        if (scope.$on && scope.$on.change)
                            scope.$on.change(event);
                    })
                    selector.addEventListener("keyup", (event) => {
                        scope = {$scope: scope,...scope, __curVal: selector.value}
                        KaToolsV1.eval(`${attVal} = __curVal`, scope, selector);
                        if (scope.$on && scope.$on.change)
                            scope.$on.change(event);

                    })
                    selector._kap_bind = true;
                }
                break;

            case "options":
                let value = selector.value;
                selector.innerHTML = "";
                for (let option in r) {
                    if (isNaN(option)) {
                        selector.appendChild(new Option(r[option], option));
                    } else {
                        if (typeof r[option].text !== "undefined") {
                            selector.appendChild(new Option(r[option].text, r[option].value));
                        } else {
                            selector.appendChild(new Option(r[option], r[option]));
                        }
                    }
                }
                if (value !== null)
                    selector.value = value;
                break;

            case "attr":
                if (attSelector  !== null) {
                    if (r === null || r === false) {
                        selector.removeAttribute(attSelector)
                    } else {
                        selector.setAttribute(attSelector, r);
                    }
                    break;
                }
                for (let cname in r) {
                    if (r[cname] ===null || r[cname] === false) {
                        selector.removeAttribute(cname);
                    } else {
                        selector.setAttribute(cname, r[cname]);
                    }
                }
                break;

            case "prop":
                if (attSelector  !== null) {
                    // Set Property directly
                    selector[KaToolsV1.strToCamelCase(attSelector)] = r;
                    break;
                }
                for (let cname in r) {
                    selector[KaToolsV1.strToCamelCase(cname)] = r[cname];
                }
                break;

            default:
                if (typeof attMap[attType] !== "undefined")
                    attType = attMap[attType];
                if (typeof selector[attType] === "undefined") {
                    console.warn("apply(): trying to set undefined property ", attType, "on element", selector);
                }
                selector[attType] = r;
                break;
        }



    }
    if (recursive) {
        for (let e of selector.children) {
            KaToolsV1.apply(e, scope, recursive);
        }
    }
}
