import {KaToolsV1} from "../core/init";


KaToolsV1.provider = new class {

    constructor() {
        this._services = {};
    }


    /**
     * Get / wait for a value
     *
     * @param name
     * @param lateResolving {boolean}   Trigger no warning if the name is not yet resolvable (late resolving)
     * @returns {Promise<unknown>}
     */
    async get(name, lateResolving=false) {
        return new Promise(async (resolve, reject) => {
            let service = this._services[name];
            if (typeof service === "undefined") {
                // get before defined function
                this._services[name] = {
                    cb: null,
                    params: null,
                    state: null,
                    promises: [{resolve, reject}]
                }
                if (!lateResolving)
                    console.warn("trying to get undefined service " + name);
                return
            }

            // Already resolved/rejected: Resolve/Reject Promise immediately
            if(service.state === "resolved")
                return resolve(service.value);
            if(service.state === "rejected")
                return reject(service.value);

            // Not resolved/rejected yet? Queue Promise
            service.promises.push({resolve, reject});
            await this._resolve(name);
        });
    }


    async _resolve(name) {
        let service = this._services[name];

        // Resolve only once
        if (service.state !== null)
            return;
        service.state = "waiting";

        try {
            service.value = await service.cb(...await this.arguments(service.cb, service.params));
            service.state = "resolved";
            service.promises.forEach(prom => prom.resolve(service.value));
        } catch (e) {
            service.value = await service.cb(...await this.arguments(service.cb, service.params));
            service.state = "rejected";
            service.promises.forEach(prom => prom.reject(e));
        }
    }

    /**
     * Build arguments list depending on the name of arguments determined
     * by KaToolsV1.getArgs()
     *
     * @param cb {function}
     * @param params {object}
     * @returns {Promise<Array>}
     */
    async arguments(cb, params = {}) {
        if (! (typeof cb === "function")) {
            throw "Invalid function in parameter 1: " + cb;
        }
        return new Promise(async (resolve, reject) => {
            let args = KaToolsV1.getArgs(cb);
            let retArgs = [];
            for(let i = 0; i < args.length; i++) {
                let argName = args[i];
                if(params[argName]) {
                    retArgs.push(params[argName]);
                    continue;
                }
                try {
                    retArgs.push(await this.get(argName))
                } catch(e) {
                    return reject(e);
                }
            }
            resolve(retArgs);
        });
    }


    /**
     * Define a fixed value
     *
     * @param name {string}
     * @param value {any}
     */
    defineValue(name, value) {
        this.defineService(name, () => value);
    }

    /**
     * Define a service (callback to return the value)
     *
     * @param name {string}
     * @param callback {function}
     * @param params {object}
     */
    defineService(name, callback, params={}) {
        let service = this._services[name];
        if (typeof service === "undefined") {
            this._services[name] = {
                cb: callback,
                params: params,
                state: null,
                promises: []
            }
            return;
        }
        // Resolve queued Promises
        service.cb = callback;
        service.params = params;

        if (service.promises.length > 0) {
            // Resolve Promises added before define
            this._resolve(name);
        }

    }
}();



