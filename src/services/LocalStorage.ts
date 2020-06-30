export class LocalStorage {
    static get(id: string): object {
        if (window?.localStorage) {
            const str = window.localStorage.getItem(id);
            const state = str && JSON.parse(str);
            return state;
        }
    }

    static set(id: string, value: object) {
        if (window?.localStorage) {
            window.localStorage.setItem(id, JSON.stringify(value));
        }
    }
}
