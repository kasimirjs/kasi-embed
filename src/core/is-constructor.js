/**
 * Returns true if fn in parameter 1 is a contructor
 *
 *
 * @param fn
 * @returns {boolean}
 */
KaToolsV1.is_constructor = (fn) => {
    return fn.toString().startsWith("class")
}
