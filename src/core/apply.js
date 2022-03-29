
KaToolsV1.apply = (selector, scope, recursive=false) => {
    if (typeof selector === "string")
        selector = KaToolsV1.querySelector(selector);

    let attMap = {
        "textcontent": "textContent",
        "htmlcontent": "htmlContent"
    }

    for(let attName of selector.getAttributeNames()) {
        if ( ! attName.startsWith("[") || ! attName.endsWith("]")) {
            continue;
        }

        let attVal = selector.getAttribute(attName);
        attName = attName.replace("[", "").replace("]", "");
        let attType = attName.split(".")[0];
        let attSelector = attName.split(".")[1] ?? null;

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


            case "attr":
                if (attSelector  !== null) {
                    if (r === null || r === false) {
                        selector.attributes.removeNamedItem(attSelector)
                    } else {
                        selector.classList.setNamedItem(attSelector, r);
                    }
                    break;
                }
                for (let cname in r) {
                    if (r[cname] ===null || r[cname] === false) {
                        selector.attributes.removeNamedItem(cname);
                    } else {
                        selector.attributes.setNamedItem(cname, r[cname]);
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

        if (recursive) {
            for (let e of selector.children) {
                KaToolsV1.apply(e, scope, recursive);
            }
        }

    }
}
