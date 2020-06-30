import { config } from './config';
import { strings } from './strings';
import { ICategory } from '../typings/types';

/**
 * Function that helps take the value of a change event and calls a function
 *
 * Should be used as such
 * Ex.
 * <input onChange={value(this.onInputChanged)} />
 *
 * @param fn a function to run on an event
 * @param fn an event, should be a change event with a value
 */
export const onChangeValue = (fn) => (e: any) => {
    return fn(e.target.value);
};

export function getCategories(): Array<ICategory> {
    let categories = [];

    const keys = Object.keys(config.categories);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = config.categories[key];
        if (value && value.enabled) {
            categories.push({
                id: key,
                label: strings.categories[key],
            });
        }
    }
    return categories;
}

export async function localURLtoBlob(url: string): Promise<Blob> {
    let blob = await fetch(url).then((r) => r.blob());
    return blob;
}

export function getB64FromFile(file): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result);
        };
        reader.onerror = (error) => reject(error);
    });
}

export function generateGUID() {
    const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
    );
}

//@ts-ignore
window.helpers = {
    getB64FromFile,
};
