
export async function ka_sleep(sleepms) {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            return resolve('done');
        }, sleepms);
    });
}
