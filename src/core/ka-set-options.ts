

export function ka_set_options(element : HTMLSelectElement, options: any, value : string | null = null) {
    element.innerHTML = "";
    for (let option in options) {
        if (isNaN(option as any)) {
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
