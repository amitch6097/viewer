
export function model<T extends Record<string, any>>(): (new (data: T) => T)
{   
    //@ts-ignore
    return class Model implements T {
        constructor(data: T) {
            Object.keys(data).forEach(key => {
                Object.defineProperty(this, key, {
                    writable: false,
                    get: function() {
                        return data[key]
                    }
                });
            });
        }
    }
}