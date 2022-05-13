
KaToolsV1.provider = new class {
    #services = {};


    async get(name) {
        return new Promise(async (resolve, reject) => {
            let service = this.#services[name];
            if (typeof service === "undefined")
                return reject(`Provider cannot resolve '${name}'`)
            if(service.resolved)
                return resolve(service.value);
            service.promises.push(resolve);
            if (service.promises.length > 1)
                return;
            service.value = await service.cb(...await this.arguments(service.cb, service.params));
            service.resolved = true;
            service.promises.forEach(elem => elem(service.value));
        });
    }

    /**
     *
     * @param cb
     * @param params
     * @returns {Promise<Array>}
     */
    async arguments(cb, params = {}) {
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


    defineValue(name, value) {
        this.#services[name] = {
            value: value,
            resolved: true
        }
    }

    define(name, callback, params={}) {
        this.#services[name] = {
            cb: callback,
            params: params,
            value: null,
            resolved: false,
            promises: []
        }
    }
}();
