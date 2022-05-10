KaToolsV1.sleep = (sleepms) => {
    return new Promise((resolve) => {
        dbi.i = window.setTimeout(() => {
            dbi.i = null;
            return resolve('done');
        }, sleepms);
    });
}
