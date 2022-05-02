
KaToolsV1.apply = (selector, scope, recursive=false) => {
    if (typeof selector === "string")
        selector = KaToolsV1.querySelector(selector);

    let attMap = {
        "textcontent": "textContent",
        "htmlcontent": "htmlContent"
    }

    for(let attName of selector.getAttributeNames()) {
        //console.log(attName);
        if ( ! attName.startsWith("[") || ! attName.endsWith("]")) {
            continue;
        }

        let attVal = selector.getAttribute(attName);
        attName = attName.replace("[", "").replace("]", "");
        let attType = attName.split(".")[0];
        let attSelector = attName.split(".")[1];
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
                selector.addEventListener("change", () => {
                    scope = {...scope, __curVal: selector.value}
                    KaToolsV1.eval(`${attVal} = __curVal`, scope, selector);
                })
                selector.addEventListener("keyup", () => {
                    scope = {...scope, __curVal: selector.value}
                    KaToolsV1.eval(`${attVal} = __curVal`, scope, selector);
                })
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
