
export async function ka_sleep(sleepms : number) : Promise<void> {
    return new Promise<void>((resolve) => {
        window.setTimeout(() => {
            return resolve();
        }, sleepms);
    });
}
