



export class KaContainer {
    protected _services : any = {};



    /**
     *
     * @abstract
     * @return {KaContainer}
     */
    static getInstance() {
        return container;
    }


    /**
     * Get / wait for a value
     *
     * @param name
     * @param lateResolving {boolean}   Trigger no warning if the name is not yet resolvable (late resolving)
     * @returns {Promise<unknown>}
     */
    async get(name : string, lateResolving=false) : Promise<any> {
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


    async _resolve(name : string) {
        let service = this._services[name];

        // Resolve only once
        if (service.state !== null)
            return;
        service.state = "waiting";

        try {
            service.value = await service.cb();
            service.state = "resolved";
            service.promises.forEach( (prom : any) => prom.resolve(service.value));
        } catch (e) {
            service.value = await service.cb();
            service.state = "rejected";
            service.promises.forEach( (prom : any) => prom.reject(e));
        }
    }


    /**
     * Define a fixed value
     *
     * @param name {string}
     * @param value {any}
     */
    defineValue(name : string, value : any) {
        this.defineService(name, () => value);
    }

    /**
     * Define a service (callback to return the value)
     *
     * @param name {string}
     * @param callback {function}
     * @param params {object}
     */
    defineService(name : string, callback : any, params :any ={}) {
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
}

export var container = new KaContainer();
