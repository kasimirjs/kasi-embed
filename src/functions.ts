/**
 * Check if parameter 1 is undefined or null
 *
 * @param input
 */
export function isset(input : any) : boolean {
    if (typeof input === "undefined" || input === null)
        return false;
    return true;
}
