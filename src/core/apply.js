
KaToolsV1.apply = (selector, scope, recursive=false) => {
    if (typeof selector === "string")
        selector = KaToolsV1.querySelector(selector);

    let attMap = {
        "textcontent": "textContent",
        "htmlcontent": "htmlContent"
    }

    for(let attName of selector.getAttributeNames()) {
        //console.log(attName);
        if ( ! attName.startsWith("kap:")) {
            continue;
        }

        let attVal = selector.getAttribute(attName);

        let attType = attName.split(":")[1];
        let attSelector = attName.split(":")[2];
        if (typeof attSelector === "undefined")
            attSelector = null;


        if (attType === "on") {
            if (selector._ka_on === true)
                continue;
            let attScope = {$scope: scope, ...scope}
            if (attSelector !== null) {

                selector.addEventListener(attSelector, (e) => {
                    attScope["$event"] = e;
                    return KaToolsV1.eval(attVal, attScope, selector);
                });
            } else {
                let actionArr = KaToolsV1.eval(attVal, attScope, selector)
                for (let eventName in actionArr) {
                    selector.addEventListener(eventName, (e) => {
                        attScope["$event"] = e;
                        return actionArr[eventName](attScope, e);
                    });
                }
            }
            selector._ka_on = true;
            continue;
        }

        let r = KaToolsV1.eval(attVal, scope, selector);

        switch (attType) {
            case "ref":
                if (typeof scope.$ref === "undefined")
                    scope.$ref = {};
                scope.$ref[r] = selector;
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



            case "bindarray":
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
                if (selector.type === "checkbox" || selector.type === "radio") {
                    if (r === true)
                        selector.checked = true;
                    else
                        selector.checked = false;
                } else {
                    selector.value = typeof r !== "undefined" ? r : "";
                }

                if (typeof selector._kap_bind === "undefined") {
                    selector.addEventListener("change", (event) => {

                        let value = null;
                        if (selector.type === "checkbox" || selector.type === "radio") {
                            value = selector.checked
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
                console.log(selector, selector.value);
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
