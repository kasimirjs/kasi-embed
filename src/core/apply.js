
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

        let r = KaToolsV1.eval(attVal, scope, selector);

        switch (attType) {
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

            case "bind":
                selector.value = typeof r !== "undefined" ? r : "";
                if (typeof selector._kap_bind === "undefined") {
                    selector.addEventListener("change", () => {
                        scope = {$scope: scope, ...scope, __curVal: selector.value}
                        KaToolsV1.eval(`${attVal} = __curVal`, scope, selector);
                        console.log("changed", selector.value);
                    })
                    selector.addEventListener("keyup", () => {
                        scope = {$scope: scope,...scope, __curVal: selector.value}
                        KaToolsV1.eval(`${attVal} = __curVal`, scope, selector);
                    })
                    selector._kap_bind = true;
                }

                break;

            case "options":
                console.log(selector, selector.value);
                let value = selector.value;
                //selector.options.length = 0;
                for (let option in r) {
                    if (isNaN(option)) {
                        selector.options.add(new Option(r[option], option));
                    } else {
                        if (typeof r[option].text !== "undefined") {
                            selector.options.add(new Option(r[option].text, r[option].value));
                        } else {
                            selector.options.add(new Option(r[option], r[option]));
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
