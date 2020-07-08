export class LocalStorage {
    static get(id: string): object {
        if (window?.localStorage) {
            const str = window.localStorage.getItem(id);
            if (!str || str === 'undefined') {
                return undefined;
            }
            return JSON.parse(str);
        }
    }

    static set(id: string, value: object) {
        if (window?.localStorage) {
            window.localStorage.setItem(id, JSON.stringify(value));
        }
    }

    static clear(id: string) {
        if (window?.localStorage) {
            window.localStorage.setItem(id, '');
        }
    }
}
