var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const _debounceInterval = { i: null, time: null };
/**
 * Debounce a event
 *
 *
 *
 * @param min   Minimum Time to wait
 * @param max   Trigger event automatically after this time
 * @return {Promise<unknown>}
 */
export function ka_debounce(min, max = null) {
    return __awaiter(this, void 0, void 0, function* () {
        if (max === null)
            max = min;
        let dbi = _debounceInterval;
        return new Promise((resolve) => {
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
    });
}
