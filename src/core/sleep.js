KaToolsV1.sleep = (sleepms) => {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            return resolve('done');
        }, sleepms);
    });
}
