var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 *
 * @param url {string}
 * @return {Promise<HTMLTemplateElement>}
 */
export function ka_load_html(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let e = document.createElement("template");
        let result = yield fetch(url);
        if (!result.ok) {
            console.error(`[loadHtml] failed to load '${url}'`);
            throw `[loadHtml] failed to load '${url}'`;
        }
        let body = yield result.text();
        e.innerHTML = body;
        return e;
    });
}
