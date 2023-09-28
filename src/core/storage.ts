/**
 * Return a Proxy handling saving / deleting / updating the object in the localStorage
 * @param object
 * @param scopeName
 */
export function ka_session_storage<T>(object : T | null | object = {}, scopeName : string = null) : T {
    if (scopeName == null) {
        scopeName = "ka_session_storage";
    }
    if (object === null) {
        sessionStorage.removeItem(scopeName);
        return;
    }
    if (sessionStorage.getItem(scopeName) == null) {
        sessionStorage.setItem(scopeName, JSON.stringify(object));
    }
    let savedObject = JSON.parse(sessionStorage.getItem(scopeName));

    for (let key in object as any) {
        if (typeof savedObject[key] === "undefined") {
            savedObject[key] = object[key];
        }
    }

    let proxy = new Proxy(savedObject, {
        set: function (target, property, value, receiver) {
            target[property] = value;
            sessionStorage.setItem(scopeName, JSON.stringify(target));
            return true;
        }
    });
    return proxy;
}
