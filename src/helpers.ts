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
export const onChangeValue = fn => (e: any) => {
    return fn(e.target.value);
};
