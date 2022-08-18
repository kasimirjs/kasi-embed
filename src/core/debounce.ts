

const _debounceInterval = {i: null as number|null, time: null as number|null};

/**
 * Debounce a event
 *
 *
 *
 * @param min   Minimum Time to wait
 * @param max   Trigger event automatically after this time
 * @return {Promise<unknown>}
 */
export async function ka_debounce (min : number, max : number=null) : Promise<void> {
    if (max === null)
        max = min;
    let dbi = _debounceInterval;
    return new Promise<void>((resolve) => {
        if (dbi.time < (+new Date()) - max && dbi.i !== null) {
            return resolve();
        }
        if (dbi.i !== null) {
            return;
        }
        dbi.time = (+new Date());
        dbi.i = window.setTimeout(() => {
            dbi.i = null;
            return resolve();

        }, min);
    });

}
