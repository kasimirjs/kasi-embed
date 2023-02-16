

export function ka_set_options(element : HTMLSelectElement, options: any, value=null) {
    element.innerHTML = "";
    for (let option : any in options) {
        if (isNaN(option)) {
            element.appendChild(new Option(options[option], option));
        } else {
            if (typeof options[option].text !== "undefined") {
                element.appendChild(new Option(options[option].text, options[option].value));
            } else {
                element.appendChild(new Option(options[option], options[option]));
            }
        }
    }
    if (value !== null)
        element.value = value;
}
